import * as React from "react";

type Props = {
  title: string;
  description?: string;
  keywords?: string[] | string;
  author?: string;
  robots?: string; // e.g., "index, follow"
};

const ensureMeta = (name: string, content: string) => {
  if (!content) return;
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const Seo: React.FC<Props> = ({ title, description, keywords, author, robots }) => {
  React.useEffect(() => {
    if (title) document.title = title;
    if (typeof description === "string") ensureMeta("description", description);
    if (typeof author === "string") ensureMeta("author", author);
    if (typeof robots === "string") ensureMeta("robots", robots);
    const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
    if (typeof kw === "string") ensureMeta("keywords", kw);
  }, [title, description, keywords, author, robots]);

  return null;
};

export default Seo;
