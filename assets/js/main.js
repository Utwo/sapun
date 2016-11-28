var scoreElement = document.getElementById('score');
var wrapElement = document.getElementById('wrap');
var bubbleElement = document.getElementById('bubble');
var upFrontElement = document.getElementById('upfront');
var score = window.localStorage.getItem("score") || 0;
scoreElement.innerHTML = score;
var scale = 1;

var hammerTime = new Hammer(upFrontElement);
var rand;
var bubble;

hammerTime.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
hammerTime.on('swipe', function (ev) {
    scale -= 0.002;
    wrapElement.style.transform = 'scale(' + scale + ')';
    scoreElement.textContent = ++score;

    rand = getRandomInt(1, 5);
    for (var i = 0; i < rand; i++) {
        bubble = addImage(scale);
        bubbleElement.appendChild(bubble);
    }

    if(score % 10 === 0){
        window.localStorage.setItem('score', score);
    }

    if (score === 400) {
        alert("Good job, you are clean now!");
        wrapElement.style.transform = 'scale(1)';
        scale = 1;
    }
});

function addImage(scale) {
    var bubble = document.createElement("i");
    var randomPos = getRandomInt(10,  90);
    bubble.className = 'bubble__item';
    bubble.style.top = randomPos + "%";
    bubble.style.left = randomPos + "%";
    setTimeout(function () {
        bubble.remove();
    }, 3000);
    return bubble;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

UpUp.start({
    'content-url': 'index.html',
    'assets': ['', 'css/style.min.css', 'js/main.min.js', 'img/soap.svg'],
    'service-worker-url': 'upup.sw.min.js'
});