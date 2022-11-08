
// VARIABLES 
let productosJSON=[];
let carrito = JSON.parse(localStorage.getItem("Mis compras")) || [];
let totalCarrito;
let contenedor = document.getElementById("divCarritoJS");
let vaciarCarrito = document.getElementById("vaciarCarrito")
let finalizarCompra = document.getElementById("finalizarCompra");


//ELIMINAR PRODUCTO
const eliminarProducto = (codigo) => {
    let borrar = carrito.find((producto) => producto.codigo === codigo);
    let indice = carrito.indexOf(borrar)
    carrito.splice(indice, 1)
    renderCarrito()
    localStorage.setItem("Mis compras", JSON.stringify(carrito));
    totalizar (); 
}

//FUNCIÓN PARA CALCULAR TOTALES
function totalizar () {
    totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    let Total = document.getElementById("total");
    Total.innerText = "Total a pagar: $" + totalCarrito;}


//RECORRIDO DE LAS CARDS 
function renderProds() {
    for (const producto of productosJSON) {
        contenedor.innerHTML += `
                            <div class="col">
                                <div class="card " style="margin: 0 auto;">
                                    <img src=${producto.imagen} class="card-img-top" alt="cards de productos">
                                    <div class="card-body">
                                    <h5 class="card-title" style="font-family: 'Righteous', cursive;">${producto.nombre} $${producto.precio}</h5>
                                    <p class="card-text" style="background-color: transparent; font-family: 'Nunito', sans-serif;">${producto.descripcion}</p>
                                    <button id="btn${producto.codigo}" class="btn btn-dark" style="font-family: 'Righteous', cursive;">Añadir al Carrito!</button>
                                </div>
                            </div>             
            `;
    }
    //EVENTO Click para comprar el producto.
    productosJSON.forEach(producto => {
        document.getElementById(`btn${producto.codigo}`).addEventListener("click", function () {agregarAlCarrito(producto); });
    })
};


function renderCarrito() {
    let tablabody = document.getElementById('tablabody')
    tablabody.innerHTML = ''
    carrito.forEach(carrito => {
        tablabody.innerHTML += `
        <tr>
            <td style="color: aliceblue;">${carrito.codigo}</td>
            <td style="color: aliceblue;">${carrito.nombre}</td>
            <td style="color: aliceblue;">${carrito.precio}</td>
            <td style="color: aliceblue;">${carrito.cantidad}</td>
            <td  onClick = "eliminarProducto(${carrito.codigo})" style="color: white;"><i class="fa-regular fa-trash-can"></i></td>;
        </tr>
        `;
    })  
};
//AGREGAR PRODUCTOS AL CARRITO
function agregarAlCarrito(producto) {
    let repeat = carrito.some((sumarCant) => sumarCant.codigo === producto.codigo)

    if (repeat) {
        carrito.forEach((prod) => {
            if (prod.codigo === producto.codigo) {
                prod.cantidad++;
            }
        });
    } else {
        carrito.push(producto);
    }

    //Alert
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: producto.nombre,
        text: 'Fue añadido a tu carrito!',
        showConfirmButton: false,
        timer: 1000
    });

    console.table(carrito);
    localStorage.setItem("Mis compras", JSON.stringify(carrito));

    //TOTALIZAR COMPRA 
    totalizar (); 
    document.getElementById("total").innerText= "Total a pagar: $" + totalCarrito+"\n"+"\n"+"Gracias por tu compra." + "\n" + "Te esperamos por el local para retirar tu pedido!";
    localStorage.setItem("Mis compras", JSON.stringify(carrito));
    renderCarrito();
}

renderCarrito();
totalizar (); 


//función GET de array de productos incorporados con JSON 
async function GETdatosJSON() {
    const URLJSON="array.json";
    const respuestaArray = await fetch(URLJSON);
    const tomarDatos = await respuestaArray.json();
    productosJSON = tomarDatos;
    
    //renderización del array de productos
    renderProds();
}

GETdatosJSON ();

//BOTON VACIAR CARRITO
vaciarCarrito.addEventListener("click", () => {
    carrito.splice(0, carrito.length);
    renderCarrito();
    localStorage.setItem("Mis compras", JSON.stringify(carrito));
    totalizar (); 
}
);

//BOTON FINALIZAR COMPRA
finalizarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Tu carrito está vacío!',
        text: 'No olvides seleccionar tu producto para retirar por nuestro local.',
        showConfirmButton: false,
        timer: 1000
    });} else {carrito = [];
    document.getElementById("tablabody").innerHTML = "";
    totalizar (); 
    Toastify({
        text: "Compra Finalizada!" + "\n" + "A la brevedad recibirás un Email con el detalle.",
        duration: 3000,
        style: { background: "black", },
    }).showToast();
}});


