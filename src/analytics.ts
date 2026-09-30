import {
  CONSENT_EVENT,
  hasAnalyticsConsent,
  type ConsentState,
} from "./consent";
import { site } from "./site";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let scriptRequested = false;

function measurementId(): string {
  return site.gaMeasurementId?.trim() ?? "";
}

function ensureGtag(): boolean {
  const id = measurementId();
  if (!id || typeof window === "undefined") return false;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // Official gtag queues via Arguments object
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }

  if (!scriptRequested) {
    scriptRequested = true;
    window.gtag("js", new Date());
    window.gtag("config", id, {
      anonymize_ip: true,
      send_page_view: false,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }

  return true;
}

export function trackPageView(path?: string) {
  if (!hasAnalyticsConsent() || !ensureGtag() || !window.gtag) return;
  const pagePath =
    path ?? `${window.location.pathname}${window.location.search}`;
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!hasAnalyticsConsent() || !ensureGtag() || !window.gtag) return;
  window.gtag("event", name, params);
}

/** Call once at app boot. Loads GA only after analytics consent. */
export function initAnalytics() {
  if (hasAnalyticsConsent()) ensureGtag();

  window.addEventListener(CONSENT_EVENT, ((e: CustomEvent<ConsentState>) => {
    if (!e.detail.analytics) return;
    ensureGtag();
    trackPageView();
  }) as EventListener);
}
