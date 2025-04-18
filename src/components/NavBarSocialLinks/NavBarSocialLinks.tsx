import * as React from 'react';
import { FaTelegram, FaXTwitter, FaGithub, FaGlobe } from 'react-icons/fa6';
import './styles.css';

export default function NavBarSocialLinks(...props: any): JSX.Element {
  return (
    <div className="navbar-social-links">
      <a href="https://noders.team" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="noders.team" title='Noders.team'>
        <FaGlobe />
      </a>
      <a href="https://github.com/noders-team" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="github" title='Github'>
        <FaGithub />
      </a>
      <a href="https://x.com/NODERS_TEAM" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="x.com" title='X.com'>
        <FaXTwitter />
      </a>
      <a href="https://t.me/nodersteam" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="telegram" title='Telegram'>
        <FaTelegram />
      </a>
    </div>
  );
}
