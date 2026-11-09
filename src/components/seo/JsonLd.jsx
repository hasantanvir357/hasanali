/**
 * Renders a JSON-LD block for search engines. Safe on both server and
 * client — the markup is a plain <script> with escaped JSON.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
