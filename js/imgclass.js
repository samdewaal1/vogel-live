// Grab elements, create settings, etc.
const video = document.getElementById("video");
// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});

const loop = classifier => {
  
  classifier.classify().then(results => {
    document.getElementById("result").innerHTML = results[0].label;
    document.getElementById("probability").innerHTML = results[0].confidence.toFixed(4)*100+"%";
    loop(classifier); // Call again to create a loop
    
  });
};
ml5.imageClassifier('./model/model.json', video).then(classifier => loop(classifier));
let counterContainer = document.querySelector(".website-counter");
let resetButton = document.querySelector("#reset");
let visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;




resetButton.addEventListener("click", () => {
  visitCount = 0;
  localStorage.setItem("page_view", 0);
  counterContainer.innerHTML = visitCount;
});

document.getElementById("myButton").onclick = function () {
    location.href = "http://localhost:5501/index.html";
};



// second argument and the getClassification function as the third
