import Link from "next/link";
import { ScanLine } from "lucide-react";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} id="cta">
      <div className={styles.glow} aria-hidden />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.badge}>Eventos simples • Check-in via QR Code</p>
          <h1 className={styles.headline}>
            Gerencie seus eventos sem dor de cabeça.
          </h1>
          <p className={styles.subheadline}>
            A plataforma mais simples para criar eventos, vender ingressos e fazer check-in via QR Code. Foco total na experiência do seu participante.
          </p>
          <div className={styles.ctas}>
            <Link href="/cadastro" className={styles.ctaPrimary}>
              Criar Evento Grátis
            </Link>
            <Link href="#funcionalidades" className={styles.ctaSecondary}>
              Ver Demonstração
            </Link>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.mockupWrapper}>
            <div className={styles.mockupCard}>
              <div className={styles.qrPlaceholder} aria-hidden>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={styles.qrCell} />
                ))}
              </div>
              <p className={styles.mockupLabel}>QR Code do evento</p>
            </div>
            <div className={styles.phone} aria-hidden>
              <div className={styles.phoneScreen}>
                <ScanLine size={36} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
