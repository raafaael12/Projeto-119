var segundos = 0;
function setup(){
    canvas = createCanvas(400,300)
    canvas.position(480,250);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    var synth = window.speechSynthesis;
}
function preload(){
    classifier = ml5.imageClassifier('DoodleNet'); 
}
function clearCanvas(){
    background('white')
}
function draw(){
    strokeWeight(10);
    stroke('black');
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
    if(frameCount % 60 == 0){
        segundos = segundos + 1;
        document.getElementById("tempo").innerHTML = "Tempo: " + segundos;
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult)
}
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    console.log(results);
    var result = results[0].label;
    document.getElementById('label').innerHTML = 'Nome: ' + result.replace('_','');
    document.getElementById('confidence').innerHTML = 'Precisão: ' + Math.round(results[0].confidence * 100) + '%';
}