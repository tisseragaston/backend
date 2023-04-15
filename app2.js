class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
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
        console.log('Producto agregado exitosamente');
    }

    getProducts = () => {
        console.log(this.products);
    }

    getProductById = (id) => {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(`Producto encontrado: ${product.title} - ${product.description} - $${product.price}`);
        } else {
            console.log('Producto no encontrado');
        }
    }
}

const productManager = new ProductManager();

// Probando agregar productos
productManager.addProduct('coca', '2 litros', 200, 'sin imagen', 'abc123', 2);
productManager.addProduct('sprite', '3 litros', 300, 'sin imagen', 'abc123', 2);
productManager.addProduct('fanta', '2,5 litros', 250, 'sin imagen', 'abc124', 2);

// Obtener productos actuales en el array
productManager.getProducts();

// Obtener producto por ID
productManager.getProductById(1);
