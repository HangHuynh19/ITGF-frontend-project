const getAllCategoriesQuery = `
  query {
    categories {
      id
      name
      image
    }
  }`;

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
}`;

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

export { getAllCategoriesQuery, getAllProductsQuery, getProductByIdQuery };
