addEventListener('load',function(){

    engine = new Engine();

    engine.initCanvas();

    engine.initShaders();

    engine.initMeshs();

    engine.startRender();

});