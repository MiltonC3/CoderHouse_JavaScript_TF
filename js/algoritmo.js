//*****************************************************  CARDS  ***************************************************// 


const contenedorTiendaProductos = $('#productos-tienda')

cardsProductos(arrayProductos)


//****************************************************  CARRITO  **************************************************//


// array carrito

const arrayCarrito = []

//llamado para el boton para agregar productos al carrito

const btn = $(".btn-agregar-carrito")

for(let i = 0 ; i <= btn.length - 1 ; i++){
    $(btn[i]).click( () => {
        agregarCarrito(i)

        idPAñadiste.textContent = "Añadiste:"

    })

}

//llamado para que arriba del carrito se vea la cantidad de productos que se agrego al carrito

const idPCarrito = document.getElementById("id-p-carrito")

const idPAñadiste = document.getElementById("id-p-añadiste")

//llamado para el contenedor del carrito

const contenedorCarrito = document.getElementById("contenedor-carrito")
const totalCarrito = document.getElementById("p-total-carrito")

let totalPrecioArray = 0
let totalSeisCuotas = 0

//llamado para el boton de abrir y cerrar el carrito

const abrirCarrito = document.getElementById("abrir-carrito")
const cerrarCarrito = document.getElementById("cerrar-carrito")
const carritoContainer = document.getElementsByClassName("div-modal-carrito")[0]
const modalCarrito = document.getElementsByClassName("div-carrito")[0]

abrirCarrito.addEventListener('click', () => {
    carritoContainer.classList.toggle("envio-active")
})

cerrarCarrito.addEventListener('click', () => {
    carritoContainer.classList.toggle("envio-active")
})

carritoContainer.addEventListener('click', () => {
    cerrarCarrito.click()
})

modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
})

//llamado para vaciar el carrito

const vaciarCarrito = document.getElementById("vaciar-carrito")

vaciarCarrito.addEventListener('click' , () => {

    vaciarTotalCarrito()

})

//llamado para que cuando se clickea el boton de finalizar compra se ejecute la funcion de la API de MP

const btnCompra = document.getElementById("btn-finalizar-compra")

btnCompra.addEventListener("click" , () => {

    finalizarCompraMP()

})


//***************************************************  FUNCIONES  **************************************************//


// funcion cards productos

function cardsProductos(pArray){ 
    contenedorTiendaProductos.innerHTML = ''
  
    pArray.forEach((producto) => {

      contenedorTiendaProductos.append(`
                                        <div class="col">
                                            <div class="card card-contenedor">
                                                <img src="${producto.img}" class="img-card" alt="${producto.nombre}">
                                                <h5 class="precio-card">$ ${producto.precio}</h5>
                                                <h6 class="envio-card">envío gratis</h6>
                                                <p class="texto-card">${producto.nombre}</p>
                                                <div class="div-btn-agregar">
                                                    <button class="btn-agregar-carrito">Agregar al Carrito</button>
                                                </div>
                                                <div class="div-ver-mas">
                                                    <a href="productos/${arrayProductos[producto.id - 1].urlPagina}" class="btn-ver-mas">Ver mas</a>
                                                </div>
                                            </div>
                                        </div>
        `)                          
    })
}

//funcion para agregar productos en el carrito

function agregarCarrito(pNum){

    let item = arrayCarrito.find( el => el.id == pNum + 1 )
    if(item){
        item.cantidad++
    } else{arrayCarrito.push(
        {id: arrayProductos[pNum].id , nombre: arrayProductos[pNum].nombre , img: arrayProductos[pNum].img, url: arrayProductos[pNum].urlPagina , precio: arrayProductos[pNum].precio , cantidad: 1 }
    )}

    localStorage.setItem('productos', JSON.stringify(arrayCarrito))
    
    cardsCarrito()

}

//funcion para eliminar individualmente los productos del carrito

function eliminarProducto(pId){
    let eliminarItem = arrayCarrito.find(el => el.id == pId)

    eliminarItem.cantidad = 0

    if (eliminarItem.cantidad == 0){
        let indice = arrayCarrito.indexOf(eliminarItem)
        arrayCarrito.splice(indice, 1)
    }

    localStorage.setItem('productos', JSON.stringify(arrayCarrito))

    cardsCarrito()

    if(arrayCarrito == ''){
        idPCarrito.textContent = ''

        idPAñadiste.textContent = "No añadiste nada al carrito"

        localStorage.removeItem('productos')

        totalCarrito.innerHTML = `TOTAL: $${totalPrecioArray}`
    }
}

//funcion para aumentar la cantidad de un producto en particular

function aumentarProducto(pId){
    let aumentarItem = arrayCarrito.find(el => el.id == pId)

    aumentarItem.cantidad++

    localStorage.setItem('productos', JSON.stringify(arrayCarrito))

    cardsCarrito()

}

//funcion para disminuir la cantidad de un producto en particular

function disminuirProducto(pId){
    let eliminarItem = arrayCarrito.find(el => el.id == pId)

    if(eliminarItem.cantidad > 1){
        eliminarItem.cantidad--
    }

    localStorage.setItem('productos', JSON.stringify(arrayCarrito))

    cardsCarrito()

}

//funcion para el boton de vaciar carrito

function vaciarTotalCarrito(){

    arrayCarrito.splice(0, arrayCarrito.length)

    localStorage.removeItem('productos')

    idPCarrito.textContent = ''

    contenedorCarrito.textContent = ''

    totalPrecioArray = 0
    totalSeisCuotas = 0

    totalCarrito.innerHTML = `TOTAL: $${totalPrecioArray}`

    idPAñadiste.textContent = "No añadiste nada al carrito"

}

//funcion para el metodo de pago con MERCADO PAGO

function finalizarCompraMP(){

    const itemMP = arrayCarrito.map( (producto) => {
        return {
            title: producto.nombre,
            description: "",
            picture_url: "",
            category_id: producto.id,
            quantity: producto.cantidad,
            currency_id: "ARS",
            unit_price: producto.precio
        }
    })

    fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            Authorization: "Bearer TEST-8637354791935842-102523-454ff2160d2691fdd026e445bdfb7cdc-734669500"
        },
        body: JSON.stringify({
            items: itemMP,
            back_urls: {
                success: window.location.href,
                failure: window.location.href
            }
        })
    })
    .then( res => res.json())
    .then( data => {
        window.location.replace(data.init_point)
    })
}

