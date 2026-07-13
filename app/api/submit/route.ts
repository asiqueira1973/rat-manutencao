import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'N8N_WEBHOOK_URL não configurada no servidor.' },
      { status: 500 }
    );
  }

  const body = await request.json();

  const webhookPayload = {
    drive_folder_origem: body.pastaDrive,
    cliente_planta: body.clientePlanta,
    empresa_prestadora: body.empresaPrestadora,
    email_destino: body.emailDestino,
  };

  const webhookResponse = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(webhookPayload),
  });

  if (!webhookResponse.ok) {
    return NextResponse.json(
      { error: `Webhook respondeu com status ${webhookResponse.status}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
