interface Env {
  EMAIL: {
    send: (message: {
      from: string | { email: string; name?: string };
      to?: string | { email: string; name?: string } | null;
      replyTo?: string | { email: string; name?: string };
      subject: string;
      text?: string;
      html?: string;
    }) => Promise<{ messageId: string }>;
  };
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

const FROM = {
  email: "contact@omnidot.gr",
  name: "omnidot.",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

  const labels =
    locale === "el"
      ? {
          title: "Νέο brief από τη φόρμα",
          name: "Όνομα",
          email: "Email",
          company: "Εταιρεία",
          interest: "Ενδιαφέρομαι για",
          notes: "Σημειώσεις",
        }
      : {
          title: "New brief from the form",
          name: "Name",
          email: "Email",
          company: "Company",
          interest: "Interested in",
          notes: "Notes",
        };

  const text = [
    labels.title,
    "",
    `${labels.name}: ${name}`,
    `${labels.email}: ${email}`,
    `${labels.company}: ${company || "—"}`,
    `${labels.interest}: ${interest}`,
    notes ? `${labels.notes}: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>${escapeHtml(labels.title)}</h2>
    <p><strong>${escapeHtml(labels.name)}:</strong> ${escapeHtml(name)}</p>
    <p><strong>${escapeHtml(labels.email)}:</strong> ${escapeHtml(email)}</p>
    <p><strong>${escapeHtml(labels.company)}:</strong> ${escapeHtml(company || "—")}</p>
    <p><strong>${escapeHtml(labels.interest)}:</strong> ${escapeHtml(interest)}</p>
    ${notes ? `<p><strong>${escapeHtml(labels.notes)}:</strong><br>${escapeHtml(notes).replaceAll("\n", "<br>")}</p>` : ""}
  `;

  try {
    await context.env.EMAIL.send({
      from: FROM,
      replyTo: { email, name },
      subject: `omnidot. — ${interest}`,
      text,
      html,
    });
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
