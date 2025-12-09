import * as React from "react";

type OpenGraphProps = {
  title?: string;
  description?: string;
  type?: string;
};

type TwitterProps = {
  card?: string;
  site?: string;
};

type Props = {
  title: string;
  description?: string;
  keywords?: string[] | string;
  author?: string;
  robots?: string;
  canonical?: string;
  openGraph?: OpenGraphProps;
  twitter?: TwitterProps;
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

const ensureMetaProperty = (property: string, content: string) => {
  if (!content) return;
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const ensureLink = (rel: string, href: string) => {
  if (!href) return;
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
};

const Seo: React.FC<Props> = ({ title, description, keywords, author, robots, canonical, openGraph, twitter }) => {
  React.useEffect(() => {
    if (title) document.title = title;
    if (typeof description === "string") ensureMeta("description", description);
    if (typeof author === "string") ensureMeta("author", author);
    if (typeof robots === "string") ensureMeta("robots", robots);
    const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
    if (typeof kw === "string") ensureMeta("keywords", kw);
    
    // Canonical URL
    if (canonical) ensureLink("canonical", canonical);
    
    // OpenGraph
    if (openGraph) {
      if (openGraph.title) ensureMetaProperty("og:title", openGraph.title);
      if (openGraph.description) ensureMetaProperty("og:description", openGraph.description);
      if (openGraph.type) ensureMetaProperty("og:type", openGraph.type);
    }
    
    // Twitter
    if (twitter) {
      if (twitter.card) ensureMeta("twitter:card", twitter.card);
      if (twitter.site) ensureMeta("twitter:site", twitter.site);
    }
  }, [title, description, keywords, author, robots, canonical, openGraph, twitter]);

  return null;
};

export default Seo;
