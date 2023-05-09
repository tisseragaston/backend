  const express = require('express');
  const app = express();
  // const ProductManager = require("./productManager");
  const routeProducts = require ('./routes/products');
  const routeCarts = require ('./routes/carts')

  app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"));

  app.use(express.json())

  app.use('/products', routeProducts)
  app.use('/carts', routeCarts)

  // Creando instancia de ProductManager
  // const productManager = new ProductManager("./productos.json");

  // Iniciando el servidor
  // app.listen(8080, () => {
  //   console.log("Servidor iniciado en el puerto 8080");
  // });

  // Endpoint para obtener todos los productos
  // app.get("/products", async (req, res) => {
  //   try {
  //     const limit = req.query.limit;
  //     const products = await productManager.getProducts();
  //     // console.log(products)
  //     if (limit) {
  //       const limitedProducts = products.slice(0, limit);
  //       res.send({ limitedProducts });
  //     } else {
  //       res.send({ products });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send('Something fail');
  //   }
  // });

  // Endpoint para obtener un producto por ID
  // app.get("/products/:pid", async (req, res) => {
  //   try {
  //     const id = Number(req.params.pid);
  //     const product = await productManager.getProductById(id);
  //     // console.log(product)
  //     if (product) {
  //       res.send( {product} );
  //     } else {
  //       res.send(`<h1> Producto no encontrado <h1/>`);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send('Something fail');
  //   }
  // });
