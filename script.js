
// REGISTER GSAP SCROLLTRIGGER

gsap.registerPlugin(ScrollTrigger);


// FUNCTION TO SHOW HIDDEN MESSAGES

function showMessage(id) {
    const message = document.querySelector(id);

    if (!message) return;

    message.style.display = "block";

    gsap.from(message, {
        opacity: 0,
        y: 20,
        duration: 0.5
    });
}


// START STORY BUTTON

document.querySelector("#startBtn")?.addEventListener("click", () => {

    document.querySelector("#panel1").scrollIntoView({
        behavior: "smooth"
    });

});


// PANEL 1: FIND THE DONUT

const mainDonut = document.querySelector("#mainDonut");
const donutThought = document.querySelector("#donutThought");

if (mainDonut && donutThought) {

    mainDonut.addEventListener("click", () => {

        // Show her thought bubble
        donutThought.style.display = "block";

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

        // Make her shake a little
        gsap.fromTo(mainDonut,
            {
                rotation: -5
            },
            {
                rotation: 5,
                duration: 0.2,
                repeat: 3,
                yoyo: true
            }
        );

    });

}


// PANEL 2: THE DONUT'S THOUGHTS

const thinkingDonut = document.querySelector("#thinkingDonut");
const thoughts = document.querySelectorAll(".thought");

let thoughtsClicked = 0;

thoughts.forEach(thought => {

    thought.addEventListener("click", () => {

        // Don't count the same thought twice
        if (thought.classList.contains("clicked")) return;

        thought.classList.add("clicked");

        thoughtsClicked++;

        // Make the thought bubble pop
        gsap.fromTo(thought,
            {
                scale: 1
            },
            {
                scale: 1.15,
                duration: 0.2,
                repeat: 1,
                yoyo: true
            }
        );

        // Make the donut react
        if (thinkingDonut) {

            gsap.fromTo(thinkingDonut,
                {
                    rotation: -4
                },
                {
                    rotation: 4,
                    duration: 0.2,
                    repeat: 3,
                    yoyo: true
                }
            );

        }

        // After all three thoughts have been clicked
        if (thoughtsClicked === 3) {

            // Darken the classroom
            document.querySelector("#panel2")
                .classList.add("decision-made");

            // Change from worried to confident
            
            if (thinkingDonut) {

                // Change to the confident donut immediately
                thinkingDonut.src = "assets/donut3.png";

                // Animate the new donut
                gsap.fromTo(thinkingDonut,
                    {
                        opacity: 0,
                        scale: 0.8,
                        rotation: -5
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        duration: 0.7,
                        ease: "back.out(1.7)"
                    }
                );

                // Make the cutter appear
                gsap.to("#handCutter", {
                    opacity: 1,
                    duration: 0.7
                });

            }

            // Show the final decision
            const finalThought =
                document.querySelector("#finalThought");

            const nextButton =
                document.querySelector("#nextPanelBtn");

            if (finalThought) {

                finalThought.style.display = "block";

                gsap.from(finalThought, {
                    opacity: 0,
                    y: 30,
                    duration: 0.7
                });

            }

            if (nextButton) {
                nextButton.style.display = "block";
            }

        }

    });

});


// CONTINUE FROM PANEL 2 TO PANEL 3

document.querySelector("#nextPanelBtn")?.addEventListener("click", () => {

    document.querySelector("#panel3").scrollIntoView({
        behavior: "smooth"
    });

});


// PANEL 3: PICK UP THE CUTTER

document.querySelector("#cutterBtn")?.addEventListener("click", () => {

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

document.querySelector("#explodeBtn")?.addEventListener("click", () => {

    if (exploding) return;

    exploding = true;

    const overlay = document.querySelector("#explosionOverlay");

    const boom = gsap.timeline({
        onComplete: () => {
        thinkingDonut.src = "assets/donut3.png";

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

document.querySelector("#checkBtn")?.addEventListener("click", () => {

    showMessage("#message5");

    gsap.to("#sadDonut", {
        rotation: 4,
        duration: 0.15,
        repeat: 5,
        yoyo: true
    });

});



// PANEL 6: RESTART STORY

document.querySelector("#restartBtn")?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
