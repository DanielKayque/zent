import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "1",
    title: "Criar",
    text: "Cadastre seu evento no painel: nome, data, local e tipos de ingresso. Em poucos minutos está tudo pronto.",
  },
  {
    number: "2",
    title: "Divulgar",
    text: "Compartilhe o link da página de vendas nas redes, e-mail ou onde preferir. Seus participantes se inscrevem online.",
  },
  {
    number: "3",
    title: "Realizar",
    text: "No dia do evento, use o check-in via QR Code no app. Rápido, sem filas e sem stress.",
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section} id="sobre">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Como funciona</h2>
        <p className={styles.subtitle}>
          Três passos simples do planejamento à realização do seu evento.
        </p>
        <div className={styles.steps}>
          <div className={styles.connector} aria-hidden />
          {steps.map((step) => (
            <article key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
