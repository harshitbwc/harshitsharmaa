import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { socials } from "../constants";
import Magnetic from "./Magnetic";

const Contact = () => {
  const [form, setForm] = useState({ name: "", about: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard permission denied or unavailable — the address is still
      // right there as a link, so this isn't a dead end either way.
    }
  };

  // No EmailJS account, no server round-trip, nothing that can silently
  // fail: this opens a pre-filled Gmail compose draft in the visitor's own
  // account, addressed to me. They hit send themselves, from an address
  // they actually control, so there's no delivery step I'm trusting a
  // third-party service to complete.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = form.about ? form.about : `Hello from ${form.name}`;
    const body = `${form.message}\n\n${form.name}`;
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(socials.email)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div className='relative w-screen left-1/2 -translate-x-1/2 -my-20 sm:-my-28 py-24 sm:py-32 overflow-hidden bg-ink'>
      {/* The warm bokeh photo this used to be clashed with the rest of the
          site's black/white/cyan palette once that palette went fully
          monochrome — a quiet radial glow in the one accent color instead. */}
      <div
        aria-hidden
        className='absolute inset-0'
        style={{
          background:
            "radial-gradient(60% 50% at 88% 15%, rgba(79,209,197,0.16), transparent 70%)," +
            "radial-gradient(45% 45% at 8% 95%, rgba(79,209,197,0.08), transparent 70%)",
        }}
      />

      <div className={`relative ${styles.container}`}>
        <div className='flex flex-wrap gap-x-16 gap-y-12'>
          <div className='flex-[1_1_360px] max-w-[480px]'>
            <motion.p variants={textVariant()} className={styles.sectionEyebrow}>
              Contact
            </motion.p>

            <motion.h2
              variants={fadeIn("up", "tween", 0.05, 0.6)}
              className='font-serif text-paper leading-none mt-4 mb-6 text-[clamp(40px,5vw,60px)] text-balance'
            >
              Got something worth building?
            </motion.h2>

            <motion.p variants={fadeIn("up", "tween", 0.1, 0.6)} className={`${styles.body} mb-5`}>
              Fastest way to reach me is email. Or fill the form: it opens a
              draft in your own Gmail, addressed to me. Nothing sends until
              you hit send there.
            </motion.p>

            <motion.div
              variants={fadeIn("up", "tween", 0.15, 0.6)}
              className='flex flex-wrap items-center gap-3'
            >
              <a
                href={`mailto:${socials.email}`}
                className='font-sans text-paper border-b border-accent hover:text-accent transition-colors'
              >
                {socials.email}
              </a>
              <button
                onClick={handleCopy}
                className='font-mono text-xs tracking-wide uppercase text-muted border border-line rounded-full px-3 py-1.5 hover:border-accent hover:text-paper transition-colors'
              >
                {copied ? <span className='text-accent'>Copied</span> : "Copy"}
              </button>
            </motion.div>
          </div>

          <div className='flex-[1_1_360px] max-w-[480px]'>
            {sent ? (
              <motion.p
                variants={fadeIn("up", "tween", 0.15, 0.6)}
                className='font-serif text-2xl text-paper'
              >
                Opened in Gmail. Hit send over there and I'll see it.
              </motion.p>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                variants={fadeIn("up", "tween", 0.15, 0.6)}
                className='flex flex-col gap-5 bg-[rgba(12,12,12,0.72)] backdrop-blur-xl border border-line rounded-2xl p-6 sm:p-8'
              >
                <div className='flex flex-wrap gap-5'>
                  <label className='flex flex-col gap-2 flex-1 min-w-[140px]'>
                    <span className='font-sans text-xs text-muted'>Your name</span>
                    <input
                      id='contact-name'
                      type='text'
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      required
                      className='bg-transparent border-b border-line outline-none py-2 font-sans text-paper transition-colors'
                    />
                  </label>
                  <label className='flex flex-col gap-2 flex-1 min-w-[140px]'>
                    <span className='font-sans text-xs text-muted'>What's it about?</span>
                    <input
                      id='contact-about'
                      type='text'
                      name='about'
                      value={form.about}
                      onChange={handleChange}
                      placeholder='Audit, build, campaign…'
                      className='bg-transparent border-b border-line outline-none py-2 font-sans text-paper placeholder:text-muted/60 transition-colors'
                    />
                  </label>
                </div>
                <label className='flex flex-col gap-2'>
                  <span className='font-sans text-xs text-muted'>Message</span>
                  <textarea
                    id='contact-message'
                    name='message'
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className='bg-transparent border-b border-line outline-none py-2 font-sans text-paper resize-none transition-colors'
                  />
                </label>

                <div className='flex items-center gap-4 mt-2'>
                  <Magnetic strength={0.3}>
                    <button
                      type='submit'
                      className='inline-flex items-center min-h-12 font-sans text-sm font-semibold text-black bg-accent rounded-full px-6 hover:bg-accent2 transition-colors'
                    >
                      Draft it in Gmail ↗
                    </button>
                  </Magnetic>
                  <span className='font-sans text-xs text-muted'>Opens in a new tab</span>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
