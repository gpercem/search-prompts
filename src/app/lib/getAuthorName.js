import firebaseAdmin from '../../firebaseAdmin';

export async function getAuthorName(uid) {
  try {
    const userRecord = await firebaseAdmin.auth().getUser(uid);
    return userRecord.displayName || 'Anonymous';
  } catch (error) {
    console.error('Failed to fetch author name:', error);
    return 'Anonymous';
  }
}