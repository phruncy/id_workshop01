// directly access a DOM element through its id
const greeting = document.getElementById('greeting');
const clickButton = document.getElementById('click-button');
const animationContainer = document.getElementById('animation-container');

// the first parameter is the name of the event
// the second parameter (callback) is the function that is executed when the event is fired by the browser
clickButton.addEventListener('click', () => {
    greeting.textContent = "Congrats, you've clicked!";
});

// an options-object required by lottie's loadAnimation function
const options = {
    container: animationContainer, // reference to the container DOM element
    render: 'svg',
    loop: true, 
    autoplay: false, // if true, animation start immediatly after loading
    path: './assets/circle_animation.json' // path to the animation data
}


// creates creates an <svg> tag from the json data
const animation = lottie.loadAnimation(options);

// play the mouse enters the animation area
animationContainer.addEventListener('mouseenter', () => {
    animation.play();
});

// pause when the animation area is left
animationContainer.addEventListener('mouseleave', () => {
    animation.pause();
});

let loopcount = 0;
animation.addEventListener('loopComplete', () => {
    loopcount++;
    // the ${} will resolve to the value of the variable inside the {} 
    document.getElementById('status-bar').textContent = `loops: ${loopcount}`;
})