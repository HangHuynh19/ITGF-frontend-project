interface User {
  id?: number;
  name: string;
  role?: 'admin' | 'customer';
  email: string;
  password?: string;
  avatar: File | string;
}

export type { User };
