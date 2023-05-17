let socket = io()

socket.on('message', (data) => {
  console.log(data)
  socket.emit('msg', 'hola soy el cliente')
})

function render (data) {
    const html = data.map(elem => {
      return (`
        <div> 
         <p> Item: ${elem.title} --- Precio: ${elem.price} --- Stock: ${elem.stock} </p>
        </div>
      `)
    }).join(' ')
    document.getElementById ('caja').innerHTML = html 
  }

  // Enviar formulario para agregar un nuevo producto
  const productForm = document.getElementById('productForm');
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const productData = Object.fromEntries(formData.entries());
    socket.emit('newProduct', productData);
    console.log('form enviado')
    productForm.reset();
  });

// Escuchar evento de producto agregado
  
socket.on('productAdded', (data) => {
  console.log('Se agregó un nuevo productito');
  render(data)
});
  

  