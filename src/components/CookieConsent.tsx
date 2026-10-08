import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "../consent";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";

export function CookieConsent() {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);

    // Defer first paint so the banner is never LCP.
    let idleId = 0;
    let timer = 0;
    const showIfNeeded = () => {
      if (readConsent() == null) setOpen(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(showIfNeeded, { timeout: 2500 });
    } else {
      timer = window.setTimeout(showIfNeeded, 1800);
    }

    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  if (!open) return null;

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
    setOpen(false);
  }

  return (
    <div className="cookie" role="dialog" aria-labelledby="cookie-title" aria-live="polite">
      <div className="cookie__inner">
        <div className="cookie__copy">
          <p id="cookie-title" className="cookie__title">
            {t.cookieTitle}
          </p>
          <p className="cookie__body">
            {t.cookieBody}{" "}
            <Link to={pathFromView({ kind: "privacy" }, locale)}>{t.privacyLink}</Link>
          </p>
        </div>
        <div className="cookie__actions">
          <button className="cookie__btn cookie__btn--ghost" type="button" onClick={() => choose("rejected")}>
            {t.cookieReject}
          </button>
          <button className="cookie__btn cookie__btn--solid" type="button" onClick={() => choose("accepted")}>
            {t.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  );
}
