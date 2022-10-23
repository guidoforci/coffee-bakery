console.log(productos); // PRODUCTOS AGREGADOS EN arraydeproductos.js 

const PasarProductosAJson = JSON.stringify (productos);
localStorage.setItem ("Listado de Productos", PasarProductosAJson);

const carrito = [];
let totalCarrito;
let contenedor = document.getElementById("divCarritoJS");


function renderProds(){
    for(const producto of productos){
        contenedor.innerHTML += `
        <div class="multi-collapse collapse show" id="multiCollapse1">
                <div class="botoncafe">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" style="justify-content: center;">
                        <div class="col">
                            <div class="card" style="margin: 0 auto;">
                                <img src=${producto.imagen} class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title" style="font-family: 'Righteous', cursive;">${producto.nombre} $${producto.precio}</h5>
                                <p class="card-text" style="background-color: transparent; font-family: 'Nunito', sans-serif;">${producto.descripcion}</p>
                                <button id="btn${producto.codigo}" class="btn btn-dark" style="font-family: 'Righteous', cursive;">Añadir al Carrito!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    //EVENTO Click para comprar el producto.
    productos.forEach(producto => {
        document.getElementById(`btn${producto.codigo}`).addEventListener("click",function(){agregarAlCarrito(producto);});})
}

renderProds();

function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    console.table(carrito);
    alert(productoComprado.nombre+" fue añadido a tu carrito!");
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td style="color: aliceblue;">${productoComprado.codigo}</td>
            <td style="color: aliceblue;">${productoComprado.nombre}</td>
            <td style="color: aliceblue;">${productoComprado.precio}</td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let Total = document.getElementById("total");
    Total.innerText="Total a pagar: $"+totalCarrito;
}
