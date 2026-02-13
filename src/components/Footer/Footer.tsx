import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <p className={styles.copyright}>
          © {currentYear} Zent. Todos os direitos reservados.
        </p>
        <ul className={styles.social}>
          <li>
            <Link
              href="https://github.com/DanielKayque/"
              target="_blank"
              aria-label="GitHub"
            >
              <Github size={18} />
            </Link>
          </li>
          <li>
            {/* <Link href="#" aria-label="Twitter">
              <Twitter size={18} />
            </Link> */}
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/daniel-kayque"
              aria-label="LinkedIn"
              target="_blank"
            >
              <Linkedin size={18} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
