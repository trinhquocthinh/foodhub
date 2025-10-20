import Image from 'next/image';
import Link from 'next/link';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
} from 'react-icons/io5';

import './Footer.scss';

const socialLinks = [
  { id: 'twitter', href: '#', Icon: IoLogoTwitter, label: 'Twitter' },
  { id: 'instagram', href: '#', Icon: IoLogoInstagram, label: 'Instagram' },
  { id: 'facebook', href: '#', Icon: IoLogoFacebook, label: 'Facebook' },
  { id: 'youtube', href: '#', Icon: IoLogoYoutube, label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <Link href="#home" aria-label="Foodhub">
          <Image
            src="/images/logo-footer.svg"
            alt="Foodhub"
            className="footer-brand"
            width={130}
            height={42}
          />
        </Link>
        <div className="social-link">
          {socialLinks.map(({ id, href, Icon, label }) => (
            <Link key={id} href={href} aria-label={label}>
              <Icon aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="copyright">
          &copy; Copyright {new Date().getFullYear()} Foodhub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
