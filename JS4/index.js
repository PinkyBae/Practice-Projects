window.addEventListener('load', () => {
    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll(".pads div");
    const visual = document.querySelector(".visual");
    const colors = [
        "#60d394",
        "#d36060",
        "#c0d0d3",
        "#d3d160",
        "#6860d3",
        "#60b2d3"
    ];

    //sounds
    pads.forEach((pad, index) =>{
        pad.addEventListener('click', function(){
            sounds[index].currentTime = 0;  //To play without waiting for audio to end
            sounds[index].play();

            createBubbles(index);
        })
    });

    //create bubbles
    const createBubbles = (tempIndex) => {
        const bubble = document.createElement("div");
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[tempIndex];
        bubble.style.animation = "jump 1s ease";
        bubble.addEventListener('animationend',function(){
            visual.removeChild(this);
        })
    }
})