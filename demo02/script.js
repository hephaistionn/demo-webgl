addEventListener('load',function(){

    var engine = new Engine();

    engine.initCanvas();

    engine.initShaders();

    engine.initMeshs();

    engine.startRender();

});