import { socials } from "../constants";
import { XIcon, InstagramIcon, GitHubIcon, LinkedInIcon, FarcasterIcon } from "./SocialIcons";

const links = [
  { label: "X", href: socials.twitter, Icon: XIcon },
  { label: "Instagram", href: socials.instagram, Icon: InstagramIcon },
  { label: "GitHub", href: socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedInIcon },
  { label: "Farcaster", href: socials.farcaster, Icon: FarcasterIcon },
];

const Mark = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 28 28'
    className='border border-[#2b2b2b] rounded-[7px] shrink-0'
    style={{ background: "#000" }}
  >
    <path
      d='M14 4 A10 10 0 1 1 4 14'
      stroke='#4fd1c5'
      strokeWidth='1.4'
      strokeDasharray='2 3'
      fill='none'
      strokeLinecap='round'
    />
    <circle cx='14' cy='4' r='2' fill='#4fd1c5' />
  </svg>
);

const Footer = () => {
  return (
    <footer className='border-t border-line py-10'>
      <div className='max-w-[1100px] mx-auto px-6 sm:px-8 flex flex-wrap items-center justify-between gap-6'>
        <div className='flex items-center gap-3'>
          <Mark />
          <p className='font-sans text-xs text-muted leading-relaxed'>
            © {new Date().getFullYear()} Harshit Sharmaa.
            <br />
            Built by me, no template, I promise.
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-2.5'>
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              className='group relative flex items-center justify-center w-11 h-11 rounded-full border border-line text-muted hover:border-accent hover:text-accent transition-colors'
            >
              <Icon className='w-[18px] h-[18px]' />
              {/* Custom tooltip, not the native title attribute — matches
                  the site's own visual language instead of the browser's
                  default styling, and appears reliably rather than after
                  the OS's hover delay. */}
              <span
                role='tooltip'
                className='pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface px-2.5 py-1 font-sans text-[11px] text-paper opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0'
              >
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
