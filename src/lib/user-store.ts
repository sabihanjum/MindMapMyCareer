// THIS IS A MOCK DATABASE FOR DEMONSTRATION PURPOSES
// In a real application, you would use a proper database like Firestore, PostgreSQL, etc.

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // In a real app, this would be a hashed password
}

// Use a global variable to persist the store across hot reloads in development.
const globalForStore = globalThis as unknown as {
  users: User[];
  nextId: number;
};

if (!globalForStore.users) {
  globalForStore.users = [];
}
if (!globalForStore.nextId) {
  globalForStore.nextId = 1;
}

const users = globalForStore.users;
let nextId = globalForStore.nextId;


export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
}

export const saveUser = (user: Omit<User, 'id'>): User => {
    const newUser: User = {
        id: (nextId++).toString(),
        ...user,
    };
    users.push(newUser);
    // Update global nextId
    globalForStore.nextId = nextId;
    console.log('Current users in store:', users);
    return newUser;
};
