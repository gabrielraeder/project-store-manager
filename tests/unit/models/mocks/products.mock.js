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
  
const failureFindById = { "message": "Product not found" }

module.exports = {
  findAllProducts,
  successFindById,
  failureFindById
}