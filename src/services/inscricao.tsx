import { db } from "@/lib/firebase";
import { doc, runTransaction, collection, serverTimestamp } from "firebase/firestore";

export interface DadosInscricao {
  nome: string;
  email: string;
}

export async function realizarInscricao(eventoId: string, dados: DadosInscricao) {
  // Referências
  const eventoRef = doc(db, "eventos", eventoId);
  const novoParticipanteRef = doc(collection(db, "eventos", eventoId, "participantes"));

  try {
    await runTransaction(db, async (transaction) => {
      // 1. Ler o evento para ver se ainda tem vaga
      const eventoDoc = await transaction.get(eventoRef);
      if (!eventoDoc.exists()) throw "Evento não encontrado!";

      const data = eventoDoc.data();
      const totalAtual = data.totalInscritos || 0;
      const capacidade = data.capacidade || 0;

      // 2. Trava de segurança: Se tiver limite e lotou, barra.
      if (capacidade > 0 && totalAtual >= capacidade) {
        throw "Vagas esgotadas! 😢";
      }

      // 3. Criar o participante na subcoleção
      transaction.set(novoParticipanteRef, {
        nome: dados.nome,
        email: dados.email,
        checkin: false,
        dataInscricao: serverTimestamp()
      });

      // 4. Atualizar o contador no evento principal
      transaction.update(eventoRef, {
        totalInscritos: totalAtual + 1
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Erro na transação:", error);
    return { success: false, error: "Erro ao inscrever. Tente novamente." };
  }
}