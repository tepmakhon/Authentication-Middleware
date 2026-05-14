// Mock user database (replace with real DB later)
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'Admin' | 'Administrator' | 'Staff';
}

// In production, never store plain passwords! Use bcrypt
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'Admin'
  },
  {
    id: '2',
    username: 'admin2',
    password: 'admin123',
    role: 'Administrator'
  },
  {
    id: '3',
    username: 'staff',
    password: 'staff123',
    role: 'Staff'
  }
];