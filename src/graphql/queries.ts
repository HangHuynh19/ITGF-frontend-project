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

const postProductQuery = `
  mutation($title: String!, $price: Float!, $description: String!, $categoryId: Float!, $images: [String!]!) {
    addProduct(
      data: {
        title: $title
        price: $price
        description: $description
        categoryId: $categoryId
        images: $images
      }
    ) {
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

const putProductQuery = `
  mutation($id: ID!, $title: String!, $price: Float!, $description: String!, $images: [String!]!) {
    updateProduct(id: $id, changes: { 
      title: $title,  price: $price
      description: $description
      images: $images 
    }) {
      title
      price
      images
      description
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
      email
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
  postProductQuery,
  putProductQuery,
  getAllUsersQuery,
  loginQuery,
  getUserByAccessTokenQuery,
  postUserQuery,
};
