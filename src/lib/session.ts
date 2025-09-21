// THIS IS A MOCK SESSION MANAGEMENT FOR DEMONSTRATION PURPOSES
// In a real application, you would use a secure session management library like next-auth or iron-session.

let session: { userId: string | null } = {
  userId: null,
};

export async function login(userId: string) {
  session.userId = userId;
}

export async function logout() {
  session.userId = null;
}

export async function getSession() {
  return session;
}
