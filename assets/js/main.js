// Made by Nathan Choi

// MAIN
(function () {


    let confetti = new Confetti("type-cursor")
    confetti.setPower(20)
    confetti.setCount(1)
    confetti.destroyTarget(false)

    let scroll = new SmoothScroll('a[href*="#"]', {
        speed: 900,
        speedAsDuration: true,
        easing: "easeInOutCubic"
    });

    anime({
        targets: ".text-bg",
        easing: "spring(1, 90, 90, 0)",
        duration: 1500,
        opacity: [0, 0.1],
        translateY: ["50px", "0%"]
    });

    anime({
        targets: ".reveal",
        easing: "spring(1, 90, 12, 0)",
        duration: 1500,
        opacity: [0, 1],
        translateY: ["100%", "0"],
        delay: anime.stagger(55, { start: 500 })
    });

    anime({
        targets: ".cursor",
        easing: "spring(1, 90, 12, 0)",
        duration: 1500,
        opacity: [0, 1],
        delay: 1500
    })

    const TEXT = (
        `Hello, my name is Nathan Choi. I am a full-stack engineer focusing on solving real problems with web and mobile applications. <br /> (scroll down :down-arrow:) `
    );

    var letterIndex = 0;
    var transferred = false; // If user has been forced to scroll

    // Updates the text based on letterIndex
    const update = () => {
        if (letterIndex == 0) {
            document.getElementById("bongo").setAttribute("src", "/assets/images/bongo/bongo_raised.png");
            return document.querySelector(".text").innerHTML = `
                <span class="type-something">
                    <span>
                        <span class='word'>Test</span>
                    </span>
                    <span>
                        <span class='word'>out</span>
                    </span>
                    <span>
                        <span class='word'>your</span>
                    </span>
                    <span>
                        <span class='word'>keyboard...</span>
                    </span>
                </span>
            `;
        }

        // Don't allow index to go past last char
        const end = Math.min(letterIndex, TEXT.length);

        textHTML = TEXT.substring(0, end)
            .replace("<", "<code>&lt;")
            .replace("> ", "&gt;</code>")
            .replace("&lt;br /&gt;", "<br><br>")
            .replaceAll("#", "<br><br>< class=special>")
            .replace(":down-arrow:", "↓")
            .replace("Nathan Choi", "<span class=name>Nathan Choi</span>");

        document.querySelector(".text").innerHTML = textHTML;

        // Check to see if rest of page unlocks
        if (textHTML.includes("("))
            document.body.classList.add("open--sesame");
        else
            document.body.classList.remove("open--sesame");

        if (!transferred && textHTML.includes(")")) {
            transferred = true;
            if (window.scrollY < 100) {
                setTimeout(function () {
                    scroll.animateScroll(document.querySelector("#projects"));
                }, 1000);
            }
        }

        if (!transferred) {
            confetti.click();
        }
    }

    // If mobile or not the original url or not #top, skip the intro
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
        window.location.href.includes("#") && !window.location.href.includes("#top")
    ) {
        transferred = true;
        letterIndex = TEXT.length;
        update();
    } else {
        scroll.animateScroll(0)
    }

    // Handle keys that actually type (like "a", "b", etc.)
    document.addEventListener("keypress", e => {
        e.preventDefault();
        if (e.key == "Backspace" || e.key == "Delete" || letterIndex >= TEXT.length) return;

        letterIndex++;

        if (letterIndex % 2 == 0) {
            document.getElementById("bongo").setAttribute("src", "/assets/images/bongo/bongo_left.png");
        } else {
            document.getElementById("bongo").setAttribute("src", "/assets/images/bongo/bongo_right.png");
        }

        update();
    });

    document.addEventListener("keyup", e => {
        document.getElementById("bongo").setAttribute("src", "/assets/images/bongo/bongo_raised.png");
    });

    // Handle keys that don't type (like arrows)
    document.addEventListener("keydown", e => {
        if (!transferred && (e.key == "Backspace" || e.key == "Delete"))
            if (letterIndex > 0) {
                document.getElementById("bongo").setAttribute("src", "/assets/images/bongo/bongo_right.png");
                letterIndex--;
            }


        update();
    });

    console.log("🚗 Ready. Set. Go!");
})();