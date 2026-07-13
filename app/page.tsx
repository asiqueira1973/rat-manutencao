'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Home() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/rat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Falha ao enviar o RAT.');
      }

      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro inesperado ao enviar.'
      );
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">RAT Manutenção</h1>
        <p className="text-slate-500">Relatório de Atendimento Técnico</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg bg-white p-6 shadow-sm"
      >
        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Cliente / Empresa" name="cliente" required />
          <Field label="Data do atendimento" name="data" type="date" required />
          <Field label="Técnico responsável" name="tecnico" required />
          <Field label="Equipamento / Local" name="equipamento" required />

          <div className="flex flex-col gap-1">
            <label htmlFor="tipo" className="text-sm font-medium text-slate-700">
              Tipo de atendimento
            </label>
            <select
              id="tipo"
              name="tipo"
              required
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
            >
              <option value="">Selecione…</option>
              <option value="preventiva">Preventiva</option>
              <option value="corretiva">Corretiva</option>
              <option value="instalacao">Instalação</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="text-sm font-medium text-slate-700">
              Status do atendimento
            </label>
            <select
              id="status"
              name="status"
              required
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
            >
              <option value="">Selecione…</option>
              <option value="concluido">Concluído</option>
              <option value="pendente">Pendente</option>
              <option value="aguardando_peca">Aguardando peça</option>
            </select>
          </div>
        </fieldset>

        <TextArea
          label="Descrição do problema relatado"
          name="problema"
          required
        />
        <TextArea
          label="Serviço executado / Solução aplicada"
          name="solucao"
          required
        />
        <TextArea label="Peças substituídas (opcional)" name="pecas" />
        <TextArea label="Observações" name="observacoes" />

        <Field label="Recebido por (cliente)" name="recebidoPor" required />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-md bg-slate-800 px-4 py-2 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Enviando…' : 'Enviar RAT'}
        </button>

        {status === 'success' && (
          <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
            RAT enviado com sucesso.
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        )}
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={3}
        className="rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
      />
    </div>
  );
}
