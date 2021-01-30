Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_image(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="snapshot_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KGzGuMFIR/model.json' , modelLoaded);

function modelLoaded(){
    console.log("Model Loaded !");
}

function check_image(){
    img = document.getElementById("snapshot_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("objectTxt").innerHTML = results[0].label;
        document.getElementById("AccuracyTxt").innerHTML = results[0].confidence.toFixed(3);
    }
}