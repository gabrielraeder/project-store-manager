const findAllProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const successFindById = {
    "id": 1,
    "name": "Martelo de Thor"
}
  
const failureFindById = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

const createdProduct = {
    "id": 5,
    "name": "projetoX"
}

const creationFailure = { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

const updatedProduct = {
  id: 1,
  name: 'batman'
}

module.exports = {
  findAllProducts,
  successFindById,
  failureFindById,
  createdProduct,
  creationFailure,
  updatedProduct,
}