import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { workLog } from "../constants";

const revealVariant = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Work = () => {
  return (
    <div className={styles.container}>
      <div className='flex flex-wrap gap-x-16 gap-y-10'>
        {/* Sticky on wide screens — the $1B+ moment stays in view as the
            full, always-expanded timeline scrolls past it on the right. */}
        <div className='flex-[1_1_280px] max-w-[360px] lg:sticky lg:top-28 lg:self-start'>
          <motion.p variants={textVariant()} className={styles.sectionEyebrow}>
            Work · 2020 → now
          </motion.p>
          <motion.p
            variants={fadeIn("up", "tween", 0.05, 0.6)}
            className='font-serif text-paper leading-none mt-4 text-[clamp(88px,11vw,136px)]'
          >
            $1B<span className='text-accent'>+</span>
          </motion.p>
          <motion.p variants={fadeIn("up", "tween", 0.1, 0.6)} className={`${styles.body} text-sm mt-2`}>
            in TVL. No, that's not a typo.
          </motion.p>
        </div>

        {/* Every role expanded — no accordion. Years lead each row in a
            fixed column so the timeline reads top-to-bottom at a glance
            even before reading a word of the description. */}
        <ol className='flex-[2_1_480px] min-w-0'>
          {workLog.map((entry, i) => {
            const isCurrent = i === 0;
            return (
              <motion.li
                key={entry.org}
                variants={fadeIn("up", "tween", i * 0.08, 0.6)}
                className='grid grid-cols-[96px_1fr] gap-4 py-8 border-t border-line2 first:border-t-0 lg:first:border-t'
              >
                <div className='font-mono text-xs pt-1'>
                  {isCurrent ? (
                    <span className='inline-flex items-center gap-1.5 text-accent'>
                      <span className='w-1.5 h-1.5 rounded-full bg-accent animate-pulse' />
                      NOW
                    </span>
                  ) : (
                    <span className='text-muted'>{entry.date}</span>
                  )}
                </div>
                <div className='overflow-hidden'>
                  <motion.h3
                    variants={revealVariant}
                    className='font-serif text-paper text-[clamp(22px,2.4vw,28px)]'
                  >
                    {entry.role}
                  </motion.h3>
                  <p className='font-sans text-[15px] text-muted mt-1'>{entry.org}</p>
                  <p className={`${styles.body} text-[17px] mt-3 max-w-[560px]`}>{entry.text}</p>
                  {entry.tags?.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-4'>
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className='font-mono text-[11px] text-muted border border-line rounded-full px-2.5 py-1'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SectionWrapper(Work, "work");
