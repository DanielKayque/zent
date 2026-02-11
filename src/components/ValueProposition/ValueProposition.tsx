import { LayoutDashboard, Link2, Zap } from "lucide-react";
import styles from "./ValueProposition.module.css";

const items = [
  {
    icon: LayoutDashboard,
    title: "Painel Intuitivo",
    text: "Crie eventos em menos de 5 minutos. Interface limpa e direta para você configurar data, local e ingressos sem complicação.",
  },
  {
    icon: Link2,
    title: "Página de Vendas",
    text: "Links personalizados para seus participantes. Cada evento ganha uma página de inscrição e pagamento pronta para divulgar.",
  },
  {
    icon: Zap,
    title: "Check-in Relâmpago",
    text: "Adeus filas. Use o app para ler QR Codes na entrada e liberar os participantes em segundos.",
  },
];

export function ValueProposition() {
  return (
    <section className={styles.section} id="funcionalidades">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Tudo que você precisa em um só lugar</h2>
        <p className={styles.subtitle}>
          Ferramentas pensadas para quem quer organizar eventos sem perder tempo.
        </p>
        <div className={styles.grid}>
          {items.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.iconWrap}>
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
