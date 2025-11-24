import { Resend } from 'resend';

let connectionSettings: any;
let resendClient: Resend | null = null;

async function getResendClient() {
  if (resendClient) {
    return { client: resendClient, fromEmail: connectionSettings.settings.from_email };
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken || !hostname) {
    throw new Error('Resend connection not available');
  }

  try {
    connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    if (!connectionSettings || !connectionSettings.settings.api_key) {
      throw new Error('Resend not connected');
    }

    resendClient = new Resend(connectionSettings.settings.api_key);
    return { client: resendClient, fromEmail: connectionSettings.settings.from_email };
  } catch (error) {
    console.error('Failed to get Resend client:', error);
    throw new Error('Email service unavailable');
  }
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    const { client, fromEmail } = await getResendClient();

    const emailHtml = `
      <h2>${data.subject}</h2>
      <p><strong>De:</strong> ${data.name} (${data.email})</p>
      <hr />
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `;

    // Send to admin
    const adminResponse = await client.emails.send({
      from: fromEmail,
      to: 'M1n3bas3@gmail.com',
      subject: `[Contato do Site] ${data.subject}`,
      html: emailHtml,
    });

    // Send confirmation to user
    await client.emails.send({
      from: fromEmail,
      to: data.email,
      subject: `Recebemos sua mensagem - ${data.subject}`,
      html: `
        <h2>Obrigado por entrar em contato!</h2>
        <p>Olá ${data.name},</p>
        <p>Recebemos sua mensagem com sucesso. Responderemos em breve.</p>
        <hr />
        <p><strong>Sua mensagem:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return adminResponse;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendSponsorshipEmail(data: ContactEmailData) {
  try {
    const { client, fromEmail } = await getResendClient();

    const emailHtml = `
      <h2>Novo Interesse em Patrocínio</h2>
      <p><strong>Empresa:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Assunto:</strong> ${data.subject}</p>
      <hr />
      <p><strong>Proposta:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `;

    // Send to admin
    const adminResponse = await client.emails.send({
      from: fromEmail,
      to: 'M1n3bas3@gmail.com',
      subject: `[Patrocínio] ${data.subject} - ${data.name}`,
      html: emailHtml,
    });

    // Send confirmation to sponsor
    await client.emails.send({
      from: fromEmail,
      to: data.email,
      subject: `Proposta recebida - ${data.subject}`,
      html: `
        <h2>Obrigado pelo interesse!</h2>
        <p>Olá ${data.name},</p>
        <p>Recebemos sua proposta de patrocínio com sucesso. Farei uma análise e responderei em breve.</p>
        <hr />
        <p><strong>Sua proposta:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return adminResponse;
  } catch (error) {
    console.error('Failed to send sponsorship email:', error);
    throw new Error('Failed to send sponsorship email');
  }
}
