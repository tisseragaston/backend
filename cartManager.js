const fs = require("fs");

class CartManager {
  constructor(path) {
    this.path = path;
    this.cart = [];
    this.nextId = 1;
    fs.promises
      .readFile(this.path, "utf-8")
      .then((data) => {
        const carts = JSON.parse(data);
        if (carts.length > 0) {
          const maxId = carts.reduce(
            (acc, curr) => (curr.id > acc ? curr.id : acc),
            carts[0].id
          );
          this.nextId = maxId + 1;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } catch (err) {
      console.error(err);
    }
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
        id: this.nextId,
        products: products,
      };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (err) {
      console.error(err);
    }
  }

  async updateCart(id, products) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const cartIndex = carts.findIndex((cart) => cart.id === id);
      if (cartIndex === -1) {
        return null;
      }
      carts[cartIndex].products = products;
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return carts[cartIndex];
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = CartManager;
