const express = require("express");
const CartManager = require("../cartManager");

const { Router } = express;

const router = new Router();


// Creando instancia de ProductManager
const cartManager = new CartManager("./carrito.json");

// Agregar un nuevo carrito
router.post('/', async (req, res) => {
    try {
    const newCart = await cartManager.addCart([]);
    res.status(201).json(newCart);
    } catch (err) {
    console.error(err);
    res.status(500).send('Something fail');
    }
    });

// Obtener un carrito por ID
router.get('/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const cart = await cartManager.getCartById(id);
if (cart) {
res.json(cart);
} else {
res.status(404).send('Carrito no encontrado');
}
} catch (err) {
console.error(err);
res.status(500).send('Something fail');
}
});


//Agregar a carrito ya existente
router.post("/:cid/product/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;

      const product = await productManager.getProductById(productId);
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    
      const cart = await cartManager.addProductToCart(cartId, productId);
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).send("Carrito no encontrado");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something fail");
    }
  }); 


module.exports = router;