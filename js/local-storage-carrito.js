if(localStorage.getItem("productos")){
    
    const productosLS = JSON.parse(localStorage.getItem('productos'))

    idPAñadiste.textContent = "Añadiste:"

    for(let i of productosLS){

        arrayCarrito.push(
            {id: i.id , nombre: i.nombre , img: i.img , precio: i.precio , cantidad: i.cantidad}
        )

        cardsCarrito(i)
        
    }
    
}