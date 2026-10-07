export type PageId = "social" | "content" | "performance" | "web";

export type View =
  | { kind: "index" }
  | { kind: "about"; interest?: PageId }
  | { kind: "pricing" }
  | { kind: "articles" }
  | { kind: "article"; slug: string }
  | { kind: "privacy" }
  | { kind: "page"; id: PageId }
  | { kind: "notfound" };
