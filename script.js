
// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


// FUNCTION TO SHOW HIDDEN MESSAGES

function showMessage(id) {
    const message = document.querySelector(id);

    message.style.display = "block";

    gsap.from(message, {
        opacity: 0,
        y: 20,
        duration: 0.5
    });
}


// START STORY BUTTON

document.querySelector("#startBtn").addEventListener("click", () => {
    document.querySelector("#panel1").scrollIntoView({
        behavior: "smooth"
    });
});


// PANEL 1: FIND THE DONUT

const mainDonut = document.querySelector("#mainDonut");
const donutThought = document.querySelector("#donutThought");

// When the donut is clicked
mainDonut.addEventListener("click", () => {

    // Show the thought bubble
    donutThought.style.display = "block";

    // Animate the thought bubble
    gsap.fromTo(donutThought,
        {
            opacity: 0,
            scale: 0.5
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        }
    );

    // Make the donut react
    gsap.to(mainDonut, {
        rotation: 10,
        duration: 0.2,
        repeat: 3,
        yoyo: true
    });

});

// PANEL 1: SCROLL ANIMATION

gsap.fromTo(".classroom-title",
    {
        opacity: 0,
        y: -50
    },
    {
        opacity: 1,
        y: 0,
        duration: 1,

        scrollTrigger: {
            trigger: "#panel1",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    }
);

// PANEL 2: CHEER HER UP

document.querySelector("#cheerBtn").addEventListener("click", () => {

    showMessage("#message2");

    gsap.to("#happyDonut", {
        y: -35,
        rotation: 10,
        duration: 0.35,
        yoyo: true,
        repeat: 3,
        ease: "power2.out"
    });

});


// PANEL 3: PICK UP THE CUTTER

document.querySelector("#cutterBtn").addEventListener("click", () => {

    showMessage("#message3");

    gsap.to("#cutter", {
        rotation: 20,
        y: -30,
        duration: 0.25,
        yoyo: true,
        repeat: 5
    });

});


// PANEL 4: DRAMATIC EXPLOSION

let exploding = false;

document.querySelector("#explodeBtn").addEventListener("click", () => {

    if (exploding) return;

    exploding = true;

    const overlay = document.querySelector("#explosionOverlay");

    const boom = gsap.timeline({
        onComplete: () => {
            exploding = false;

            document.querySelector("#panel5").scrollIntoView({
                behavior: "smooth"
            });
        }
    });

    // Show the overlay
    boom.set(overlay, {
        visibility: "visible",
        pointerEvents: "auto"
    });

    // Dramatic pause
    boom.to({}, {
        duration: 0.6
    });

    // Screen flash
    boom.to(overlay, {
        opacity: 1,
        duration: 0.08
    });

    // Explosion grows
    boom.fromTo(".explosion-content",
        {
            scale: 0.1,
            rotation: -20
        },
        {
            scale: 1.4,
            rotation: 8,
            duration: 0.55,
            ease: "back.out(2)"
        }
    );

    // Shake the explosion
    boom.to(".explosion-content", {
        x: 35,
        rotation: -8,
        duration: 0.06,
        repeat: 9,
        yoyo: true
    });

    // Hold explosion
    boom.to({}, {
        duration: 0.8
    });

    // Fade away
    boom.to(overlay, {
        opacity: 0,
        duration: 1
    });

    // Hide overlay
    boom.set(overlay, {
        visibility: "hidden",
        pointerEvents: "none"
    });

});


// PANEL 5: CHECK ON HER

document.querySelector("#checkBtn").addEventListener("click", () => {

    showMessage("#message5");

    gsap.to("#sadDonut", {
        rotation: 4,
        duration: 0.15,
        repeat: 5,
        yoyo: true
    });

});


// PANEL 6: RESTART STORY

document.querySelector("#restartBtn").addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
