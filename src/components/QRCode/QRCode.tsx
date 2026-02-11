'use client';

import { QRCodeCanvas } from 'qrcode.react';
import styles from './QRCode.module.css';

interface Props {
  url: string; // A URL pública do evento (zent.com/evento/123...)
  nomeEvento: string;
}

export const QRCodeManager = ({ url, nomeEvento }: Props) => {

  // Função mágica para baixar a imagem
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      
      // Cria um link falso apenas para forçar o download
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode-${nomeEvento.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copiado para a área de transferência!");
  };

  return (
    <div className={styles.card}>
      <div className=''>
        <h3 className={styles.title}>Divulgação</h3>
        {/* <p className={styles.description}>Use para convidar participantes</p> */}
      </div>

      <div className={styles.qrWrapper}>
        <QRCodeCanvas
          id="qr-code-canvas"
          value={url}
          size={180} // Tamanho em pixels
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"Q"} // Nível de correção de erro (Q é alto, permite logo no meio se quiser)
          includeMargin={true}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={downloadQRCode} className={styles.btnAction} title="Baixar Imagem PNG">
          ⬇ Baixar PNG
        </button>
        <button onClick={copyLink} className={styles.btnAction} title="Copiar Link">
          🔗 Copiar Link
        </button>
      </div>
    </div>
  );
};