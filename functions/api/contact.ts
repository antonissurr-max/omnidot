interface Env {
  /** Optional override. Default: info@omnidot.gr (Email Routing → Gmail). */
  CONTACT_TO?: string;
}

type Body = {
  name?: string;
  email?: string;
  company?: string;
  interest?: string;
  notes?: string;
  locale?: string;
  website?: string; // honeypot
};

const DEFAULT_TO = "info@omnidot.gr";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: Body;
  try {
    body = (await context.request.json()) as Body;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Bots that fill hidden fields
  if (body.website) {
    return json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  const notes = String(body.notes ?? "").trim();
  const locale = body.locale === "el" ? "el" : "en";

  if (!name || !email || !interest) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  const to = (context.env.CONTACT_TO || DEFAULT_TO).trim();
  const subject = `omnidot. — ${interest}`;
  const message =
    locale === "el"
      ? [
          `Όνομα: ${name}`,
          `Email: ${email}`,
          `Εταιρεία: ${company || "—"}`,
          `Ενδιαφέρομαι για: ${interest}`,
          notes ? `Σημειώσεις:\n${notes}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      : [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "—"}`,
          `Interested in: ${interest}`,
          notes ? `Notes:\n${notes}` : "",
        ]
          .filter(Boolean)
          .join("\n");

  // Free relay (no Workers Paid / Email Sending). First use: confirm via email FormSubmit sends to `to`.
  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          interest,
          message,
          _subject: subject,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      },
    );

    const payload = (await res.json().catch(() => ({}))) as {
      success?: boolean | string;
      message?: string;
    };

    const ok =
      res.ok &&
      (payload.success === true ||
        payload.success === "true" ||
        String(payload.message ?? "")
          .toLowerCase()
          .includes("success"));

    if (!ok) {
      console.error("formsubmit failed", res.status, payload);
      return json({ ok: false, error: "send_failed" }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("contact email failed", err);
    return json({ ok: false, error: "send_failed" }, 502);
  }
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
