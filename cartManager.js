const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class CartManager {
  constructor(path) {
    this.path = path;
    this.cart = [];
    this.Id = uuidv4();
  }



  async getCartById(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const cart = carts.find((cart) => cart.id === id);
      return cart;
    } catch (err) {
      console.error(err);
    }
  }

  async addCart(products) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const newCart = {
        id: this.Id,
        products: products,
      };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (err) {
      console.error(err);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      if (cartIndex === -1) {
        return null; 
      }
      const cart = carts[cartIndex];
      const productIndex = cart.products.findIndex((p) => p.id === productId);
      if (productIndex === -1) {
        cart.products.push({ id: productId, quantity: 1 });
      } else {
        cart.products[productIndex].quantity++;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return cart;
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = CartManager;
