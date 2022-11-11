const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const newSaleDBReturn = {
    id: 3,
    itemsSold: newSale,
};
  
const productIdMissing = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const quantityMissing = [
  {
    "productId": 1,
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const wrongProductId = [
  {
    "productId": "a",
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const wrongQuantity = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

module.exports = {
  newSale,
  newSaleDBReturn,
  productIdMissing,
  quantityMissing,
  wrongQuantity,
  wrongProductId,
}