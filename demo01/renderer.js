
Engine.prototype.startRender = function(){

    var gl = this.gl;
    var shader = this.shader;
    var mesh = this.mesh;

    gl.useProgram(shader.program);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

     var meshMatrix = new Matrix4();
     var viewMatrix = new Matrix4();
     var projectionMatrix = new Matrix4();

     meshMatrix.setPosition( new Vector3(0,0,0) );
     viewMatrix.setPosition( new Vector3(5,5,5) );
     viewMatrix.lookAt( new Vector3(0,0,0) );
     projectionMatrix.makePerspective( 60, 1, 0.01, 1000 );
     viewMatrix.getInverse( viewMatrix );

    var draw = function(){

        gl.viewport(0, 0, 512, 512);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, mesh);
        gl.vertexAttribPointer(shader.setAttributVertex, mesh.itemSize, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv( shader.setUniformVVMatrix, false, viewMatrix.elements );
        gl.uniformMatrix4fv( shader.setUniformPMatrix, false, projectionMatrix.elements );
        gl.uniformMatrix4fv( shader.setUniformVMatrix, false, meshMatrix.elements );

        gl.drawArrays(gl.TRIANGLES , 0, mesh.numItems);

    };

    var render = function(){
        draw();
        requestAnimationFrame(render);
    };

    render();
};