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
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Falha ao iniciar o processamento.');
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

  if (status === 'success') {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <h1 className="mb-2 text-xl font-bold text-slate-800">
            Processamento iniciado
          </h1>
          <p className="mb-6 text-slate-600">
            Você receberá um e-mail de resumo em breve.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="rounded-md bg-slate-800 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
          >
            Enviar outra pasta
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">RAT Manutenção</h1>
        <p className="text-slate-500">
          Envie a pasta de fotos do RAT para processamento automático
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg bg-white p-6 shadow-sm"
      >
        <Field
          label="Pasta do Drive de origem"
          name="pastaDrive"
          placeholder="Link ou ID da pasta do Google Drive"
          required
        />
        <Field label="Cliente / Planta" name="clientePlanta" required />
        <Field label="Empresa prestadora" name="empresaPrestadora" required />
        <Field
          label="E-mail de destino"
          name="emailDestino"
          type="email"
          required
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-md bg-slate-800 px-4 py-2 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Enviando…' : 'Enviar para processamento'}
        </button>

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
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        required={required}
        className="rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:border-slate-500 focus:outline-none"
      />
    </div>
  );
}
