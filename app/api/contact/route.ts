// ============================================================
// POST /api/contact
// Recibe el formulario de contacto y envía un correo via SMTP
// Configuración: variables de entorno SMTP_* y CONTACT_EMAIL
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactPayload {
  nombre: string
  telefono: string
  direccion: string
  tipoVehiculo: string
  fechaPreferida: string
  serviciosSeleccionados: string[]
}

function buildHtml(data: ContactPayload): string {
  const servicios = data.serviciosSeleccionados.length
    ? data.serviciosSeleccionados.join(', ')
    : 'Sin especificar'

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafb; border-radius: 12px;">
      <div style="background: linear-gradient(135deg, #154212 0%, #2D5A27 100%); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Nueva solicitud de servicio</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">Detailing Marin — Formulario de contacto</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #42493e; font-size: 13px; font-weight: 600; width: 40%;">Nombre</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #191c1d; font-size: 14px;">${data.nombre}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #42493e; font-size: 13px; font-weight: 600;">Teléfono</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #191c1d; font-size: 14px;">${data.telefono}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #42493e; font-size: 13px; font-weight: 600;">Dirección</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #191c1d; font-size: 14px;">${data.direccion}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #42493e; font-size: 13px; font-weight: 600;">Vehículo</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #191c1d; font-size: 14px;">${data.tipoVehiculo}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #42493e; font-size: 13px; font-weight: 600;">Fecha preferida</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e6e8e9; color: #191c1d; font-size: 14px;">${data.fechaPreferida}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #42493e; font-size: 13px; font-weight: 600;">Servicios</td>
          <td style="padding: 12px 0; color: #191c1d; font-size: 14px;">${servicios}</td>
        </tr>
      </table>
    </div>
  `
}

function buildText(data: ContactPayload): string {
  const servicios = data.serviciosSeleccionados.length
    ? data.serviciosSeleccionados.join(', ')
    : 'Sin especificar'

  return [
    'Nueva solicitud de servicio — Detailing Marin',
    '',
    `Nombre:          ${data.nombre}`,
    `Teléfono:        ${data.telefono}`,
    `Dirección:       ${data.direccion}`,
    `Vehículo:        ${data.tipoVehiculo}`,
    `Fecha preferida: ${data.fechaPreferida}`,
    `Servicios:       ${servicios}`,
  ].join('\n')
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body || !body.nombre || !body.telefono || !body.direccion || !body.tipoVehiculo || !body.fechaPreferida) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
  }

  const data = body as ContactPayload

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Detailing Marin" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
    subject: `Nueva reserva de ${data.nombre} — ${data.tipoVehiculo}`,
    text: buildText(data),
    html: buildHtml(data),
  })

  return NextResponse.json({ ok: true })
}
