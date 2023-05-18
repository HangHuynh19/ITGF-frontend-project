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

const postUserQuery = `
  mutation (
    $name: String!, 
    $email: String!, 
    $password: String!, 
    $avatar: String!
  ){
    addUser(
      data: {
        name: $name
        email: $email
        password: $password
        avatar: $avatar
      }
    ) {
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
  postUserQuery,
};
