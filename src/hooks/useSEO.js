import { useEffect } from "react";

const SITE_URL = "https://harshitsharmaa.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

// This is a client-rendered SPA with no server-side rendering, so these
// updates only ever run after JS executes. Google's crawler runs JS and
// indexes the result fine, and the browser tab/title updates correctly —
// but a bot that scrapes a link without executing JS (Twitter, Discord,
// Slack, iMessage) still only ever sees index.html's static tags, not
// these per-page ones. Fixing that for real needs prerendering or an
// edge function keyed on user-agent, not a client-side hook like this.
export const useSEO = ({ title, description, path = "/", image, type = "website" }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — Harshit Sharmaa` : "Harshit Sharmaa";
    const desc = description || "Web3 for six years. AI lately. Still not in a lane.";
    const url = `${SITE_URL}${path}`;
    const img = image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : DEFAULT_IMAGE;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setCanonical(url);

    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", img);

    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", img);

    // Restore the site-wide defaults on unmount so navigating away (e.g.
    // back to "/") doesn't leave a product's title/description behind.
    return () => {
      document.title = "Harshit Sharmaa";
      setMeta("name", "description", "Web3 for six years. AI lately. Still not in a lane.");
      setCanonical(SITE_URL + "/");
      setMeta("property", "og:type", "website");
      setMeta("property", "og:url", SITE_URL + "/");
      setMeta("property", "og:title", "Harshit Sharmaa");
      setMeta("property", "og:description", "Web3 for six years. AI lately. Still not in a lane.");
      setMeta("property", "og:image", DEFAULT_IMAGE);
      setMeta("name", "twitter:title", "Harshit Sharmaa");
      setMeta("name", "twitter:description", "Web3 for six years. AI lately. Still not in a lane.");
      setMeta("name", "twitter:image", DEFAULT_IMAGE);
    };
  }, [title, description, path, image, type]);
};
