// ============================================================
// JsonLd — Componente centralizado para structured data
// Evita el patrón dangerouslySetInnerHTML disperso en las páginas
// ============================================================

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
