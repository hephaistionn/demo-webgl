
Engine.prototype.startRender = function(){

    var gl = this.gl;
    var shader = this.shader;
    var meshVertices = this.meshVertices;
    var meshNormals = this.meshNormals;
    var meshUVs = this.meshUVs;
    var texture = this.texture;

    gl.useProgram(shader.program);
    gl.enableVertexAttribArray( shader.setAttributVertexPosition );
    gl.enableVertexAttribArray( shader.setAttributVertexNormal );
    gl.enableVertexAttribArray( shader.setAttributVertexUVs );

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

    var lightDirection = new Vector3(0.7,0.5,0.1);
    var lightColor = new Vector3(1,1,1);




    var draw = function(t){

        meshMatrix.makeRotationY(t/1000);

        gl.viewport(0, 0, 512, 512);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, meshVertices);
        gl.vertexAttribPointer(shader.setAttributVertexPosition, meshVertices.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, meshNormals);
        gl.vertexAttribPointer(shader.setAttributVertexNormal, meshNormals.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, meshUVs);
        gl.vertexAttribPointer(shader.setAttributVertexUVs, meshUVs.itemSize, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv( shader.setUniformVVMatrix, false, viewMatrix.elements );
        gl.uniformMatrix4fv( shader.setUniformPMatrix, false, projectionMatrix.elements );
        gl.uniformMatrix4fv( shader.setUniformVMatrix, false, meshMatrix.elements );

        gl.uniform3f( shader.setUniformLightDirection, parseFloat(lightDirection.x),parseFloat(lightDirection.y),parseFloat(lightDirection.z) );
        gl.uniform3f( shader.setUniformLightColor, parseFloat(lightColor.x),parseFloat(lightColor.y),parseFloat(lightColor.z) );

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(shader.samplerUniform, 0);

        gl.drawArrays(gl.TRIANGLES , 0, meshVertices.numItems);

    };

    var render = function(){
        draw(performance.now());
        requestAnimationFrame(render);
    };

    render();
};