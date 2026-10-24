// ============================================================
// JsonLd — Componente centralizado para structured data
// Evita el patrón dangerouslySetInnerHTML disperso en las páginas
// ============================================================

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  // JSON is embedded in an HTML <script>; escape `<` so CMS content such as
  // `</script>` cannot terminate the element early.
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  )
}
