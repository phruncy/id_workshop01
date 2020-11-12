/* An overview over lottie-web's key animating functions */

// base options for all animations
const defaultOptions  = {
    container: document.getElementById('loop'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './assets/triangle.json'
};

// pause and reset
const pauseOptions = {
    container: document.getElementById('play-pause'),
    loop: false,
    autoplay: false
};
let animPlayPause = lottie.loadAnimation({...defaultOptions,...pauseOptions});

// different speeds
const speedOptions = {
    container: document.getElementById('speed')
}
let animSpeed = lottie.loadAnimation({...defaultOptions, ...speedOptions});

// change direction
let direction = 1;
let animReverse = lottie.loadAnimation({...defaultOptions, ...{container: document.getElementById('reverse')}});

// segments
let segment = 0; // the current break point of the animation
let animSegment = lottie.loadAnimation({...defaultOptions, ...{container: document.getElementById('segment'), loop: false, autoplay: false}});

//// the input handlers ////
document.getElementById('play-button').addEventListener('click', () => {animPlayPause.play();});

// reset button
document.getElementById('reset').addEventListener('click', () => {
    animPlayPause.goToAndStop(0, true);
});

// reverse button
document.getElementById('reverse-btn').addEventListener('click', () => {
    direction *= -1;
    animReverse.setDirection(direction);
});

// segment button
document.getElementById('segment-btn').addEventListener('click', () => {
    const segmentOld = segment;
    segment = (segment + 10) % 50; // animation lentgh is 50 frames, reset after 50 frames
    // first parameter: [start, stop(excluded)]
    // second parameter: set to true if segment should be played immediatly
    animSegment.playSegments([segmentOld, segment], true);
});

// event that is dispatched every time the browser starts an animation frame
// when the animation is played in segments, currentFrame always contains the current frame of the segment
animSegment.addEventListener('enterFrame', () => {
    document.getElementById('segment-info').textContent = `Current Frame: ${segment + Math.floor(animSegment.currentFrame)}`;
});

// speed slider
const slider = document.getElementById('slider');
slider.addEventListener('input', () => {
    animSpeed.setSpeed(slider.value);
    document.getElementById('slider-label').textContent = `animation speed: ${slider.value}`;
});


