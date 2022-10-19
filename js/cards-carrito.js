//funcion para crear los cards del carrito del index

function cardsCarrito(){

    contenedorCarrito.innerHTML = ''

    totalCarrito.innerHTML = ''

    arrayCarrito.forEach((producto) => {

        let precioAcumulado = parseInt(producto.precio * producto.cantidad)
        let cuotasAcumulado = parseInt((producto.precio * producto.cantidad) / 6)

        const divCarritoCard = document.createElement("div")
        divCarritoCard.classList.add("div-card-carrito")
        divCarritoCard.innerHTML = `
                                <div class="grid-img-carrito">
                                    <img class="img-carrito" src="${producto.img}" alt="${producto.nombre}">
                                </div>
                                <div class="grid-cantidad">
                                    <div class="div-cantidad">
                                        <p class="p-cantidad">Cantidad: ${producto.cantidad}</p>
                                        <div class="div-btn-a-d">
                                            <button onclick=aumentarProducto(${producto.id}) class="btn-aumentar">
                                                <span class="span-icon-aumentar">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-up fa-w-10 fa-5x">
                                                        <path fill="currentColor" d="M168.5 164.2l148 146.8c4.7 4.7 4.7 12.3 0 17l-19.8 19.8c-4.7 4.7-12.3 4.7-17 0L160 229.3 40.3 347.8c-4.7 4.7-12.3 4.7-17 0L3.5 328c-4.7-4.7-4.7-12.3 0-17l148-146.8c4.7-4.7 12.3-4.7 17 0z" class=""></path>
                                                    </svg>
                                                </span>
                                            </button>
                                            <button onclick=disminuirProducto(${producto.id}) class="btn-disminuir">
                                                <span class="span-icon-disminuir">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-down fa-w-10 fa-5x">
                                                        <path fill="currentColor" d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z" class=""></path>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-btn-eliminar">
                                    <button onclick=eliminarProducto(${producto.id}) type="button" class="btn-close-cards">
                                        <span class="btn-remove-cards">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10 fa-3x">
                                                <path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class="">
                                                </path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div class="grid-nombre-carrito">
                                    <a class="a-nombre-carrito" href="productos/${arrayProductos[producto.id - 1].urlPagina}">
                                        <h5 class="nombre-carrito">${producto.nombre}</h5>
                                    </a>
                                </div>
                                <div class="grid-precio-carrito">
                                    <p class="precio-carrito">$${precioAcumulado}</p>
                                    <p class="cuotas-carrito">x6 $${cuotasAcumulado}</p>
                                </div>
        `
        contenedorCarrito.appendChild(divCarritoCard)
        
    })

    idPCarrito.textContent = arrayCarrito.length

    totalPrecioArray = parseInt(arrayCarrito.reduce((ac , el) => ac + (el.precio * el.cantidad) , 0))
    totalSeisCuotas = parseInt(arrayCarrito.reduce((ac , el) => ac + ((el.precio * el.cantidad) / 6) , 0))

    totalCarrito.innerHTML = `TOTAL: $${totalPrecioArray} <strong class="total-seis-cuotas">x6 $${totalSeisCuotas}</strong>`
}