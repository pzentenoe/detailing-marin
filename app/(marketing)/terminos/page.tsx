import type { Metadata } from 'next'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { contactInfo, WA_MESSAGE } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones del servicio de Detailing Marin. Conocé las condiciones bajo las que prestamos nuestros servicios.',
}

export default function TerminosPage() {
  return (
    <div className="pt-20">
      <SectionWrapper surface="base">
        <div className="max-w-3xl mx-auto py-8">
          <header className="flex flex-col gap-4 mb-12">
            <span className="inline-block self-start px-3 py-1 rounded-full bg-secondary-container text-primary font-bold text-xs tracking-widest uppercase">
              Legal
            </span>
            <h1 className="text-display-md text-(--color-on-surface) leading-tight">
              Términos y Condiciones
            </h1>
            <p className="text-on-surface-variant text-sm">
              Última actualización: abril 2026
            </p>
          </header>

          <div className="flex flex-col gap-10 text-body-lg text-on-surface-variant leading-relaxed">

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">1. Aceptación de los términos</h2>
              <p>
                Al utilizar el sitio web de Detailing Marin y solicitar cualquiera de nuestros servicios, aceptás los presentes términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte, te pedimos que no utilices nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">2. Descripción del servicio</h2>
              <p>
                Detailing Marin ofrece servicios de detallado y limpieza automotriz a domicilio en la zona de Maipú y alrededores. Los servicios incluyen lavado ecológico, pulido, tratamiento de focos y limpieza de motor, entre otros descritos en nuestro sitio.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">3. Reservas y confirmaciones</h2>
              <p>
                Las reservas realizadas a través del formulario web o WhatsApp son solicitudes de servicio sujetas a disponibilidad. Una reserva se considera confirmada únicamente cuando un representante de Detailing Marin la valida de forma expresa por escrito (WhatsApp o correo electrónico).
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">4. Cancelaciones y cambios</h2>
              <p>
                Si necesitás cancelar o reprogramar un servicio, te pedimos notificarnos con al menos 24 horas de anticipación. Las cancelaciones tardías pueden estar sujetas a un cargo del 20% del valor del servicio para cubrir los costos de desplazamiento.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">5. Responsabilidades del cliente</h2>
              <p>
                El cliente es responsable de:
              </p>
              <ul className="list-disc list-inside mt-3 flex flex-col gap-2 pl-2">
                <li>Proporcionar acceso al vehículo en la fecha y lugar acordados.</li>
                <li>Informar previamente sobre daños preexistentes en la pintura u otras superficies.</li>
                <li>Retirar objetos de valor del interior del vehículo antes del servicio.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">6. Limitación de responsabilidad</h2>
              <p>
                Detailing Marin no se hace responsable por daños preexistentes no declarados ni por condiciones climáticas que impidan la correcta ejecución del servicio. En caso de daño causado directamente por nuestra operación, nos comprometemos a evaluar y resolver el incidente de forma directa con el cliente.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">7. Precios y pagos</h2>
              <p>
                Los precios publicados en el sitio son referenciales en pesos chilenos (CLP) y pueden variar según el estado del vehículo, el tamaño y los servicios adicionales solicitados. El precio final se confirma antes del inicio del servicio. El pago se realiza al finalizar el trabajo.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">8. Modificaciones</h2>
              <p>
                Detailing Marin se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones serán publicadas en esta página y entrarán en vigor de forma inmediata.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-(--color-on-surface) text-lg mb-3">9. Contacto</h2>
              <p>
                Para consultas sobre estos términos, podés contactarnos en{' '}
                <a href="mailto:marin.mac.len@gmail.com" className="text-primary hover:underline">
                  marin.mac.len@gmail.com
                </a>{' '}
                o por WhatsApp al{' '}
                <a href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  +56 9 5445 1422
                </a>.
              </p>
            </section>

          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
