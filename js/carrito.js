console.log(productos); // PRODUCTOS AGREGADOS EN arraydeproductos.js 

//PRODUCTOS GUARDADOS EN EL LOCAL STORAGE
const PasarProductosAJson = JSON.stringify (productos);
localStorage.setItem ("Listado de Productos", PasarProductosAJson);

// VARIABLES 
let carrito = JSON.parse(localStorage.getItem ("Mis compras")) || [];
let totalCarrito;
let contenedor = document.getElementById("divCarritoJS");
let vaciarCarrito = document.getElementById("vaciarCarrito")
let finalizarCompra = document.getElementById("finalizarCompra");


function renderCarrito () {
    let tablabody=document.getElementById('tablabody')
    tablabody.innerHTML=''
    carrito.forEach (carrito => {
        tablabody.innerHTML += `
    <tr>
        <td style="color: aliceblue;">${carrito.codigo}</td>
        <td style="color: aliceblue;">${carrito.nombre}</td>
        <td style="color: aliceblue;">$${carrito.precio}</td>
        <td style="color: aliceblue;">${carrito.cantidad}</td>
        <td style="color: aliceblue;"><i class="fa-regular fa-trash-can"></i></td>;
    </tr>
    `;})
    };

    

    //RECORRIDO DE LAS CARDS 
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

    
    };

renderProds ();    

function agregarAlCarrito(producto){
    let repeat = carrito.some ((sumarCant) => sumarCant.codigo === producto.codigo)
    
    if (repeat) {
        carrito.forEach ((prod) => {
            if (prod.codigo === producto.codigo) {
                prod.cantidad++;
            }
        });
    }  else {
    carrito.push(producto);

    document.getElementById("tablabody").innerHTML += `
<tr>
    <td style="color: aliceblue;">${producto.codigo}</td>
    <td style="color: aliceblue;">${producto.nombre}</td>
    <td style="color: aliceblue;">$${producto.precio}</td>
    <td style="color: aliceblue;">${producto.cantidad}</td>
    <td style="color: aliceblue;"><i id= "fa-trash-can${producto.codigo}" class="fa-regular fa-trash-can"></i></td>
</tr>
`;


}
//document.getElementById (`fa-trash-can${carrito.codigo}`).addEventListener ("click", eliminarProducto)

    //Alert
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: producto.nombre,
        text:'Fue añadido a tu carrito!',
        showConfirmButton: false,
        timer: 1000});
        
        console.table(carrito);
        localStorage.setItem ("Mis compras", JSON.stringify (carrito));
        
    //TOTALIZAR COMPRA 
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio * producto.cantidad,0);
    let Total = document.getElementById("total");
    Total.innerText="Total a pagar: $"+totalCarrito+"\n"+"\n"+"Gracias por tu compra."+"\n"+"Te esperamos por el local para retirar tu pedido!";

    localStorage.setItem ("Mis compras", JSON.stringify (carrito));

    renderCarrito ();
    }

    renderCarrito ();
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio * producto.cantidad,0);
    let Total = document.getElementById("total");
    Total.innerText="Total a pagar: $"+totalCarrito;


//BOTON FINALIZAR COMPRA
finalizarCompra.addEventListener ("click", () => {
    carrito = [];
    document.getElementById("tablabody").innerHTML= "";
    let Total = document.getElementById("total");
    Total.innerText="Total a pagar: $";

    Toastify({
        text: "Compra Finalizada!"+"\n"+"A la brevedad recibirás un Email con el detalle.",
        duration: 3000,
        style: {background: "black",},
        }).showToast();
});


//ELIMINAR PRODUCTO DE A UNO. 
//OPCION 1
/*const eliminarProducto = (codigo) => {
    let borrar = carrito.find((producto) => producto.codigo === codigo)
    let indice = carrito.indexOf(borrar)
    carrito.splice(indice, 1)
    renderCarrito()
}*/

//OPCION 2
/*
const eliminarProducto = (e) => {
    const borrar = carrito.find((producto) => producto.codigo === e.target.codigo);
    let indice = carrito.indexOf(borrar)
    carrito.splice(indice, 1)
    renderCarrito()}
*/


//BOTON VACIAR CARRITO PREGUNTAR PORQUÉ NO FUNCIONA. 
/*
vaciarCarrito.addEventListener ("click", () => {
    console.log ("f")
    carrito.splice (0, carrito.length);
    renderCarrito ();
    }
);
*/