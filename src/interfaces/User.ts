interface User {
  id: number;
  name: string;
  role: 'admin' | 'customer';
  email: string;
  password: string;
}

export type { User };
