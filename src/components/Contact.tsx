import { FormEvent, useEffect, useState } from "react";
import { trackEvent } from "../analytics";
import { formatPhoneDisplay, phoneHref, site } from "../site";
import { useLocale } from "../locale";
import type { PageId } from "../types";

type Status = "idle" | "sending" | "sent" | "error";

const interestIds: (PageId | "full")[] = [
  "social",
  "content",
  "performance",
  "web",
  "full",
];

function CallPopup({ onPaper }: { onPaper: boolean }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const callHref = site.phone ? `tel:${phoneHref(site.phone)}` : "";
  const callLabel = site.phone ? formatPhoneDisplay(site.phone) : "";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!callHref) return null;

  return (
    <div className={`booking__call${onPaper ? " booking__call--paper" : ""}`}>
      <button
        className="booking__call-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {t.contactCall}
      </button>
      {open && (
        <div
          className="booking__call-overlay"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="booking__call-modal"
            role="dialog"
            aria-label={t.contactCall}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="booking__call-kicker">{t.contactCall}</p>
            <a className="booking__call-number" href={callHref}>
              {callLabel}
            </a>
            <button
              className="booking__call-close"
              type="button"
              onClick={() => setOpen(false)}
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Contact({
  tone = "dark",
  interest,
}: {
  tone?: "dark" | "paper";
  interest?: PageId;
}) {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const onPaper = tone === "paper";

  function interestLabel(id: PageId | "full") {
    return id === "full" ? t.contactFull : t.pages[id].title;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const interestId = String(form.get("interest") ?? "") as PageId | "full";
    const data = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      interest: interestLabel(interestId),
      notes: String(form.get("notes") ?? ""),
      website: String(form.get("website") ?? ""),
      locale,
    };

    setStatus("sending");
    try {
      const endpoint = site.formspreeEndpoint?.trim();
      if (!endpoint) throw new Error("missing_endpoint");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || undefined,
          interest: data.interest,
          message: data.notes || data.interest,
          _subject: `omnidot. — ${data.interest}`,
          _replyto: data.email,
          _gotcha: data.website || "",
          locale: data.locale,
        }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        next?: string;
      };
      if (!res.ok || payload.error) throw new Error("send_failed");
      trackEvent("generate_lead", {
        method: "contact_form",
        interest: data.interest,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`booking${onPaper ? " booking--on-paper" : ""}`}>
        <p className={`lede${onPaper ? "" : " lede--on-dark"}`}>{t.contactThanks}</p>
        <CallPopup onPaper={onPaper} />
      </div>
    );
  }

  return (
    <div className={`booking${onPaper ? " booking--on-paper" : ""}`}>
      <form
        className={`form${onPaper ? " form--on-paper" : " form--on-dark"}`}
        onSubmit={onSubmit}
        key={interest ?? "full"}
      >
        {/* Honeypot — leave empty */}
        <input
          className="form__hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <label>
          {t.contactInterest}
          <select name="interest" defaultValue={interest ?? "full"} required>
            {interestIds.map((id) => (
              <option key={id} value={id}>
                {interestLabel(id)}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t.contactName}
          <input name="name" type="text" autoComplete="name" required />
        </label>

        <div className="form__row">
          <label>
            {t.contactEmail}
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            {t.contactCompany} <span className="optional">{t.contactOptional}</span>
            <input name="company" type="text" autoComplete="organization" />
          </label>
        </div>

        <label>
          {t.contactBrief} <span className="optional">{t.contactOptional}</span>
          <textarea name="notes" rows={onPaper ? 2 : 3} placeholder={t.contactPlaceholder} />
        </label>

        {status === "error" ? (
          <p className="form__error" role="alert">
            {t.contactError}{" "}
            {site.contactEmail || site.email ? (
              <a href={`mailto:${site.contactEmail || site.email}`}>
                {site.contactEmail || site.email}
              </a>
            ) : null}
          </p>
        ) : null}

        <button
          className={`btn${onPaper ? " btn--ink" : " btn--light"}`}
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? t.contactSending : t.contactSend}
        </button>

        <CallPopup onPaper={onPaper} />
      </form>
    </div>
  );
}
