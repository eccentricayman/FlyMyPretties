var svg = document.getElementById("svg");
var clearB = document.getElementById("clr");
var moveB = document.getElementById("mv");
var fillStyle = '#cc99ff';
var xmlns = "http://www.w3.org/2000/svg";
var height = svg.getBoundingClientRect().height;
var width = svg.getBoundingClientRect().width;

var rid;

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
    svg.appendChild( makeCircle( 25, Math.random() * ( height - 25 ) , Math.random() * ( width - 25 ) ) );
    svg.removeChild( this );    
}

var moveCircles = function(event) {
    var vx = 1;
    var vy = 1;
    
    var width = svg.getBoundingClientRect().width;
    var height = svg.getBoundingClientRect().height;
    
    window.cancelAnimationFrame(rid);

    var animate = function(event) {
        while (svg.lastChild) {
            var circle = svg.lastChild;

            var x = circle.getAttribute("cx");
            var y = circle.getAttribute("cy");

            if( x <= 0 || x + 25 >= width ) {
                vx *= -1;
            }

            if( y <= 0 || y + 25 >= height ) {
                vy *= -1;
            }

            x += vx;
            y += vy;
            circle.setAttribute( "x", x );
            circle.setAttribute( "y", y );

            rid = requestAnimationFrame(animate);
        }
        window.cancelAnimationFrame(rid);
    };
    animate();

};

svg.addEventListener("click", drawCircle );

var clearSVG = function(){
    while( svg.lastChild ){
        svg.removeChild( svg.lastChild );
    }
    window.cancelAnimationFrame(rid);
}

clearB.addEventListener("click", clearSVG );
moveB.addEventListener("click", moveCircles);
