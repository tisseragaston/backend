
products = []
let nextId = 1

class ProductManager {
    constructor (title, description, price, thumbnail, code, stock, id) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = id
    }
}
// Funcion agregar productos con condicional si codigo se repite
addProducts = (title, description, price, thumbnail, code, stock) => {
    if (products.find((products) => products.code === code)) {
        console.log('el producto ya se encuentra agregado')
    } else {
    producto = new ProductManager (title, description, price, thumbnail, code, stock, nextId)
    products.push (producto)
    nextId++}
}
// Funcion mostrar productos
getProducts = () => {
    console.log(products)
    
}
// Funcion buscar por ID
getProductsbyID = (id) => {
    if (products.find((products) => products.id === id)) {
        resultado = products.find((products) => products.id === id)
        console.log (`Producto encontrado: ${resultado.title} - ${resultado.description} - $ ${resultado.price}`)
        
    } else {
        console.log('Producto no encontrado')
    }
}

// Probando agregar productos
addProducts ('coca', '2 litros', 200, 'sin imagen' , 'abc123' , 2)
addProducts ('sprite', '3 litros', 300, 'sin imagen' , 'abc123' , 2)
addProducts ('fanta', '2,5 litros', 250, 'sin imagen' , 'abc124' , 2)

// Obtener productos actuales en el array
getProducts ()

// Obtener producto por ID
getProductsbyID (1)



