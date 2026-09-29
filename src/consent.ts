export type ConsentChoice = "accepted" | "rejected";

export type ConsentState = {
  analytics: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "omnidot.consent.v1";
export const CONSENT_EVENT = "omnidot:consent";

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed?.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function writeConsent(choice: ConsentChoice): ConsentState {
  const next: ConsentState = {
    analytics: choice === "accepted",
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
  return next;
}

export const CONSENT_OPEN_EVENT = "omnidot:consent-open";

export function openConsentPreferences() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
