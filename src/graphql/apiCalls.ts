//import axios from 'axios';
import { instance1, instance2 } from '../axiosConfig';
import { Product, ProductInput } from '../interfaces/Product';
import {
  deleteProductQuery,
  getAllCategoriesQuery,
  getAllProductsQuery,
  getAllUsersQuery,
  getProductByIdQuery,
  loginQuery,
  postProductQuery,
  postUserQuery,
  putProductQuery,
} from './queries';
import { User, UpdateUser } from '../interfaces/User';
import { ImageResponse } from '../interfaces/ServerResponses';
import { Category } from '../interfaces/Category';

/* const baseURL = 'https://api.escuelajs.co/graphql';
const restURL = 'https://api.escuelajs.co/api/v1';
const uploadImageURL = 'https://api.escuelajs.co/api/v1/files/upload'; */

const postImage = async (file: File): Promise<ImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const imageUrl = await instance2.post<ImageResponse>(
    '/files/upload',
    formData
  );
  //console.log('Image upload succesfully from postImage APICalls', imageUrl);
  return imageUrl.data;
};

const getAllCategories = async <T>(): Promise<T> => {
  const response = await instance1.post(instance1.getUri(), {
    query: getAllCategoriesQuery,
  });
  //console.log('response from APICalls', response);
  return response.data.data.categories;
};

const getAllProducts = async <T>(): Promise<T> => {
  const response = await instance1.post(instance1.getUri(), {
    query: getAllProductsQuery,
  });
  //console.log('response from APICalls', response);
  return response.data.data.products;
};

const getProductById = async <T>(id: number): Promise<T> => {
  const response = await instance1.post(instance1.getUri(), {
    query: getProductByIdQuery,
    variables: { id: id },
  });
  console.log('response from APICalls', response.data.data.product);
  return response.data.data.product;
};

const postProduct = async <T>(product: ProductInput): Promise<T> => {
  if (product.images[0] instanceof File) {
    const image = await postImage(product.images[0]);
    product.images = [image.location];
  }

  const response = await instance1.post(instance1.getUri(), {
    query: postProductQuery,
    variables: {
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      images: product.images,
    },
  });
  console.log(
    'response from postProduct APICalls',
    response.data.data.addProduct
  );
  return response.data.data.addProduct;
};

const putProduct = async <T>(id: number, product: ProductInput): Promise<T> => {
  if (product.images[0] instanceof File) {
    const image = await postImage(product.images[0]);
    product.images = [image.location];
  }

  const response = await instance1.post(instance1.getUri(), {
    query: putProductQuery,
    variables: {
      id: id,
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images,
    },
  });
  console.log(
    'response from putProduct APICalls',
    response.data.data.updateProduct
  );
  return response.data.data.updateProduct;
};

const deleteProduct = async (id: number): Promise<boolean> => {
  /* const response = await instance2.delete<boolean>(
    `${instance2.getUri()}/products/${id}`
  ); */

  const response = await instance1.post(instance1.getUri(), {
    query: deleteProductQuery,
    variables: {
      id: id,
    },
  });
  console.log('response from deleteProduct APICalls', response.data);
  return response.data;
};

const searchProductsByNameAndCategory = async <T>(
  searchTerm: string,
  categoryName: string
): Promise<T> => {
  const products = await getAllProducts<Product[]>();
  const filteredProducts = products.filter((product) => {
    if (categoryName === 'All categories')
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (product.category as Category).name === categoryName
    );
  });
  console.log('apiCalls', filteredProducts);
  return filteredProducts as unknown as T;
};

const getAllUsers = async <T>(): Promise<T> => {
  const response = await instance1.post(instance1.getUri(), {
    query: getAllUsersQuery,
  });
  //console.log('response from APICalls', response);
  return response.data.data.users;
};

const logingIn = async <T>(email: string, password: string): Promise<T> => {
  const response = await instance1.post(instance1.getUri(), {
    query: loginQuery,
    variables: {
      email: email,
      password: password,
    },
  });

  return response.data.data.login;
};

const getUserByAccessToken = async <T>(accessToken: string): Promise<T> => {
  const response = await instance2.get(`${instance2.getUri()}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('response from APICalls', response.data);
  return response.data;
};

const postUser = async <T>(user: User): Promise<T> => {
  const avatar = user.avatar !== '' ? await postImage(user.avatar as File) : '';

  const response = await instance1.post(instance1.getUri(), {
    query: postUserQuery,
    variables: {
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: avatar ? avatar.location : '',
    },
  });
  //console.log('response from postUser APICalls', response.data.data.addUser);
  return response.data.data.addUser;
};

const putUser = async (id: number, input: UpdateUser) => {
  if (input.hasOwnProperty('avatar')) {
    const avatar = await postImage(input.avatar as File);
    input.avatar = avatar.location;
  }
  const response = await instance2.put<User>(
    `${instance2.getUri()}/users/${id}`,
    input
  );
  console.log('response from putUser APICalls', response);
  return response.data;
};

export {
  postImage,
  getAllCategories,
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
  searchProductsByNameAndCategory,
  getAllUsers,
  logingIn,
  getUserByAccessToken,
  postUser,
  putUser,
};
