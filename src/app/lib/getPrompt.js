import { sql } from '@vercel/postgres';

export async function getPromptById(id) {
  try {
    const currentTime = new Date().toISOString();
    console.log('Fetching prompt with id:', id);

    const result = await sql`
      SELECT post_id, title, prompt, description, 
             likes, dislikes, 
             views, model_name, author, created_at, edited_at
      FROM prompts
      WHERE post_id = ${id}
      AND ${currentTime} = ${currentTime} -- dynamic param to bypass cache
      LIMIT 1
    `;

    console.log('Full query result:', JSON.stringify(result, null, 2));
    const prompt = result.rows[0] || null;
    console.log('Raw prompt data:', JSON.stringify(prompt, null, 2));

    return prompt;
  } catch (error) {
    console.error('Failed to fetch prompt:', error);
    return null;
  }
}
