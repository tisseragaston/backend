const express = require("express");
const ProductManager = require("../productManager");

const { Router } = express;

const router = new Router();

// Creando instancia de ProductManager
const productManager = new ProductManager("./productos.json");

// Rutas para el manejo de productos
// const productsRouter = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something fail');
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await productManager.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Something fail');
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    await productManager.addProduct(title, description, price, thumbnail, code, stock);
    const products = await productManager.getProducts();
    const newProduct = products[products.length - 1];
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something fail');
  }
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const { title, description, price, thumbnail, code, stock } = req.body;
const updatedProduct = await productManager.updateProduct(id, title, description, price, thumbnail, code, stock);
if (updatedProduct) {
res.json(updatedProduct);
} else {
res.status(404).send('Producto no encontrado');
}
} catch (err) {
console.error(err);
res.status(500).send('Something fail');
}
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const deletedProduct = await productManager.deleteProduct(id);
if (deletedProduct) {
res.json(deletedProduct);
} else {
res.status(404).send('Producto no encontrado');
}
} catch (err) {
console.error(err);
res.status(500).send('Something fail');
}
});


module.exports = router;