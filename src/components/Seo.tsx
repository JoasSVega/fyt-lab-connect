import * as React from "react";

type Props = { title: string; description?: string };

const Seo: React.FC<Props> = ({ title, description }) => {
  React.useEffect(() => {
    if (title) document.title = title;
    if (typeof description === "string") {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);

  return null;
};

export default Seo;
