const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.Id = uuidv4();
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      await this.getProducts();

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }
      if (this.products.find((product) => product.code === code)) {
        console.log("El producto ya se encuentra agregado");
        return;
      }
      const product = {
        id: this.Id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        "utf-8"
      );
      console.log("Producto agregado exitosamente");
    } catch (err) {
      console.error(err);
    }
  };

  getProducts = async () => {
    try {
      const data = await fs.promises.readFile(this.path);
      const products = JSON.parse(data);
      // console.log(products);
      this.products = products;
      return this.products;
    } catch (err) {
      console.error(`Error loading products: ${err}`);
      this.products = [];
      return this.products;
    }
  };

  getProductById = async (id) => {
    try {
      const data = await fs.promises.readFile(this.path);
      const products = JSON.parse(data);
      const product = products.find((product) => product.id === id);
      if (product) {
        console.log(
          `Producto encontrado: ${product.title} - ${product.description} - $${product.price} - Stock: ${product.stock}`
        );
        return product;
      } else {
        console.log("Producto no encontrado");
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  updateProduct = async (id, updateThis) => {
    try {
      const data = await fs.promises.readFile(this.path);
      const products = JSON.parse(data);
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updateThis, id: id };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log("Producto actualizado exitosamente");
        return products[index];
      } else {
        console.log("Producto no actualizado (no encontrado)");
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  deleteProduct = async (id) => {
    try {
      const data = await fs.promises.readFile(this.path);
      const products = JSON.parse(data);
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log("Producto eliminado exitosamente");
        return deletedProduct; 
      } else {
        console.log("No se pudo eliminar, producto no encontrado");
        return null; 
      }
    } catch (err) {
      console.error(err);
      return null; 
    }
  };
}

module.exports = ProductManager;
