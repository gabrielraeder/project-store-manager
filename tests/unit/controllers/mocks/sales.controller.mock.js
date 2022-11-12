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

const allSalesDB = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-12T16:26:46.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-12T16:26:46.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-11-12T16:26:46.000Z"
  }
];

const saleByIdDB = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-12T16:26:46.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-12T16:26:46.000Z"
  }
];

module.exports = {
  newSale,
  newSaleDBReturn,
  productIdMissing,
  quantityMissing,
  wrongQuantity,
  wrongProductId,
  saleByIdDB,
  allSalesDB,
}