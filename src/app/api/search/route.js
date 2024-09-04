import { sql } from '@vercel/postgres';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { rows } = await sql`
      SELECT * FROM prompts 
      WHERE title ILIKE ${`%${query}%`} OR description ILIKE ${`%${query}%`}
      ORDER BY likes DESC
      LIMIT 20
    `;
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to search prompts:', error);
    return new Response(JSON.stringify({ error: 'Failed to search prompts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}