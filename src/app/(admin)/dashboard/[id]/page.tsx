'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './id.module.css'; // Importando o CSS Module
import { QRCodeManager } from '@/components/QRCode/QRCode';

interface Evento {
  id: string;
  nome: string;
  local: string;
  data: string;
  descricao: string;
  bannerUrl?: string;
  totalInscritos: number;
}

export default function EventoDetalhesPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  if (id === 'novo') return null;

  const publicUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/eventos/${id}`
      : `/eventos/${id}`;

  // ... (Sua lógica do useEffect permanece idêntica) ...
  useEffect(() => {
    async function fetchDetalhes() {
      if (!user || !id) return;
      try {
        const docRef = doc(db, 'eventos', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          let dataFormatada = 'A definir';
          if (data.data?.seconds) {
            dataFormatada = new Date(
              data.data.seconds * 1000,
            ).toLocaleDateString('pt-BR');
          }
          setEvento({
            id: docSnap.id,
            nome: data.nome,
            local: data.local,
            descricao: data.descricao || 'Sem descrição informada.',
            bannerUrl: data.bannerUrl,
            totalInscritos: data.totalInscritos || 0,
            data: dataFormatada,
          });
        }
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetalhes();
  }, [user, id]);

  if (loading) return <div className={styles.container}>Carregando...</div>;
  if (!evento)
    return <div className={styles.container}>Evento não encontrado.</div>;

  return (
    <div className={styles.container}>
      {/* 1. HERO SECTION */}
      <div className={styles.hero}>
        {evento.bannerUrl ? (
          <img
            src={evento.bannerUrl}
            alt="Banner"
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.heroGradient} />
        )}
        <div className={styles.heroOverlay}></div>

        <Link href="/dashboard" className={styles.backButton}>
          ← Voltar
        </Link>
      </div>

      {/* 2. CARD FLUTUANTE */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerCard}>
          <div className={styles.titleGroup}>
            <span className={styles.badge}>EM ANDAMENTO</span>
            <h1>{evento.nome}</h1>
            <div className={styles.metaInfo}>
              <p>📅 {evento.data}</p>
              <p>📍 {evento.local}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.btnPrimary}>📷 Check-in</button>
            <button className={styles.btnSecondary}>⚙️</button>
          </div>
        </div>
      </div>

      {/* 3. GRID DE CONTEÚDO */}
      <div className={styles.grid}>
        {/* Esquerda: Descrição */}
        <section>
          <h3 className={styles.sectionTitle}>Sobre o Evento</h3>
          <div className={styles.descriptionBox}>{evento.descricao}</div>
        </section>

        {/* Direita: Métricas e Links */}
        <aside>
          <div className={styles.cardMetric}>
            <div style={{ marginTop: '1.5rem' }}>
              {evento && (
                <QRCodeManager url={publicUrl} nomeEvento={evento.nome} />
              )}
            </div>
            <h4>Total de Inscritos</h4>
            <div className={styles.metricValue}>{evento.totalInscritos}</div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <p
              style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}
            >
              Crescimento de 12% essa semana
            </p>
          </div>

          <div className={styles.cardLink}>
            <h4>Link Público</h4>
            <div className={styles.inputGroup}>
              <input
                type="text"
                readOnly
                value={`zent.com/evento/${evento.id}`}
                className={styles.inputLink}
              />
              <button
                className={styles.btnSecondary}
                style={{ padding: '0.5rem' }}
              >
                📋
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
