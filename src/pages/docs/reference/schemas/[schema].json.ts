import type { APIRoute } from 'astro';

export function getStaticPaths() {
  const schemas = import.meta.glob('../../../../content/docs/docs/reference/schemas/*.json', {
    eager: true,
    query: '?raw',
    import: 'default',
  });

  return Object.entries(schemas).map(([path, schema]) => ({
    params: { schema: path.split('/').at(-1)!.replace(/\.json$/, '') },
    props: { schema },
  }));
}

export const GET: APIRoute = ({ props }) => new Response(props.schema, {
  headers: { 'Content-Type': 'application/schema+json' },
});
