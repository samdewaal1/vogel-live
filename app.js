const image = document.getElementById("image");


const result = document.getElementById("result");
const probability = document.getElementById("probability");

const result2 = document.getElementById("result2");
const probability2 = document.getElementById("probability2");

// Image classification webcam

ml5.imageClassifier('./model/model.json')
    .then(classifier => classifier.classify(image,output))
    .then(results => {
        result.innerText = results[0].label;
        probability.innerText = results[0].confidence.toFixed(4);
    });

    const video = document.getElementById("video");
    const output = document.getElementById("output");
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      video.srcObject = stream;
      video.play();
    
    });
    ml5.imageClassifier('./model/model.json')
    .then(classifier => classifier.classify())
    .then(results => {
        result.innerText = results[0].label;
        probability.innerText = results[0].confidence.toFixed(4);
    });


    const loop = classifier => {
      classifier.classify().then(results => {
        document.getElementById("result").innerHTML = results[0].label;
        document.getElementById("probability").innerHTML = results[0].confidence.toFixed(4);
        
        loop(classifier); 
      });
      
      
    };
    ml5.imageClassifier('./model/model.json', video, output).then(classifier => loop(classifier));

    // Image classification uploaded file

    ml5.imageClassifier('./model/model.json')
    .then(classifier => classifier.classify(output))
    .then(results => {
      result2.innerText = results[0].label;
      probability2.innerText = results[0].confidence.toFixed(4);
      const loop = classifier => {
          classifier.classify().then(results => {
            document.getElementById("result2").innerHTML = results[0].label;
            document.getElementById("probability2").innerHTML = results[0].confidence.toFixed(4);
            
            loop(classifier); 
            ml5.imageClassifier('./model/model.json',  output).then(classifier => loop(classifier));
          });
          
          
        };
        
  });