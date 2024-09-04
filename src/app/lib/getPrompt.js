import { sql } from '@vercel/postgres';

export async function getPromptById(id, userId) {
  try {
    const { rows } = await sql`
      SELECT post_id, title, prompt, description, array_to_json(likes) AS likes, array_to_json(dislikes) AS dislikes, views, model_name, author, created_at, edited_at
      FROM prompts
      WHERE post_id = ${id}
    `;
    const prompt = rows[0] || null;

    if (prompt) {
      // Ensure likes and dislikes are parsed as arrays
      prompt.likes = prompt.likes || [];
      prompt.dislikes = prompt.dislikes || [];
      prompt.userLiked = userId ? prompt.likes.includes(userId) : false;
      prompt.userDisliked = userId ? prompt.dislikes.includes(userId) : false;
    }

    console.log('Prompt:', prompt); // Add logging to debug

    return prompt;
  } catch (error) {
    console.error('Failed to fetch prompt:', error);
    return null;
  }
}