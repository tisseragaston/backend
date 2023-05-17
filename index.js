  const express = require('express');
  const app = express();
  const handlebars = require ('express-handlebars')
  const http = require('http');
  const server = http.createServer(app);
  const ProductManager = require("./productManager");

   // Socket
   const { Server } = require("socket.io");
   const io = new Server(server);

  // Creando instancia de ProductManager
const productManager = new ProductManager("./productos.json");

 

  // Routes
  const routeProducts = require ('./routes/products');
  const routeCarts = require ('./routes/carts')
  const routeRealtime = require ('./routes/realtimeproducts')

  
  // Views
  app.engine('handlebars', handlebars.engine())
  app.set('views', __dirname+'/views')
  app.set('view engine', 'handlebars')


  // app.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"));
  server.listen(8080, () => console.log("Servidor corriendo en el puerto 8080"));

  app.use(express.json())
  app.use(express.static(__dirname+'/public'))

  app.use('/api/products', routeProducts)
  app.use('/api/carts', routeCarts)
  app.use('/realtimeproducts', routeRealtime)

  io.on('connection', async (socket)=> {
     products = await productManager.getProducts()
     io.emit('productAdded', products)
  })


  // Agregar un nuevo producto (usando websockets)
io.on('connection', (socket)=> {
  socket.on('newProduct', async (productData) => {
    await productManager.addProduct(
     productData.title,
     productData.description,
     productData.price,
     productData.thumbnail,
     productData.code,
     productData.stock,
   )
   io.emit('productAdded', productData)
 })
})

