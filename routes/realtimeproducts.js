const express = require("express");
const ProductManager = require("../productManager");

const { Router } = express;

const router = new Router();

// Creando instancia de ProductManager
const productManager = new ProductManager("./productos.json");

// Ruta para la vista en tiempo real de productos
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
    
  });

  // Ruta para mostrar productos agregados hasta el momento
router.get('/index', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', { products });
   
})






module.exports = router;