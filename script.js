
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

        // Change from the original donut to the different donut
        mainDonut.querySelector("img").src = "assets/donut2.png";
        mainDonut.querySelector("img").removeAttribute("id");

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


// PANEL 3: DONUT POV

const doughImages = [
    "assets/dough2.PNG",
    "assets/dough1.PNG",
    "assets/dough3.PNG"
];

let doughStage = 0;

const doughImage = document.querySelector("#doughImage");
const doughInstruction = document.querySelector("#doughInstruction");
const povClickArea = document.querySelector("#povClickArea");

povClickArea.addEventListener("click", () => {

    if (doughStage >= 2) return;

    doughStage++;

    // Change to the next image
    doughImage.src = doughImages[doughStage];

    // Small impact animation
    gsap.fromTo(doughImage,
        { scale: 1.03 },
        { scale: 1, duration: 0.25 }
    );

    if (doughStage === 1) {
        doughInstruction.textContent =
            "CLICK AGAIN TO CUT!";
    }

    if (doughStage === 2) {

        doughInstruction.style.display = "none";
        povClickArea.style.display = "none";

        const success = document.querySelector("#doughSuccess");
        const nextButton = document.querySelector("#toPanel4");

        success.style.display = "block";
        nextButton.style.display = "block";

        gsap.from(success, {
            opacity: 0,
            y: 20,
            duration: 0.5
        });
    }
});

// Continue to Panel 4
document.querySelector("#toPanel4").addEventListener("click", () => {
    document.querySelector("#panel4").scrollIntoView({
        behavior: "smooth"
    });
});



// PANEL 4: THE CUTTING ANIMATION

const cuttingDonut = document.querySelector("#cuttingDonut");
const cutInstruction = document.querySelector("#cutInstruction");
const jamSplash = document.querySelector("#jamSplash");

let cutStage = 0;

cuttingDonut.addEventListener("click", () => {

    if (cutStage === 0) {

        // First push
        cutStage = 1;

        cuttingDonut.src = "assets/2ndcut.png";

        cutInstruction.textContent = "ONE MORE PUSH!";

        gsap.fromTo(cuttingDonut,
            { scale: 1.05 },
            { scale: 1, duration: 0.3 }
        );

    } else if (cutStage === 1) {

        // Second push: THE EXPLOSION
        cutStage = 2;

        cuttingDonut.src = "assets/thirdcut.png";

        cutInstruction.style.display = "none";
        cuttingDonut.style.pointerEvents = "none";

        const explosion = gsap.timeline();

        // Donut shakes
        explosion.to(cuttingDonut, {
            x: 20,
            rotation: 5,
            duration: 0.05,
            repeat: 9,
            yoyo: true
        });

        // Donut zooms forward
        explosion.to(cuttingDonut, {
            scale: 1.4,
            duration: 0.3
        });

        // Jam splash appears
        explosion.set(jamSplash, {
            visibility: "visible"
        });

        explosion.fromTo(jamSplash,
            {
                opacity: 0,
                scale: 0.2
            },
            {
                opacity: 1,
                scale: 1.5,
                duration: 0.5,
                ease: "power3.out"
            }
        );

        // Hold the splash
        explosion.to({}, {
            duration: 1
        });

        // Fade the screen to black
        explosion.to("#panel4", {
            backgroundColor: "#000000",
            duration: 0.5
        });

        explosion.to(jamSplash, {
            opacity: 0,
            duration: 0.5
        });

        // Move to Panel 5
        explosion.call(() => {
            document.querySelector("#panel5").scrollIntoView({
                behavior: "smooth"
            });
        });

    }

});


// PANEL 5: THE DONUT MELTING

let meltingStarted = false;

document.querySelector("#checkBtn")?.addEventListener("click", () => {

    // Play the melting animation only once
    if (meltingStarted) return;

    meltingStarted = true;

    // Fade the half-melted donut into the fully melted donut
    gsap.to("#donut5", {
        opacity: 0,
        duration: 3,
        ease: "power1.inOut"
    });

    gsap.to("#donut5Melted", {
        opacity: 1,
        duration: 3,
        ease: "power1.inOut"
    });

    // Fade the initial jam into the final jam at the same speed
    gsap.to("#initialJam", {
        opacity: 0,
        duration: 3,
        ease: "power1.inOut"
    });

    gsap.to("#finalJam5", {
        opacity: 1,
        duration: 3,
        ease: "power1.inOut"
    });

    // Reveal the comic-style message
    const message = document.querySelector("#message5");
    message.style.display = "block";

    gsap.fromTo(message,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power1.out"
        }
    );

});


// PANEL 6: RESTART STORY

document.querySelector("#restartBtn")?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
