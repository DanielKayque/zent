'use client';

import { useState } from 'react';
// import InscricaoModal from '@/components/Inscricao/inscricao-modal';
import styles from './evento.module.css';
import InscricaoModal from '@/components/Inscricao/inscricao-modal';

export default function BotaoInscricao({ eventoId }: { eventoId: string }) {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <button 
        className={styles.btnSubscribe} 
        onClick={() => setModalAberto(true)}
      >
        Confirmar Presença
      </button>

      {modalAberto && (
        <InscricaoModal
          eventoId={eventoId} 
          aoFechar={() => setModalAberto(false)} 
        />
      )}
    </>
  );
}