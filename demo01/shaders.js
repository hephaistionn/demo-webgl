
Engine.prototype.initShaders = function() {

    var gl = this.gl;

    /*------------------------------------------------------------------------------*/
    /*---------------------prepare VertexShader and FragmentShader------------------*/
    /*------------------------------------------------------------------------------*/

    //GLSL

    var vertexShaderCode = ''
        +'  attribute vec3 aVertexPosition;  '
        +'  uniform mat4 modelMatrix;  '
        +'  uniform mat4 viewMatrix;  '
        +'  uniform mat4 projectionMatrix;  '
        +'  void main(void) {  '
        +'    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);  '
        +'  }  ';

    var pixelShader = ''
        +'  precision mediump float;  '
        +'  void main(void) {  '
        +'      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);  '
        +'  }  ';


    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, pixelShader);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {alert('fragment : '+gl.getShaderInfoLog(fragmentShader));}


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {alert('vertex : '+gl.getShaderInfoLog(vertexShader));}


    /*------------------------------------------------------------------------------*/
    /*---------------------new shader-----------------------------------------------*/
    /*------------------------------------------------------------------------------*/

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader );
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    /*------------------------------------------------------------------------------*/
    /*---------------------Build Uniforms And Attributes----------------------------*/
    /*------------------------------------------------------------------------------*/

    var shader = {};
    shader.program = program;
    shader.setAttributVertex = gl.getAttribLocation( program, "aVertexPosition" );
    gl.enableVertexAttribArray(program.setAttributVertex);
    shader.setUniformVVMatrix = gl.getUniformLocation( program, "viewMatrix" );
    shader.setUniformVMatrix = gl.getUniformLocation( program, "modelMatrix" );
    shader.setUniformPMatrix = gl.getUniformLocation( program, "projectionMatrix" );
    //shader.setUniformOpacity = gl.getUniformLocation( program, "opacity" );

    this.shader = shader;

};
