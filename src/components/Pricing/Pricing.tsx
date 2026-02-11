import Link from "next/link";
import styles from "./Pricing.module.css";

export function Pricing() {
  return (
    <section className={styles.section} id="precos">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Preços simples</h2>
        <p className={styles.subtitle}>
          Comece grátis. Pague apenas quando precisar de mais.
        </p>
        <div className={styles.card}>
          <span className={styles.badge}>Plano gratuito</span>
          <h3 className={styles.planName}>Para começar</h3>
          <p className={styles.price}>
            R$ 0 <span>/ mês</span>
          </p>
          <ul className={styles.features}>
            <li>Até 1 evento por mês</li>
            <li>Página de inscrição inclusa</li>
            <li>Check-in via QR Code</li>
            <li>Suporte por e-mail</li>
          </ul>
          <Link href="#cta" className={styles.cta}>
            Começar grátis
          </Link>
        </div>
      </div>
    </section>
  );
}
