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

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt < now) rateLimitMap.delete(key)
  }
  const entry = rateLimitMap.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

function buildHtml(data: ContactPayload): string {
  const serviciosBadges = data.serviciosSeleccionados.length
    ? data.serviciosSeleccionados
        .map(
          (s) =>
            `<span style="display:inline-block;padding:4px 12px;margin:3px;background:#2D5A27;color:#fff;border-radius:20px;font-size:12px;font-weight:600;">${s}</span>`,
        )
        .join('')
    : '<span style="color:#42493e;font-size:14px;">Sin especificar</span>'

  const cards: Array<{ icon: string; label: string; value: string }> = [
    { icon: '&#128100;', label: 'Nombre', value: data.nombre },
    { icon: '&#128222;', label: 'Tel&eacute;fono', value: data.telefono },
    { icon: '&#128205;', label: 'Direcci&oacute;n', value: data.direccion },
    { icon: '&#128663;', label: 'Veh&iacute;culo', value: data.tipoVehiculo },
    { icon: '&#128197;', label: 'Fecha preferida', value: data.fechaPreferida },
  ]

  const cardsHtml = cards
    .map(
      ({ icon, label, value }) => `
      <div style="background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:10px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <div style="display:flex;align-items:flex-start;gap:14px;">
          <span style="font-size:20px;line-height:1;flex-shrink:0;">${icon}</span>
          <div>
            <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#42493e;text-transform:uppercase;letter-spacing:.06em;">${label}</p>
            <p style="margin:0;font-size:15px;color:#191c1d;font-weight:500;">${value}</p>
          </div>
        </div>
      </div>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#e8ede8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#e8ede8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#154212 0%,#2D5A27 100%);padding:32px 40px;border-radius:12px 12px 0 0;">
            <p style="margin:0 0 4px;font-size:22px;font-weight:800;color:#fff;letter-spacing:.04em;">NM DETAILING</p>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,.65);">Nueva solicitud de servicio &mdash; detailingmarin.cl</p>
          </td>
        </tr>
        <tr>
          <td style="background:#2D5A27;padding:24px 40px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.08em;">Solicitud de reserva</p>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#fff;line-height:1.2;">${data.nombre}</h1>
            <p style="margin:8px 0 0;font-size:16px;color:rgba(255,255,255,.8);font-weight:500;">${data.tipoVehiculo}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafb;padding:32px 40px;">
            ${cardsHtml}
            <div style="background:#fff;border-radius:10px;padding:16px 20px;margin-top:4px;box-shadow:0 1px 4px rgba(0,0,0,.06);">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#42493e;text-transform:uppercase;letter-spacing:.06em;">Servicios solicitados</p>
              <div>${serviciosBadges}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#191c1d;padding:24px 40px;border-radius:0 0 12px 12px;">
            <p style="margin:0 0 6px;font-size:13px;color:rgba(255,255,255,.85);font-weight:600;">Horario de atenci&oacute;n</p>
            <p style="margin:0 0 14px;font-size:13px;color:rgba(255,255,255,.55);">Lunes a S&aacute;bado, 9:00&ndash;19:00</p>
            <p style="margin:0;font-size:11px;color:rgba(255,255,255,.35);">Este mensaje fue enviado desde el formulario web de detailingmarin.cl</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
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
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intentá más tarde.' },
      { status: 429 },
    )
  }

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
