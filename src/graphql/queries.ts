const getAllCategoriesQuery = `
  query getAllCategoriesQuery {
    categories {
      id
      name
      image
    }
  }
`;

const getAllProductsQuery = `
  query getAllProductsQuery {
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
  query getProductByIdQuery($id: ID!){
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
  mutation postProductQuery($title: String!, $price: Float!, $description: String!, $categoryId: Float!, $images: [String!]!) {
    addProduct(
      data: {
        title: $title
        price: $price
        description: $description
        categoryId: $categoryId
        images: $images
      }
    ) {
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

const putProductQuery = `
  mutation putProductQuery($id: ID!, $title: String!, $price: Float!, $description: String!, $images: [String!]!) {
    updateProduct(id: $id, changes: { 
      title: $title,  price: $price
      description: $description
      images: $images 
    }) {
      id
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

const deleteProductQuery = `
  mutation deleteProductQuery($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const getAllUsersQuery = `
  query getAllUsersQuery{
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
  mutation loginQuery($email:String!, $password: String!){
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

const getUserByAccessTokenQuery = `
  query getUserByAccessTokenQuery{
    myProfile {
      id
      name
      avatar
      email
    }
  }
`;

const postUserQuery = `
  mutation postUserQuery(
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
      email
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
  deleteProductQuery,
  getAllUsersQuery,
  loginQuery,
  getUserByAccessTokenQuery,
  postUserQuery,
};
