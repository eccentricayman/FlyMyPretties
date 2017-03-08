svg = document.getElementById("svg");
var fillStyle = '#cc99ff';
var xmlns = "http://www.w3.org/2000/svg";
var height = svg.getBoundingClientRect().height;
var width = svg.getBoundingClientRect().width;

var rid

var makeCircle = function( r, x, y){
    var c = document.createElementNS( xmlns, "circle" );    
    c.setAttribute( "cx", x);
    c.setAttribute( "cy", y);
    c.setAttribute( "fill", fillStyle );
    c.setAttribute( "r", r );
    c.addEventListener( "click", colorCircle );
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
    svg.appendChild( makeCircle( 25, math.random() * ( height - 25) , math.random() * ( width - 25 ) ) );
    svg.removeChild( this );    
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
