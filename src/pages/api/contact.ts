import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const post: APIRoute = async ({ request }) => {
  const form = await request.formData();
  // Honeypot check
  if (form.get('website')) {
    return new Response(JSON.stringify({ success: false, error: 'Spam detected' }), { status: 400 });
  }

  const nombre = form.get('nombre')?.toString() ?? '';
  const telefono = form.get('telefono')?.toString() ?? '';
  const email = form.get('email')?.toString() ?? '';
  const mensaje = form.get('mensaje')?.toString() ?? '';

  // Basic validation
  if (!nombre || !telefono || !email || !mensaje) {
    return new Response(JSON.stringify({ success: false, error: 'Campos incompletos' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Maderas Los Ríos" <${process.env.SMTP_USER}>`,
    to: 'ventas@maderaslosrios.cl',
    subject: 'Nuevo mensaje desde el formulario de contacto',
    text: `Nombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Error enviando email:', err);
    return new Response(JSON.stringify({ success: false, error: 'Error enviando email' }), { status: 500 });
  }
};
