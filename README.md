# RAT Manutenção

App de submissão de tela única (Next.js App Router + Tailwind CSS). O técnico já
preencheu o RAT em papel e tirou fotos, que ficam numa pasta do Google Drive. Este
app não cadastra nem exibe dados de manutenção — ele só dispara, via webhook do
n8n, o pipeline (n8n + Mistral) que lê as fotos da pasta indicada e envia um
e-mail de resumo ao final.

Campos do formulário: pasta do Drive de origem, cliente/planta, empresa
prestadora e e-mail de destino do resumo. Sem autenticação.

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
| `N8N_WEBHOOK_URL`  | URL do webhook do n8n que dispara o processamento.      |

O envio é feito pelo servidor (`app/api/submit/route.ts`), então a URL do webhook
nunca fica exposta no navegador.

## Build de produção

```bash
npm run build
npm run start
```
