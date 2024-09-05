import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import firebaseAdmin from '../../../firebaseAdmin';
import crypto from 'crypto';

async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verifyUrl, { method: 'POST' });
  const data = await response.json();

  return data.success && data.score > 0.5;
}

async function generateUniquePostId() {
  while (true) {
    const postId = crypto.randomBytes(3).toString('hex');
    const result = await sql`SELECT post_id FROM prompts WHERE post_id = ${postId}`;
    if (result.rows.length === 0) {
      return postId;
    }
  }
}

export async function POST(req) {

  try {t

    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }

    const { title, prompt, description, modelName, recaptchaToken } = body;

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // Verify Firebase token and create prompt
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const currentTime = new Date().toISOString();
    const postId = await generateUniquePostId();

    const result = await sql`
      INSERT INTO prompts (
        post_id,
        title,
        prompt,
        description,
        likes,
        dislikes,
        views,
        model_name,
        author,
        created_at,
        edited_at
      )
      VALUES (
        ${postId},
        ${title},
        ${prompt},
        ${description},
        ${[]},
        ${[]},
        ${0},
        ${modelName},
        ${uid},
        ${currentTime},
        ${currentTime}
      )
      RETURNING post_id;
    `;

    return NextResponse.json({ message: 'Prompt created successfully', postId: postId }, { status: 201 });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json({ message: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}