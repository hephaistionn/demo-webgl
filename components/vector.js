Vector3 = function ( x, y, z ) {

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;

};

Vector3.prototype = {

    constructor: Vector3,

    set: function ( x, y, z ) {

        this.x = x;
        this.y = y;
        this.z = z;

        return this;

    },

    setX: function ( x ) {

        this.x = x;

        return this;

    },

    setY: function ( y ) {

        this.y = y;

        return this;

    },

    setZ: function ( z ) {

        this.z = z;

        return this;

    },

    setComponent: function ( index, value ) {

        switch ( index ) {

            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            default: throw new Error( "index is out of range: " + index );

        }

    },

    getComponent: function ( index ) {

        switch ( index ) {

            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error( "index is out of range: " + index );

        }

    },

    copy: function ( v ) {

        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;

    },

    add: function ( v ) {

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;

    },

    addScalar: function ( s ) {

        this.x += s;
        this.y += s;
        this.z += s;

        return this;

    },

    addVectors: function ( a, b ) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;

        return this;

    },

    sub: function ( v) {

        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;

    },

    subVectors: function ( a, b ) {

        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;

        return this;

    },

    subVectorsXZ: function ( a, b ) {

        this.x = a.x - b.x;
        this.z = a.z - b.z;

        return this;

    },

    multiply: function ( v ) {

        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;

        return this;

    },

    multiplyScalar: function ( scalar ) {

        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;

    },

    multiplyVectors: function ( a, b ) {

        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;

        return this;

    },

    applyMatrix3: function ( m ) {

        var x = this.x;
        var y = this.y;
        var z = this.z;

        var e = m.elements;

        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;

        return this;

    },

    applyMatrix4: function ( m ) {

        var x = this.x, y = this.y, z = this.z;

        var e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8]  * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9]  * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

        return this;

    },

    applyMatrix3of4: function ( m ) {

        var x = this.x, y = this.y, z = this.z;

        var e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8]  * z ;
        this.y = e[1] * x + e[5] * y + e[9]  * z ;
        this.z = e[2] * x + e[6] * y + e[10] * z ;

        return this;

    },

    applyProjection: function ( m ) {

        // input: Matrix4 projection matrix

        var x = this.x, y = this.y, z = this.z;

        var e = m.elements;
        var d = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] ); // perspective divide

        this.x = ( e[0] * x + e[4] * y + e[8]  * z + e[12] ) * d;
        this.y = ( e[1] * x + e[5] * y + e[9]  * z + e[13] ) * d;
        this.z = ( e[2] * x + e[6] * y + e[10] * z + e[14] ) * d;

        return this;

    },

    applyQuaternion: function ( q ) {

        var x = this.x;
        var y = this.y;
        var z = this.z;

        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;

        // calculate quat * vector

        var ix =  qw * x + qy * z - qz * y;
        var iy =  qw * y + qz * x - qx * z;
        var iz =  qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return this;

    },

    transformDirection: function ( m ) {

        // input: Matrix4 affine matrix
        // vector interpreted as a direction

        var x = this.x, y = this.y, z = this.z;

        var e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8]  * z;
        this.y = e[1] * x + e[5] * y + e[9]  * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;

        this.normalize();

        return this;

    },

    divide: function ( v ) {

        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;

        return this;

    },

    divideScalar: function ( scalar ) {

        if ( scalar !== 0 ) {

            var invScalar = 1 / scalar;

            this.x *= invScalar;
            this.y *= invScalar;
            this.z *= invScalar;

        } else {

            this.x = 0;
            this.y = 0;
            this.z = 0;

        }

        return this;

    },

    min: function ( v ) {

        if ( this.x > v.x ) {

            this.x = v.x;

        }

        if ( this.y > v.y ) {

            this.y = v.y;

        }

        if ( this.z > v.z ) {

            this.z = v.z;

        }

        return this;

    },

    max: function ( v ) {

        if ( this.x < v.x ) {

            this.x = v.x;

        }

        if ( this.y < v.y ) {

            this.y = v.y;

        }

        if ( this.z < v.z ) {

            this.z = v.z;

        }

        return this;

    },

    clamp: function ( min, max ) {

        if ( this.x < min.x ) {

            this.x = min.x;

        } else if ( this.x > max.x ) {

            this.x = max.x;

        }

        if ( this.y < min.y ) {

            this.y = min.y;

        } else if ( this.y > max.y ) {

            this.y = max.y;

        }

        if ( this.z < min.z ) {

            this.z = min.z;

        } else if ( this.z > max.z ) {

            this.z = max.z;

        }

        return this;

    },

    negate: function () {

        return this.multiplyScalar( - 1 );

    },

    dot: function ( v ) {

        return this.x * v.x + this.y * v.y + this.z * v.z;

    },

    lengthSq: function () {

        return this.x * this.x + this.y * this.y + this.z * this.z;

    },

    lengthSqXZ: function () {

        return this.x * this.x  + this.z * this.z;

    },

    length: function () {

        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

    },

    lengthManhattan: function () {

        return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

    },

    normalize: function () {

        return this.divideScalar( this.length() );

    },

    setLength: function ( l ) {

        var oldLength = this.length();

        if ( oldLength !== 0 && l !== oldLength  ) {

            this.multiplyScalar( l / oldLength );
        }

        return this;

    },

    lerp: function ( v, alpha ) {

        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;
        this.z += ( v.z - this.z ) * alpha;

        return this;

    },

    cross: function ( v ) {

        var x = this.x, y = this.y, z = this.z;

        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;

        return this;

    },

    crossVectors: function ( a, b ) {

        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;

        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;

        return this;

    },

    distanceTo: function ( v ) {

        return Math.sqrt( this.distanceToSq( v ) );

    },

    distanceToXZ: function ( v ) {
        var dx = this.x - v.x;
        var dz = this.z - v.z;
        return Math.sqrt( dx * dx + dz * dz );
    },

    distanceToSq: function ( v ) {

        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;

        return dx * dx + dy * dy + dz * dz;

    },

    distanceToSqXZ: function ( v ) {
        var dx = this.x - v.x;
        var dz = this.z - v.z;
        return dx * dx + dz * dz;
    },

    setFromMatrixPosition: function ( m ) {

        this.x = m.elements[ 12 ];
        this.y = m.elements[ 13 ];
        this.z = m.elements[ 14 ];

        return this;

    },

    setFromMatrixScale: function ( m ) {

        var sx = this.set( m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ] ).length();
        var sy = this.set( m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ] ).length();
        var sz = this.set( m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ] ).length();

        this.x = sx;
        this.y = sy;
        this.z = sz;

        return this;
    },

    setFromMatrixColumn: function ( index, matrix ) {

        var offset = index * 4;

        var me = matrix.elements;

        this.x = me[ offset ];
        this.y = me[ offset + 1 ];
        this.z = me[ offset + 2 ];

        return this;

    },

    equals: function ( v ) {

        return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

    },

    fromArray: function ( array ) {

        this.x = array[ 0 ];
        this.y = array[ 1 ];
        this.z = array[ 2 ];

        return this;

    },

    toArray: function () {

        return [ this.x, this.y, this.z ];

    },

    clone: function () {

        return new Vector3( this.x, this.y, this.z );

    },


    cartToPolar: function () {

        var polar = {};

        polar.radius = this.length();

        polar.angle1 = Math.asin( this.y / polar.radius );

        if (this.x == 0 && this.z == 0) this.x = 0.001;

        if (this.z < 0)
            polar.angle2 = (2 * Math.PI - Math.acos(this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.z, 2))));
        else
            polar.angle2 = (Math.acos(this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.z, 2))));

        return polar;

    },

    polarToCart: function (angle1, angle2, ray) {

        this.x = ray * Math.cos(angle1) * Math.cos(angle2);
        this.z = ray * Math.cos(angle1) * Math.sin(angle2);
        this.y = ray * Math.sin(angle1);

        return this;
    },


    angleTo: function (point) {
        var x = point.x-this.x;
        var z = point.z-this.z;
        if (z < 0)
            return  (2 * Math.PI - Math.acos(x / Math.sqrt(x*x+z*z)));
        else
            return (Math.acos(x / Math.sqrt(x*x+z*z)));
    },

    angle: function (  ) {
        if (this.x == 0 && this.z == 0) return 0;

        if (this.z < 0)
            return  (2 * Math.PI - Math.acos(this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.z, 2))));
        else
            return (Math.acos(this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.z, 2))));

    },

    rotateXZ: function ( da ) {
        var a = this.angle();
        a+=da;
        var m =this.length();
        this.x = m*Math.cos(a);
        this.z = m*Math.sin(a);
        return this;
    }
};