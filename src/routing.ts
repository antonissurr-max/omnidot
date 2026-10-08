import type { Locale } from "./i18n";
import type { PageId, View } from "./types";

export const SITE_ORIGIN = "https://omnidot.gr";

export const PAGE_IDS: PageId[] = ["social", "content", "performance", "web"];

/** Ensure a path uses the trailing-slash canonical form (root stays `/`). */
export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  const q = path.indexOf("?");
  const pathname = q === -1 ? path : path.slice(0, q);
  const query = q === -1 ? "" : path.slice(q);
  if (pathname.endsWith("/")) return `${pathname}${query}`;
  return `${pathname}/${query}`;
}

export function localeFromPathname(pathname: string): Locale {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/el" || path.startsWith("/el/") ? "el" : "en";
}

/** Path without /el prefix. */
export function stripLocalePrefix(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/el") return "/";
  if (path.startsWith("/el/")) {
    const rest = path.slice(3);
    return rest ? rest : "/";
  }
  return path;
}

export function pathFromView(view: View, locale: Locale = "en"): string {
  const prefix = locale === "el" ? "/el" : "";

  if (view.kind === "index" || view.kind === "notfound") {
    return prefix ? withTrailingSlash(prefix) : "/";
  }

  if (view.kind === "about") {
    const base = withTrailingSlash(`${prefix}/about`);
    return view.interest ? `${base}?interest=${view.interest}` : base;
  }

  if (view.kind === "pricing") {
    return withTrailingSlash(`${prefix}/pricing`);
  }

  if (view.kind === "articles") {
    return withTrailingSlash(`${prefix}/articles`);
  }

  if (view.kind === "article") {
    return withTrailingSlash(`${prefix}/articles/${view.slug}`);
  }

  if (view.kind === "privacy") {
    return withTrailingSlash(`${prefix}/privacy`);
  }

  return withTrailingSlash(`${prefix}/${view.id}`);
}

export function viewFromLocation(pathname: string, search: string): View {
  const bare = stripLocalePrefix(pathname);
  if (bare === "/") return { kind: "index" };
  if (bare === "/about") {
    const interest = new URLSearchParams(search).get("interest");
    if (interest && PAGE_IDS.includes(interest as PageId)) {
      return { kind: "about", interest: interest as PageId };
    }
    return { kind: "about" };
  }
  if (bare === "/pricing") return { kind: "pricing" };
  if (bare === "/articles") return { kind: "articles" };
  if (bare.startsWith("/articles/")) {
    const slug = bare.slice("/articles/".length).replace(/\/+$/, "");
    if (slug && !slug.includes("/")) return { kind: "article", slug };
  }
  if (bare === "/privacy") return { kind: "privacy" };
  const id = bare.slice(1) as PageId;
  if (PAGE_IDS.includes(id)) return { kind: "page", id };
  return { kind: "notfound" };
}

/** Switch language while staying on the same logical page. */
export function pathForLocale(
  pathname: string,
  search: string,
  locale: Locale,
): string {
  const view = viewFromLocation(pathname, search);
  if (view.kind === "notfound") {
    return locale === "el" ? "/el/" : "/";
  }
  return pathFromView(view, locale);
}
