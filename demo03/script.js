addEventListener('load',function(){

    engine = new Engine();

    engine.initCanvas();

    engine.initShaders();

    engine.initTextures();

    engine.initMeshs();

    engine.startRender();

});