import type { Metadata } from 'next'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Detailing Marin. Cómo recopilamos, usamos y protegemos tu información personal.',
}

export default function PrivacidadPage() {
  return (
    <div className="pt-20">
      <SectionWrapper surface="base">
        <div className="max-w-3xl mx-auto py-8">
          <header className="flex flex-col gap-4 mb-12">
            <span className="inline-block self-start px-3 py-1 rounded-full bg-secondary-container text-primary font-bold text-xs tracking-widest uppercase">
              Legal
            </span>
            <h1 className="text-display-md text-(--color-on-surface) leading-tight">
              Política de Privacidad
            </h1>
            <p className="text-on-surface-variant text-sm">
              Última actualización: abril 2026
            </p>
          </header>

          <div className="flex flex-col gap-10 text-body-lg text-on-surface-variant leading-relaxed">

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">1. Información que recopilamos</h2>
              <p>
                Cuando completás el formulario de contacto o reserva en nuestro sitio, recopilamos la siguiente información: nombre completo, número de teléfono, dirección de servicio, tipo de vehículo, fecha preferida y servicios seleccionados. Esta información es proporcionada de forma voluntaria por el usuario.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">2. Uso de la información</h2>
              <p>
                La información recopilada se utiliza exclusivamente para:
              </p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2 pl-2">
                <li>Coordinar y confirmar el servicio solicitado.</li>
                <li>Contactarte para verificar disponibilidad y detalles del servicio.</li>
                <li>Enviarte comunicaciones relacionadas con tu reserva.</li>
              </ul>
              <p className="mt-3">
                No vendemos, alquilamos ni compartimos tu información personal con terceros con fines comerciales.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">3. Almacenamiento y seguridad</h2>
              <p>
                Los datos del formulario se transmiten de forma segura a través de correo electrónico cifrado (SMTP con TLS). No almacenamos información personal en bases de datos propias más allá del correo de confirmación recibido.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">4. WhatsApp</h2>
              <p>
                Nuestro sitio incluye un enlace directo a WhatsApp. Al hacer clic en él, serás redirigido a la aplicación de WhatsApp, cuyo uso está sujeto a la{' '}
                <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Política de Privacidad de WhatsApp
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">5. Tus derechos</h2>
              <p>
                Tenés derecho a solicitar el acceso, rectificación o eliminación de tus datos personales en cualquier momento. Para hacerlo, contactanos directamente a{' '}
                <a href="mailto:marin.mac.len@gmail.com" className="text-primary hover:underline">
                  marin.mac.len@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">6. Cambios en esta política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en esta página.
              </p>
            </section>

          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
