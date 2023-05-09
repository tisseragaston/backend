  const express = require('express');
  const app = express();
  // const ProductManager = require("./productManager");
  const routeProducts = require ('./routes/products');
  const routeCarts = require ('./routes/carts')

  app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"));

  app.use(express.json())

  app.use('/products', routeProducts)
  app.use('/carts', routeCarts)
