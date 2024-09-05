import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import firebaseAdmin from '../../../firebaseAdmin';

export async function POST(req) {
  try {
    const { postId, action } = await req.json();
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      console.log('No token provided');
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
    console.log('Authenticated user:', userId);

    let updateQuery;
    if (action === 'like') {
      updateQuery = sql`
        UPDATE prompts
        SET likes = CASE
          WHEN NOT likes @> ARRAY[${userId}]::TEXT[] THEN array_append(likes, ${userId})
          ELSE array_remove(likes, ${userId})
        END,
        dislikes = array_remove(dislikes, ${userId}),
        edited_at = NOW()
        WHERE post_id = ${postId} AND NOW() = NOW()  -- Add NOW() = NOW() to prevent query caching
        RETURNING likes, dislikes
      `;
    } else if (action === 'dislike') {
      updateQuery = sql`
        UPDATE prompts
        SET dislikes = CASE
          WHEN NOT dislikes @> ARRAY[${userId}]::TEXT[] THEN array_append(dislikes, ${userId})
          ELSE array_remove(dislikes, ${userId})
        END,
        likes = array_remove(likes, ${userId}),
        edited_at = NOW()
        WHERE post_id = ${postId} AND NOW() = NOW()  -- Add NOW() = NOW() to prevent query caching
        RETURNING likes, dislikes
      `;
    } else {
      console.log('Invalid action:', action);
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    const result = await updateQuery;

    if (result.rows.length === 0) {
      console.log('Post not found:', postId);
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    console.log('Updated post reaction:', result.rows[0]);

    // Disable caching for the response
    const response = NextResponse.json(result.rows[0]);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    return response;
  } catch (error) {
    console.error('Error updating post reaction:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
