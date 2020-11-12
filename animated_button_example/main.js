/**
 * A little more complex example of an animated interactive element to demonstrate multiple animations / input events on one element.
 * Because in this case, the area of the animation is much larger than the actual button, it has a separate trigger element in the size of the button.
 * It is positioned directly over the visible button and all event-listeners are attached to it.
 */
const animationContainer = document.getElementById('button-animation-container');
const trigger = document.getElementById('button-trigger');

const options = {
    container: animationContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: './assets/petButton.json'
};
const buttonAnimation = lottie.loadAnimation(options);

/* 
    The button has three different animations:
    1. 'waking up'
    2. falling asleep
    3. being excited
    
    All animated parts are exported in one JSON to have them in one animation object.
    The individual parts are accessed through  the .playSegments() method.
    All animation segments put in an object to have a name to reference them by 
    
    if the first value is larger than the last, it will play the animation backwards (the 'sleeping' is just awaking played backwards). Very handy when a dedicated 'backwards' animation would be overkill 
    
    the individual frame numbers are just taken directly from after effects
*/
 const segments = {
    awake: [0, 10],
    sleep: [10, 0],
    excite: [10, 45]
};


// 'wake up' animation on moving the mouse on the trigger
trigger.addEventListener('mouseenter', () => {
    const segment = [0, 10];
    buttonAnimation.playSegments(segments.awake, true);
});

let finishedClick = false;

// a longer 'excitement'-animation on clicking
trigger.addEventListener('click', () => {
    buttonAnimation.playSegments(segments.excite, true);
    finishedClick = true;
});

// sleeping (reversed wake up) on removing the mouse from the trigger
trigger.addEventListener('mouseleave', () => {
    // this animation will only play if the last animation was not the click animation
    if (!finishedClick) {
        buttonAnimation.playSegments(segments.sleep, true);
    }
    finishedClick = false;
});






