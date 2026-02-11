'use client';

import Link from 'next/link';
import styles from './Dashboard.module.css';
// import { useRouter } from 'next/navigation';
import { LogoutButton } from '@/components/logout-button';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Interface temporária para os dados
interface Evento {
  id: string;
  ativo: boolean;
  nome: string;
  data: string;
  descricao: string;
  local: string;
  organizadorId?: string;
  totalInscritos: number;
}

export default function DashboardPage() {
  const { user, loading } = useAuth(); // Pega o usuário do contexto
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loadingEventos, setLoadingEventos] = useState(true);

  useEffect(() => {
    // Só busca se o usuário já estiver carregado e existir
    async function buscarEventos() {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'eventos'),
          where('organizadorId', '==', user.uid), // <--- Filtra pelo ID do usuário logado
        );

        const querySnapshot = await getDocs(q);

        const listaEventos = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Tratamento de segurança para data e inscritos
          let dataFormatada = 'Data indefinida';
          if (data.data && data.data.toDate) {
            dataFormatada = data.data.toDate().toLocaleDateString('pt-BR');
          }

          return {
            id: doc.id,
            nome: data.nome,
            local: data.local,
            totalInscritos: data.totalInscritos || 0, // Ajustado para o nome do seu campo no banco
            data: dataFormatada,
            ativo: data.ativo,
            descricao: data.descricao,
          };
        });

        setEventos(listaEventos);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      } finally {
        setLoadingEventos(false);
      }
    }

    if (!loading && user) {
      buscarEventos();
    }
  }, [user, loading]);

  // Renderização
  if (loading || loadingEventos) {
    return (
      <div className="p-8 text-center text-white">
        Carregando seus eventos...
      </div>
    );
  }

  if (!user) {
    return null; // O PrivateRoute já vai redirecionar, mas por segurança retornamos null
  }
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Seus Eventos</h1>
          <p>Gerencie suas inscrições e check-ins em tempo real.</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.createButton}>+ Novo Evento</button>

          <LogoutButton />
        </div>
      </header>

      <section className={styles.grid}>
        {eventos.map((evento) => (
          <Link
            key={evento.id}
            href={`/dashboard/${evento.id}`}
            className={styles.eventCard}
          >
            <h3>{evento.nome}</h3>
            <p>Data: {evento.data}</p>
            <div className={styles.badge}>
              {evento.totalInscritos} participantes
            </div>
          </Link>
        ))}

        {eventos.length === 0 && (
          <p className={styles.textMuted}>
            Você ainda não possui eventos criados.
          </p>
        )}
      </section>
    </main>
  );
}
