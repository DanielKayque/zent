'use client';

import Link from 'next/link';
import { QrCode, Menu } from 'lucide-react';
import { useState } from 'react';
import styles from './Navbar.module.css';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo} aria-label="Zent - Início">
            <QrCode className={styles.logoIcon} size={24} aria-hidden />
            Zent
          </Link>
          <ul className={styles.links}>
            <li className={styles.link}>
              <Link href="#funcionalidades">Funcionalidades</Link>
            </li>
            <li className={styles.link}>
              <Link href="#precos">Preços</Link>
            </li>
            <li className={styles.link}>
              <Link href="#sobre">Sobre</Link>
            </li>
          </ul>
          <Link href="/login" className={styles.cta}>
            Fazer Login
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="#funcionalidades" onClick={() => setMobileOpen(false)}>
            Funcionalidades
          </Link>
          <Link href="#precos" onClick={() => setMobileOpen(false)}>
            Preços
          </Link>
          <Link href="#sobre" onClick={() => setMobileOpen(false)}>
            Sobre
          </Link>
          <Link
            href="#cta"
            className={styles.mobileCta}
            onClick={() => setMobileOpen(false)}
          >
            Começar Agora
          </Link>
        </div>
      )}
    </>
  );
}
