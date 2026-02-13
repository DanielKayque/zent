import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import styles from './evento.module.css';
import BotaoInscricao from './botao-inscricao';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Esta é uma Server Component (Melhor para SEO e Performance)
export default async function EventoPublicoPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Busca o evento no servidor (sem precisar de login)
  const docRef = doc(db, 'eventos', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return notFound();
  }

  const evento = docSnap.data();
  
  // Formatação de data simples
  const dataFormatada = evento.data?.seconds 
    ? new Date(evento.data.seconds * 1000).toLocaleDateString('pt-BR', {
        weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
      })
    : 'Data a confirmar';

  return (
    <div className={styles.container}>
      {/* Banner / Hero */}
      <div className={styles.hero}>
        {evento.bannerUrl && (
          <img src={evento.bannerUrl} alt={evento.nome} className={styles.heroImage} />
        )}
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <span className={styles.tag}>Evento Oficial</span>
          <h1 className={styles.title}>{evento.nome}</h1>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📅</span>
              <p>{dataFormatada}</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📍</span>
              <p>{evento.local}</p>
            </div>
          </div>

          <div className={styles.description}>
            <h3>Sobre</h3>
            <p>{evento.descricao}</p>
          </div>

          {/* Área de Inscrição */}
          <div className={styles.actionArea}>
            <p className={styles.price}>Entrada Gratuita</p>
            <BotaoInscricao eventoId={id}/>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>Organizado na plataforma <strong>Zent</strong></p>
        </footer>
      </div>
    </div>
  );
}