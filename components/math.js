
Math.PI2 =  Math.PI * 2;

Math.clamp =  function ( x, a, b ) {

    return ( x < a ) ? a : ( ( x > b ) ? b : x );

};

Math.clampBottom =  function ( x, a ) {

    return x < a ? a : x;

};

Math.mapLinear =  function ( x, a1, a2, b1, b2 ) {

    return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

};

Math.smoothstep =  function ( x, min, max ) {

    if ( x <= min ) return 0;
    if ( x >= max ) return 1;

    x = ( x - min )/( max - min );

    return x*x*(3 - 2*x);

};

Math.smootherstep =  function ( x, min, max ) {

    if ( x <= min ) return 0;
    if ( x >= max ) return 1;

    x = ( x - min )/( max - min );

    return x*x*x*(x*(x*6 - 15) + 10);

};

Math.random16 = function () {

    return ( 65280 * this.random() + 255 * this.random() ) / 65535;

};

Math.randInt = function ( low, high ) {

    return low + this.floor( this.random() * ( high - low + 1 ) );

};

// Random float from <low, high> interval

Math.randFloat =  function ( low, high ) {

    return low + this.random() * ( high - low );

};

// Random float from <-range/2, range/2> interval

Math.randFloatSpread =  function ( range ) {

    return range * ( 0.5 - this.random() );

};

Math.sign = function ( x ) {

    return ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );

};

Math.degToRad = function() {
    var degreeToRadiansFactor = Math.PI / 180;
    return function ( degrees ) {
        return degrees * degreeToRadiansFactor;
    };

}();


Math.getSmallestSquare = function ( x ) {

    var v = 1;
    var c = 1;
    var result;
    var i = 14;
    while(i--){
        c = c*2;
        v = x/c;

        if(v<1){
            return c/2;
        }

    }

};


Math.getUtmostSquare = function ( x ) {

    var v = 1;
    var c = 1;
    var result;
    var i = 14;
    while(i--){
        c = c*2;
        v = x/c;

        if(v<1){
            return c;
        }

    }

};

Math.getNearestSquare = function ( x ) {

    var v = 1;
    var c = 1;
    var result;
    var i = 14;
    while(i--){
        c = c*2;
        v = x/c;

        if(v<1){
            if(this.abs(x-c)>this.abs(x-c/2))
                return c/2;
            else
                return c;
        }
    }

};

Math.subAngle = function(a1,a2){

    var a = a1-a2;

    if (a>Math.PI)
        return a - Math.PI2;

    if (a<-Math.PI)
        return a + Math.PI2;

    return a;

};


Math.to2KPI = function(a){

    var a = a%Math.PI2;
    if(a<0){
        return a+Math.PI2;
    }else{
        return a;
    }
}




Math.radToDeg = function() {

    var radianToDegreesFactor = 180 / Math.PI;

    return function ( radians ) {

        return radians * radianToDegreesFactor;

    };

}();


//	var surface = {x:0,y:0,z:0,dx:0,dy:1,dz:0}
Math.intersectionLinePlane = function ( point, direction, surface) {

    k = -(-(surface.x * surface.dx + surface.y * surface.dy + surface.z * surface.dz) + surface.dx * point.x + surface.dy * point.y + surface.dz * point.z) / (surface.dx * direction.x + surface.dy *
    direction.y + surface.dz * direction.z);

    return new Engine.Vector3(point.x + direction.x * k, point.y + direction.y * k, point.z + direction.z * k )

};

Math.intersectionSegSeg = function ( ax, ay, bx, by, cx, cy, dx, dy) {

    var abx = bx - ax;
    var aby = by - ay;
    var cdx = dx - cx;
    var cdy = dy - cy;

    var d = abx*cdy - aby*cdx;
    if ( d == 0) return false;

    var t1 = -((ax - cx)*cdy - (ay - cy)*cdx)/d;
    if (t1 < 0 || t1 > 1) return false;

    var t2 = ((cx - ax)*aby - (cy - ay)*abx)/d;
    if (t2 < 0 || t2 > 1) return false;

    return true;
    //return new [ax + t2*(bx - ax), ay + t1*(by - ay)];

}


Math.intersectionSegBox = function ( ax, ay, bx, by, xmin, xmax, ymin, ymax) {

    var intersection = false;
    if(this.intersectionSegSeg(ax,ay,bx,by,  xmin,ymin,xmax,ymin ))return true;
    if(this.intersectionSegSeg(ax,ay,bx,by,  xmin,ymax,xmax,ymax ))return true;
    if(this.intersectionSegSeg(ax,ay,bx,by,  xmin,ymin,xmin,ymax ))return true;
    if(this.intersectionSegSeg(ax,ay,bx,by,  xmax,ymin,xmax,ymax ))return true;

    return false;
};
