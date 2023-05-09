const express = require("express");
const CartManager = require("../cartManager");

const { Router } = express;

const router = new Router();


// Creando instancia de ProductManager
const cartManager = new CartManager("./carrito.json");

// Agregar un nuevo carrito
router.post('/', async (req, res) => {
    try {
    const products = req.body;
    const newCart = await cartManager.addCart(products);
    res.status(201).json(newCart);
    } catch (err) {
    console.error(err);
    res.status(500).send('Something fail');
    }
    });

// Obtener todos los carritos
router.get('/', async (req, res) => {
try {
const carts = await cartManager.getCarts();
res.json(carts);
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



// Actualizar un carrito por ID
router.put('/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const products = req.body;
const updatedCart = await cartManager.updateCart(id, products);
if (updatedCart) {
res.json(updatedCart);
} else {
res.status(404).send('Carrito no encontrado');
}
} catch (err) {
console.error(err);
res.status(500).send('Something fail');
}
});


module.exports = router;