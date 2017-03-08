svg = document.getElementById("svg");
var fillStyle = '#cc99ff';
var xmlns = "http://www.w3.org/2000/svg";
var height 

var rid

var makeCircle = function( r, x, y){
    var c = document.createElementNS( xmlns, "circle" );    
    c.setAttribute( "cx", x);
    c.setAttribute( "cy", y);
    c.setAttribute( "fill", fillStyle );
    c.setAttribute( "r", r );
    return c;
}

var drawCircle = function( event ){
    if( event.target == this ){
        svg.appendChild( makeCircle( 25, event.offsetX, event.offsetY ) );
    }
}

var colorCircle = function( event ){
    this.setAttribute( "fill", "green" );
    this.addEventListener("click", resetCircle );
}

var resetCircle = function( event ){
    svg.removeChild( this );
    svg.appendChild( makeCircle( 25, , event.offsetY ) );
}

svg.addEventListener("click", drawCircle );

var clearSVG = function(){
    while( svg.lastChild ){
        svg.removeChild( svg.lastChild );
    }
    window.cancelAnimationFrame(rid);
}

var clear = document.getElementById("clr");
clear.addEventListener("click", clearSVG );
