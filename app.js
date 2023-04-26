const fs = require('fs');

class ProductManager {
    constructor(path) {
        // this.path = './productos.txt';
        this.path = path;
        this.products = [];
        this.nextId = 1;
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return;
        }
        if (this.products.find(product => product.code === code)) {
            console.log('El producto ya se encuentra agregado');
            return;
        }
        const product = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.nextId++;
    
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
            console.log('Producto agregado exitosamente');
        } catch (err) {
            console.error(err);
        }
    }
    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path);
            const products = JSON.parse(data);
            console.log(products);
            return this.products
        } catch (err) {
            console.error(err);
        }
    }

    getProductById = async (id) => {
        try {
            const data = await fs.promises.readFile(this.path);
            const products = JSON.parse(data);
            const product = products.find(product => product.id === id);
            if (product) {
                console.log(`Producto encontrado: ${product.title} - ${product.description} - $${product.price} - Stock: ${product.stock}`);
            } else {
                console.log('Producto no encontrado');
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    updateProduct = async (id, updateThis) => {
        try {
            const data = await fs.promises.readFile(this.path);
            const products = JSON.parse(data);
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...updateThis };
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
                console.log('Producto actualizado exitosamente');
            } else {
                console.log('Producto no actualizado (no encontrado)');
            }
        } catch (err) {
            console.error(err);
        }
    }

    deleteProduct = async (id) => {
        try {
            const data = await fs.promises.readFile(this.path);
            const products = JSON.parse(data);
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
                console.log('Producto eliminado exitosamente');
            } else {
                console.log('No se pudo eliminar, producto no encontrado');
            }
        } catch (err) {
            console.error(err);
        }
    }
}

// Inicializando Instancia:
const productManager = new ProductManager('./productos.txt');

// Probando agregar productos:
// productManager.addProduct('coca', '2 litros', 200, 'sin imagen', 'abc123', 7);
productManager.addProduct('sprite', '3 litros', 300, 'sin imagen', 'abc124', 6);
productManager.addProduct('fanta', '2,5 litros', 250, 'sin imagen', 'abc124', 3);
// productManager.addProduct('agua', '1 litro', 150, 'sin imagen', 'abc126', 5);

// Obtener productos actuales en el array:
// productManager.getProducts();

// Obtener producto por ID:
// productManager.getProductById(1);

// Actualizar un producto:
// productManager.updateProduct(1, { price: 250, stock: 6 });

// Eliminar un producto:
// productManager.deleteProduct(4);
