svg = document.getElementById("vimage");
var fillStyle = '#cc99ff';
var xmlns = "http://www.w3.org/2000/svg";


var makeCircle = function( r, x, y){
    var c = document.createElementNS( xmlns, "circle" );    
    c.setAttribute( "cx", x);
    c.setAttribute( "cy", y);
    c.setAttribute( "fill", fillStyle );
    c.setAttribute( "r", r );
    return c;
}

var drawCircle = function( event ){
    svg.appendChild( makeCircle( 25, event.offsetX, event.offsetY ) );
}

svg.addEventListener("click", drawCircle );
var clearSVG = function(){
    while( svg.lastChild ){
        svg.removeChild( svg.lastChild );
    }
}

var clear = document.getElementById("clr-btn");
clear.addEventListener("click", clearSVG );
