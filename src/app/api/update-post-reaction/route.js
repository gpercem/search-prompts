import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import firebaseAdmin from '../../../firebaseAdmin';

export async function POST(req) {
  try {
    const { postId, action } = await req.json();
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error('Error verifying token:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;

    let updateQuery;
    if (action === 'like') {
      updateQuery = sql`
        UPDATE prompts
        SET likes = CASE
          WHEN NOT likes @> ARRAY[${userId}]::TEXT[] THEN array_append(likes, ${userId})
          ELSE array_remove(likes, ${userId})
        END,
        dislikes = array_remove(dislikes, ${userId})
        WHERE post_id = ${postId}
        RETURNING likes, dislikes
      `;
    } else if (action === 'dislike') {
      updateQuery = sql`
        UPDATE prompts
        SET dislikes = CASE
          WHEN NOT dislikes @> ARRAY[${userId}]::TEXT[] THEN array_append(dislikes, ${userId})
          ELSE array_remove(dislikes, ${userId})
        END,
        likes = array_remove(likes, ${userId})
        WHERE post_id = ${postId}
        RETURNING likes, dislikes
      `;
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    const result = await updateQuery;

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating post reaction:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}