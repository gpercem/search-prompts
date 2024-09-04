import { sql } from '@vercel/postgres';

export async function getSuggestions() {
  try {
    const topLiked = await sql`
      SELECT post_id, title, description, likes, dislikes, views
      FROM prompts
      ORDER BY array_length(likes, 1) DESC NULLS LAST
      LIMIT 4
    `;

    const mostRecent = await sql`
      SELECT post_id, title, description, likes, dislikes, views
      FROM prompts
      ORDER BY created_at DESC
      LIMIT 4
    `;

    console.log("Got the suggestions and recent prompts");
    console.log("Top liked post's likes:", topLiked.rows[0].likes);
    return {
      topLiked: topLiked.rows,
      mostRecent: mostRecent.rows
    };
  } catch (error) {
    console.error('Failed to fetch suggestions and recent prompts:', error);
    return { topLiked: [], mostRecent: [] };
  }
}