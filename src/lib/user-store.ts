// THIS IS A MOCK DATABASE FOR DEMONSTRATION PURPOSES
// In a real application, you would use a proper database like Firestore, PostgreSQL, etc.

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // In a real app, this would be a hashed password
}

const users: User[] = [];

let nextId = 1;

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
    console.log('Current users in store:', users);
    return newUser;
};
