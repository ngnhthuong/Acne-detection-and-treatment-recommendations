export const getAllProductsConfig = (page, limit, productType) => ({
    url: api/v1/products,
    method: 'GET',
    params: {
      page,
      limit,
      productType,
    },
  });