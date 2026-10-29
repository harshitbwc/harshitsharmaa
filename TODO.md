# Site audit — 2026-09-11

Findings from a full pass through the rebuilt site. Not yet actioned except where noted. Revisit and check off as we go.

## Critical — broken right now

- [ ] **Contact form is completely non-functional.** `VITE_APP_EMAILJS_SERVICE_ID` / `TEMPLATE_ID` / `PUBLIC_KEY` are not set anywhere (`.env` only has `GROQ_API_KEY`). Tested live: EmailJS throws `"The public key is required"` synchronously, which skips the error handler entirely — the Send button gets stuck on "Sending…" forever with zero feedback to the visitor. Needs:
  - Real EmailJS credentials from Harshit (service ID, template ID, public key) — only he can get these from his EmailJS dashboard.
  - A code fix regardless: wrap the `emailjs.send()` call so a thrown error (not just a rejected promise) still resets `loading` and shows the error message, so a misconfiguration or outage fails *visibly* instead of hanging.

## Disconnected / leftover from the old template

- [ ] Favicon (`public/logo.svg`) is still the original template's mark — an abstract traced shape with no connection to Harshit. Rendered it to confirm. Needs a new one matching the site's identity (e.g. a simple "HS" wordmark).
- [ ] No `apple-touch-icon` / other PWA icon sizes — same root cause as the favicon.
- [ ] Radio track titles are placeholder-quality ("Lofi Vibes 1" / "Lofi Vibes 2") — everything else on the site got a voice pass, this didn't.

## Missing — content a hiring decision needs

- [ ] Work section has zero outbound links — no links to ShibaSwap, Swifty Wallet, Pether.AI, SolMate, GitHub, anything. "$1B+ in TVL" is a strong claim with nothing clickable to verify it.
- [ ] "I write about what's real" (Bio) has no link to where he actually writes. Only pointer to X/Twitter is buried in the Footer's 5-icon row.
- [ ] No resume/CV — not necessarily required, but should be a conscious yes/no rather than an accidental omission.

## Technical

- [ ] No Open Graph / Twitter Card meta tags — sharing the link anywhere (Slack, iMessage, X) currently shows no title/description/image. Needs an OG image too (a crop of the hero portrait would work).
- [ ] No `robots.txt` / sitemap — minor SEO hygiene for a one-pager, not urgent.
- [ ] Work-log content is duplicated between `src/constants/index.js` (site copy) and `src/data/knowledgeBase.js` (AI system prompt) — already slightly different wording in each. Risk: edit one, forget the other, AI starts contradicting the page.
- [ ] ~5MB of unused files sitting in `public/` (the unused second portrait + the uncompressed original of the one we used) — deploys as static, publicly reachable at a guessable URL despite not being linked anywhere. Pure cleanup.

## Worth a conscious decision, not obviously wrong

- [ ] No `prefers-reduced-motion` handling — Aurora, cursor glow, magnetic hover, and the signature mark's idle rotation all run unconditionally regardless of the visitor's OS motion setting.
- [ ] The draggable signature mark (bottom-right) has no hint that it's interactive — if nobody discovers the drag, the craft behind it goes unnoticed.
- [ ] Dark-only, no light mode — almost certainly the right call for this brand; flagging as a decision made, not an oversight.

## Done

- [x] Hero portrait was cropped by a fixed-height box on wide/short viewports (worst on ~1920×1080, where it cut off mid-chest). Fixed: the image now renders at its true, uncropped aspect ratio, and the Hero section grows taller than one screen where needed so the rest of the photo reveals as you scroll instead of just being cut off.
