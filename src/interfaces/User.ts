interface User {
  id?: number;
  name: string;
  role?: 'admin' | 'customer';
  email: string;
  password?: string;
  avatar: File | string;
}

type UpdateUser = Partial<User>;

export type { User, UpdateUser };
