import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { alsoInto } from "../data/knowledgeBase";
import BioScene from "./BioScene";

const Bio = () => {
  return (
    <>
      <div className={styles.sectionBio}>
        <motion.div
          variants={fadeIn("up", "tween", 0, 0.5)}
          className='flex items-center gap-3 mb-16 sm:mb-20'
        >
          <span className='w-1.5 h-1.5 rounded-full bg-accent' />
          <p className={styles.label}>Bio</p>
        </motion.div>

        {/* Each block gets a small running label instead of reading as one
            undifferentiated wall of prose — an editorial device, not a
            stat: it turns four back-to-back paragraphs into four distinct,
            scannable beats. flex-wrap rather than a fixed grid so the
            label/text pairing stacks cleanly at any width, not just at the
            sm breakpoint. */}
        <div className='space-y-16 sm:space-y-20'>
          <motion.div
            variants={fadeIn("up", "tween", 0.05, 0.6)}
            className='flex flex-wrap gap-x-12 gap-y-3'
          >
            <p className='font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex-[0_0_120px] pt-1'>
              Origin
            </p>
            <p className='font-serif text-paper leading-snug text-[clamp(24px,3vw,32px)] flex-[1_1_380px] text-pretty'>
              I got into web3 before it was cool. Still here after it's
              "died" four times.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "tween", 0.12, 0.6)}
            className='flex flex-wrap gap-x-12 gap-y-3'
          >
            <p className='font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex-[0_0_120px] pt-1'>
              The Work
            </p>
            <p className='font-serif text-paper leading-snug text-[clamp(24px,3vw,32px)] flex-[1_1_380px] text-pretty'>
              Six years building smart contracts, DeFi protocols, and ZK
              systems: the kind of work where a bug isn't a bug ticket, it's
              a headline. I built and audited ShibaSwap, among projects
              holding over $1B in TVL combined, which mostly means I check
              things twice. Then a third time.
            </p>
          </motion.div>

          {/* Pull quote — the one line that should land harder than the
              rest. No border, no italic-only treatment: the accent color
              and the bigger size do that work now. */}
          <motion.blockquote
            variants={fadeIn("up", "tween", 0.2, 0.6)}
            className='flex flex-wrap gap-x-12 gap-y-3'
          >
            <p className='font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex-[0_0_120px] pt-1'>
              The Stance
            </p>
            <div className='flex-[1_1_380px]'>
              <p className='font-serif italic text-accent leading-tight text-[clamp(34px,4.4vw,48px)] text-balance'>
                I'm not here to shill.
              </p>
              <p className={`${styles.body} text-base sm:text-lg mt-4 max-w-md`}>
                I genuinely think decentralization is one of the more
                important things being built right now. I've just grown
                allergic to founders who treat it like a vending machine.
              </p>
            </div>
          </motion.blockquote>

          <motion.div
            variants={fadeIn("up", "tween", 0.28, 0.6)}
            className='flex flex-wrap gap-x-12 gap-y-3'
          >
            <p className='font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex-[0_0_120px] pt-1'>
              Now
            </p>
            <p className='font-serif text-paper leading-snug text-[clamp(24px,3vw,32px)] flex-[1_1_380px] text-pretty'>
              Lately, that same instinct (build it properly, understand it
              deeply) has pulled me into AI. Agents, infrastructure, the
              places where the two worlds are starting to overlap. I write
              about what's real: the infrastructure, the hard problems,
              where this is all actually going, not where the hype wants it
              to.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed moment — breaks out of the text column on purpose.
          A quiet abstract 3D form instead of a photo: this is "also into"
          shown, not just said, without reaching for stock imagery. Plain
          div for the breakout positioning — framer-motion writes its own
          inline transform for the fade-in, which silently overrides a
          Tailwind translate-x utility on the same element, so the
          animation lives on an inner element instead. */}
      <div className='relative w-screen left-1/2 -translate-x-1/2 mt-20 min-h-[64vh] sm:min-h-[70vh] overflow-hidden bg-ink'>
        <motion.div
          variants={fadeIn("", "tween", 0.15, 0.8)}
          aria-hidden
          className='absolute inset-0'
        >
          <BioScene />
        </motion.div>
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background:
              "radial-gradient(55% 55% at 75% 35%, rgba(79,209,197,0.1), transparent 70%)",
          }}
        />
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background:
              "linear-gradient(to top, #000 5%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className={`relative h-full flex items-end ${styles.sectionBio} py-12 sm:py-16`}>
          <motion.p
            variants={fadeIn("up", "tween", 0.25, 0.6)}
            className='font-serif italic text-paper text-[clamp(26px,3.4vw,38px)] max-w-md text-balance'
          >
            Outside of that: {alsoInto.toLowerCase()} Make of that what you
            will.
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Bio, "bio");
