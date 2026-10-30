import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { products, visibleProducts } from "../constants";
import { useChatContext } from "../context/ChatContext";

const LINK_LABELS = {
  website: "Website",
  github: "GitHub",
  demo: "Demo",
  appStore: "App Store",
  playStore: "Play Store",
  npm: "npm",
  farcaster: "Open in Farcaster",
  changelog: "Changelog",
};

// A YouTube/Vimeo URL becomes an embedded player; anything else in
// `product.video` is treated as a direct file (self-hosted mp4, a CDN
// link) and played natively instead. Both embed variants autoplay muted
// (the only way browsers allow autoplay at all) — their native players
// still give the viewer a pause button, same as the direct-file <video>.
const getVideoEmbedUrl = (url) => {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&mute=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1`;
  return null;
};

const ProductDetail = () => {
  const { slug } = useParams();
  const { openChat } = useChatContext();
  const [copied, setCopied] = useState(false);
  const product = products.find((p) => p.slug === slug);

  // An unknown slug (typo'd URL, a product that's been removed) or a
  // hidden one (not ready to show publicly, linked directly) goes back
  // to the index instead of showing a dead end.
  if (!product || product.hidden) return <Navigate to='/products' replace />;

  const index = visibleProducts.findIndex((p) => p.slug === slug);

  // `download` gets its own prominent CTA below, not a plain pill in this
  // row — see the block right after the install-command one.
  const linkEntries = Object.entries(product.links || {}).filter(
    ([key, url]) => url && key !== "download"
  );
  // Supports multiple paragraphs via a blank line in the source string,
  // same convention as everywhere else prose lives in this codebase.
  const paragraphs = product.description
    ? product.description.split("\n\n").filter(Boolean)
    : [];
  const hasWriteup = paragraphs.length > 0;

  const prev = visibleProducts[(index - 1 + visibleProducts.length) % visibleProducts.length];
  const next = visibleProducts[(index + 1) % visibleProducts.length];

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(product.installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard permission denied or unavailable — the command is still
      // right there to select by hand.
    }
  };

  return (
    <div className={`${styles.container} pt-32 sm:pt-40 pb-24 min-h-screen`}>
      <motion.div
        key={slug}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Prev/Next right under the navbar too, not just at the bottom
            of the page — compact pills, not the full cards down there, so
            jumping between products doesn't need a scroll either way. */}
        <div className='flex items-center justify-between gap-3 mb-8'>
          <Link
            to='/products'
            className='inline-flex items-center min-h-[44px] font-sans text-xs tracking-[0.2em] uppercase text-muted hover:text-accent transition-colors shrink-0'
          >
            ← All products
          </Link>
          <div className='flex items-center gap-2 min-w-0'>
            <Link
              to={`/products/${prev.slug}`}
              className='inline-flex items-center gap-1.5 min-h-[36px] max-w-[9rem] sm:max-w-[12rem] font-sans text-xs text-muted border border-line rounded-full pl-2.5 pr-3 hover:border-accent hover:text-accent transition-colors'
              aria-label={`Previous: ${prev.name}`}
            >
              <span className='shrink-0'>‹</span>
              <span className='truncate'>{prev.name}</span>
            </Link>
            <Link
              to={`/products/${next.slug}`}
              className='inline-flex items-center gap-1.5 min-h-[36px] max-w-[9rem] sm:max-w-[12rem] font-sans text-xs text-muted border border-line rounded-full pl-3 pr-2.5 hover:border-accent hover:text-accent transition-colors'
              aria-label={`Next: ${next.name}`}
            >
              <span className='truncate'>{next.name}</span>
              <span className='shrink-0'>›</span>
            </Link>
          </div>
        </div>

        <p className='font-mono text-[11px] tracking-[0.16em] uppercase text-muted'>
          {String(index + 1).padStart(2, "0")} / {visibleProducts.length}
        </p>

        <div className='flex flex-wrap items-center gap-3 mt-3 mb-3'>
          {product.logo && (
            <img
              src={product.logo}
              alt=''
              className='w-9 h-9 sm:w-11 sm:h-11 rounded-lg border border-line2 object-cover shrink-0'
            />
          )}
          <h1
            className='font-serif text-paper leading-[1.02] text-[clamp(28px,4.2vw,44px)]'
            style={{ overflowWrap: "anywhere" }}
          >
            {product.name}
          </h1>
          {product.status && (
            <span className='font-sans text-xs tracking-wide text-muted border border-line rounded-full px-3 py-1'>
              {product.status}
            </span>
          )}
          {product.year && (
            <span className='font-sans text-xs tracking-wide text-muted'>{product.year}</span>
          )}
        </div>

        {product.tagline && (
          <p className='font-serif italic text-lg sm:text-xl text-accent leading-snug max-w-2xl mb-8 text-balance'>
            {product.tagline}
          </p>
        )}

        {/* Some things are installed, not downloaded — a copyable command
            instead of a download button for anything that ships as a
            package rather than an app. */}
        {product.installCommand && (
          <div className='flex items-center gap-3 mb-10 max-w-full'>
            <code className='font-mono text-sm text-paper bg-surface border border-line rounded-full px-4 py-2.5 overflow-x-auto whitespace-nowrap'>
              {product.installCommand}
            </code>
            <button
              onClick={handleCopyInstall}
              className='shrink-0 font-mono text-xs tracking-wide uppercase text-muted border border-line rounded-full px-3 py-2.5 hover:border-accent hover:text-paper transition-colors'
            >
              {copied ? <span className='text-accent'>Copied</span> : "Copy"}
            </button>
          </div>
        )}

        {/* A two-part app (a Mac app and a tablet app, say) needs more than
            one file to grab — a row of buttons instead of the single CTA
            below, sharing the same note/disclaimer underneath. */}
        {product.downloads?.length > 0 && (
          <div className='mb-10'>
            <div className='flex flex-wrap gap-3'>
              {product.downloads.map((d) => (
                <a
                  key={d.label}
                  href={d.url}
                  className='inline-flex items-center gap-2 min-h-[48px] font-sans text-sm font-semibold text-black bg-accent rounded-full px-6 hover:bg-accent2 transition-colors'
                >
                  {d.label} ↓
                </a>
              ))}
            </div>
            {product.downloadNote && (
              <p className='font-sans text-xs text-muted mt-3 max-w-md leading-relaxed'>
                {product.downloadNote}
              </p>
            )}
            {product.disclaimer && (
              <p className='font-sans text-[11px] text-muted/60 mt-1.5 max-w-md leading-relaxed'>
                {product.disclaimer}
              </p>
            )}
          </div>
        )}

        {/* An actual file to grab — its own prominent button instead of a
            plain pill, plus the small-print (version, size, OS warnings)
            right underneath it. */}
        {!product.downloads?.length && product.links?.download && (
          <div className='mb-10'>
            <a
              href={product.links.download}
              className='inline-flex items-center gap-2 min-h-[48px] font-sans text-sm font-semibold text-black bg-accent rounded-full px-6 hover:bg-accent2 transition-colors'
            >
              {product.downloadLabel || "Download"} ↓
            </a>
            {product.downloadNote && (
              <p className='font-sans text-xs text-muted mt-3 max-w-md leading-relaxed'>
                {product.downloadNote}
              </p>
            )}
            {product.disclaimer && (
              <p className='font-sans text-[11px] text-muted/60 mt-1.5 max-w-md leading-relaxed'>
                {product.disclaimer}
              </p>
            )}
          </div>
        )}

        {linkEntries.length > 0 && (
          <div className='flex flex-wrap gap-3 mb-10'>
            {linkEntries.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center min-h-[44px] font-sans text-sm text-paper border border-line rounded-full px-4 hover:border-accent hover:text-accent transition-colors'
              >
                {LINK_LABELS[key] || key} ↗
              </a>
            ))}
          </div>
        )}

        {/* Status panel — an honest, structured "here's what actually
            exists" instead of a single vague sentence. */}
        <div className='grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line2 border border-line2 rounded-xl overflow-hidden mb-6'>
          <div className='p-5'>
            <p className='font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-1.5'>
              Build
            </p>
            <p className='font-sans text-sm text-paper'>Exists</p>
          </div>
          <div className='p-5'>
            <p className='font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-1.5'>
              One-liner
            </p>
            <p className='font-sans text-sm text-paper'>
              {product.tagline ? "Written" : "Not yet"}
            </p>
          </div>
          <div className='p-5'>
            <p className='font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-1.5'>
              Full writeup
            </p>
            <p className='font-sans text-sm text-paper inline-flex items-center gap-2'>
              {hasWriteup ? (
                "Done"
              ) : (
                <>
                  <span className='w-1.5 h-1.5 rounded-full bg-accent animate-pulse' />
                  In progress
                </>
              )}
            </p>
          </div>
        </div>

        {/* One hero preview, richest available wins — a video over a gif
            over a static banner, instead of stacking all three and saying
            the same thing twice. The card grid still only ever uses
            `image`, so this is additive, not a replacement for that. */}
        {(product.video || product.gif || product.image) && (
          <div className='rounded-2xl overflow-hidden border border-line2 mb-10'>
            {product.video ? (
              (() => {
                const embedUrl = getVideoEmbedUrl(product.video);
                return embedUrl ? (
                  <div className='aspect-video'>
                    <iframe
                      src={embedUrl}
                      title={`${product.name} demo`}
                      className='w-full h-full'
                      allow='autoplay; fullscreen; picture-in-picture'
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    src={product.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className='w-full h-auto block'
                  />
                );
              })()
            ) : product.gif ? (
              <img src={product.gif} alt={`${product.name} demo`} className='w-full h-auto block' />
            ) : (
              <img src={product.image} alt='' className='w-full h-auto block' />
            )}
          </div>
        )}

        {!hasWriteup && (
          <p className={`${styles.body} text-sm max-w-2xl mb-10`}>
            {product.tagline
              ? "That's the short version. The long one (what it does, how it's built, what broke along the way) is still being written."
              : "It exists; the words about it don't, yet. The chat knows the short version, so ask it anything in the meantime."}
          </p>
        )}

        {hasWriteup && (
          <div className='space-y-4 max-w-2xl mb-12'>
            {paragraphs.map((para, i) => (
              <p key={i} className={`${styles.body} text-sm sm:text-base`}>
                {para}
              </p>
            ))}
          </div>
        )}

        {product.features?.length > 0 && (
          <div className='mb-12'>
            <p className={`${styles.label} mb-3`}>Key features</p>
            <ul className='grid sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-2xl'>
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className='flex items-start gap-2.5 font-sans text-sm text-muted leading-relaxed'
                >
                  <span className='mt-[7px] w-1.5 h-1.5 rounded-full bg-accent shrink-0' />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.techStack?.length > 0 && (
          <div className='mb-12'>
            <p className={`${styles.label} mb-3`}>Built with</p>
            <div className='flex flex-wrap gap-2'>
              {product.techStack.map((tech) => (
                <span
                  key={tech}
                  className='font-sans text-xs text-muted border border-line rounded-full px-3 py-1.5'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => openChat(`What is ${product.name} and how does it work?`)}
          className='inline-flex items-center min-h-[48px] font-sans text-sm font-semibold text-black bg-accent rounded-full px-6 hover:bg-accent2 transition-colors mb-16'
        >
          Ask about {product.name}
        </button>

        <div className='grid sm:grid-cols-2 gap-3 border-t border-line2 pt-8'>
          <Link
            to={`/products/${prev.slug}`}
            className='group flex flex-col gap-1 rounded-xl border border-line2 p-5 hover:border-accent transition-colors'
          >
            <span className='font-mono text-[10px] tracking-[0.14em] uppercase text-muted'>
              ← Previous
            </span>
            <span className='font-serif text-lg text-paper group-hover:text-accent transition-colors'>
              {prev.name}
            </span>
          </Link>
          <Link
            to={`/products/${next.slug}`}
            className='group flex flex-col gap-1 rounded-xl border border-line2 p-5 sm:text-right hover:border-accent transition-colors'
          >
            <span className='font-mono text-[10px] tracking-[0.14em] uppercase text-muted'>
              Next →
            </span>
            <span className='font-serif text-lg text-paper group-hover:text-accent transition-colors'>
              {next.name}
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
