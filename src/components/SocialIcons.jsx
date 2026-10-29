// Minimal single-color marks (currentColor) for the footer — sized to sit
// cleanly in a small round button and inherit the hover color from their
// wrapper, same as every other icon on the site.

export const XIcon = (props) => (
  <svg viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' {...props}>
    <rect x='3' y='3' width='18' height='18' rx='5' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17.4' cy='6.6' r='1.1' fill='currentColor' stroke='none' />
  </svg>
);

export const GitHubIcon = (props) => (
  <svg viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z'
    />
  </svg>
);

export const LinkedInIcon = (props) => (
  <svg viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5ZM.22 8.24H4.7V23H.22V8.24ZM8.4 8.24h4.29v2.01h.06c.6-1.13 2.06-2.33 4.24-2.33 4.53 0 5.37 2.98 5.37 6.86V23h-4.48v-6.44c0-1.54-.03-3.52-2.14-3.52-2.15 0-2.48 1.68-2.48 3.41V23H8.4V8.24Z' />
  </svg>
);

// Farcaster's actual mark isn't as universally reproduced as the other
// four, so this is a simplified arch/gateway glyph in the same spirit
// rather than a pixel-exact reproduction — the hover tooltip names it
// either way.
export const FarcasterIcon = (props) => (
  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinejoin='round' {...props}>
    <path d='M6 4h12v3.3l-1.6 1.9V19a.8.8 0 0 1-.8.8h-2.2v-6.1a2.4 2.4 0 0 0-4.8 0v6.1H6.4a.8.8 0 0 1-.8-.8V9.2L4 7.3V4h2Z' />
  </svg>
);
