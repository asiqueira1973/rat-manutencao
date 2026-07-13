import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RAT Manutenção',
  description: 'Relatório de Atendimento Técnico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100 min-h-screen">{children}</body>
    </html>
  );
}
