const getAllCategoriesQuery = `
  query {
    categories {
      id
      name
      image
    }
  }
`;

const getAllProductsQuery = `
  query {
    products {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

const getProductByIdQuery = `
  query($id: ID!){
    product(id: $id) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

const getAllUsersQuery = `
  query {
    users {
      id
      name
      email
      role
      password
    }
  }
`;

const loginQuery = `
  mutation ($email:String!, $password: String!){
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

const getUserByAccessTokenQuery = `
  query {
    myProfile {
      id
      name
      avatar
    }
  }
`;

export {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getProductByIdQuery,
  getAllUsersQuery,
  loginQuery,
  getUserByAccessTokenQuery,
};
