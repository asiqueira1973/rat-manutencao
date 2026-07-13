# RAT Manutenção

Formulário de tela única (Next.js App Router + Tailwind CSS) para preenchimento de
Relatório de Atendimento Técnico (RAT), que envia os dados para um webhook do n8n.

## Como rodar

```bash
npm install
cp .env.local.example .env.local
# edite .env.local e preencha N8N_WEBHOOK_URL com a URL do seu webhook n8n
npm run dev
```

Acesse http://localhost:3000.

## Variáveis de ambiente

| Variável          | Descrição                                             |
| ------------------ | ------------------------------------------------------ |
| `N8N_WEBHOOK_URL`  | URL do webhook do n8n que recebe os dados do RAT.       |

O envio é feito pelo servidor (`app/api/rat/route.ts`), então a URL do webhook
nunca fica exposta no navegador.

## Build de produção

```bash
npm run build
npm run start
```
