$("#img-loaded-animate")
    .fadeOut(200)
    .fadeIn(200)
    .animate({
        "position" : "relative",
        "width" : "18.5rem"
    } , 300)
    .delay(100)
    .animate({
        "position" : "relative",
        "width" : "17rem"
    } , 400)
    .delay(100)
    
    .animate({
        "position" : "relative",
        "width" : "18.5rem"
    } , 300)
    .delay(100)
    .animate({
        "position" : "relative",
        "width" : "17rem"
    } , 400)
    .animate({
        "position" : "relative",
        "width" : "18.5rem"
    } , 300)
    .delay(100)
    .animate({
        "position" : "relative",
        "width" : "17rem"
    } , 400)


$(document).ready(function(){
        setTimeout(() => {

            $(".div-loaded").css({
                visibility: "hidden",
                opacity: 0,
            })

            $("body").css({
                overflow : "visible"
            })    

            $(".logo-header").addClass("animate__animated animate__fadeInDown")

            $(".icon-carrito").css({
                visibility : "visible"
            })
            $(".p-texto-carrito").css({
                visibility : "visible"
            })
        }, 200); 
})