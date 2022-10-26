console.log(productos); // PRODUCTOS AGREGADOS EN arraydeproductos.js 

//PRODUCTOS GUARDADOS EN EL LOCAL STORAGE
const PasarProductosAJson = JSON.stringify (productos);
localStorage.setItem ("Listado de Productos", PasarProductosAJson);

// VARIABLES 
let carrito = JSON.parse(localStorage.getItem ("Mis compras")) || [];

let totalCarrito;
let contenedor = document.getElementById("divCarritoJS");

//RECORRIDO DE LAS CARDS 
function renderCarrito () {
    carrito.forEach (carrito => {document.getElementById("tablabody").innerHTML += `
    <tr>
        <td style="color: aliceblue;">${carrito.codigo}</td>
        <td style="color: aliceblue;">${carrito.nombre}</td>
        <td style="color: aliceblue;">${carrito.precio}</td>
        <td style="color: aliceblue;"><i class="fa-regular fa-trash-can"></i></td>
    </tr>
    `;})
    };

function renderProds() {
    for (const producto of productos) {
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
    productos.forEach(producto => {
        document.getElementById(`btn${producto.codigo}`).addEventListener("click",function(){agregarAlCarrito(producto);});})
}


renderProds();

function agregarAlCarrito(producto){
    carrito.push(producto);
    console.table(carrito);
    alert(producto.nombre+" fue añadido a tu carrito!");
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td style="color: aliceblue;">${producto.codigo}</td>
            <td style="color: aliceblue;">${producto.nombre}</td>
            <td style="color: aliceblue;">${producto.precio}</td>
            <td style="color: aliceblue;"><i class="fa-regular fa-trash-can"></i></td>
        </tr>
    `;

    //TOTALIZAR COMPRA 
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let Total = document.getElementById("total");
    Total.innerText="Total a pagar: $"+totalCarrito+"\n"+"\n"+"Gracias por tu compra."+"\n"+"Te esperamos por el local para retirar tu pedido!";

    localStorage.setItem ("Mis compras", JSON.stringify (carrito));
}


renderCarrito ();
