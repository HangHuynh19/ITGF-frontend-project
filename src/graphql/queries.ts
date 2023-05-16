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

export {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getProductByIdQuery,
  getAllUsersQuery,
};
