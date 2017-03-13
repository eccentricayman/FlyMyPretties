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
    c.setAttribute("vx", 1);
    c.setAttribute("vy", 1);    
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
    var width = svg.getBoundingClientRect().width;
    var height = svg.getBoundingClientRect().height;
    
    window.cancelAnimationFrame(rid);

    var animate = function(event) {
        var children = svg.children;
        var length = children.length;
        for (i = 0 ; i < svg.children.length; i++) {
            var circle = svg.children[i];

            var vx = parseInt(circle.getAttribute("vx"));
            var vy = parseInt(circle.getAttribute("vy"));
            
            console.log("<- watch this number grow");
    
            var x = parseInt(circle.getAttribute("cx"));
            var y = parseInt(circle.getAttribute("cy"));
            var r = parseInt(circle.getAttribute("r"));
            
            if( x - r <= 0 || x + r >= width ) {
                circle.setAttribute("vx", vx * -1);
                vx *= -1;
            }

            if( y - r <= 0 || y + r >= height ) {
                circle.setAttribute("vy", vy * -1);
                vy *= -1;
            }

            x += vx;
            y += vy;
            circle.setAttribute( "cx", x );
            circle.setAttribute( "cy", y );

            if(x == (width / 2)) {
                r = r/2;
                if (r <= 2) {
                    svg.removeChild(circle);
                    i--;
                }
                else {
                    var newCircle = makeCircle(r, x - vx, y - vy);
                    newCircle.setAttribute("vx", vx * -1);
                    newCircle.setAttribute("vy", vy * -1);
                    svg.appendChild(newCircle);
                    circle.setAttribute("r", r);
                }
            }
        }
        rid = requestAnimationFrame(animate);
    };
    animate();
};

svg.addEventListener("click", drawCircle );

var clearSVG = function() {
    while( svg.lastChild ) {
        svg.removeChild( svg.lastChild );
    }
    window.cancelAnimationFrame(rid);
}

clearB.addEventListener("click", clearSVG );
moveB.addEventListener("click", moveCircles);
