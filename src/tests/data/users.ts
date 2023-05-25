import { User } from '../../interfaces/User';

const user1: User = {
  id: 1,
  name: 'Jhon',
  email: 'john@mail.com',
  role: 'customer',
  password: 'changeme',
  avatar: 'https://picsum.photos/640/640?r=8005',
};

const user2: User = {
  id: 2,
  name: 'Maria',
  email: 'maria@mail.com',
  role: 'customer',
  password: '12345',
  avatar: 'https://picsum.photos/640/640?r=1935',
};

const user3: User = {
  id: 3,
  name: 'Admin',
  email: 'admin@mail.com',
  role: 'admin',
  password: 'admin123',
  avatar: 'https://picsum.photos/640/640?r=5392',
};

const users = [user1, user2, user3];

export { user1, user2, user3, users };
