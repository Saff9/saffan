// Health check endpoint.
//
// Previously this returned a "Hello, world!" placeholder that nothing on the
// client ever called. Replaced with a minimal health check so the route is
// useful for uptime monitors / deploy smoke tests (GET /api → 200 `{ ok }`)
// without pulling in any dependencies.
export async function GET() {
  return Response.json({ status: 'ok' });
}
