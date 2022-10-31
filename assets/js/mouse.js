(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) return;

    function isClickable(element, classname) {
        if (
            element.classList &&
            (
                element.classList.contains(classname)
            )
        ) {
            return true;
        }

        return element.parentNode && isClickable(element.parentNode, classname);
    }

    console.log("🧀 Mouse is on!")

    // Custom cursor
    const cursorEl = document.querySelector("#cursor");

    let mouseEvent;
    let mousePosition = { x: 0, y: 0 };

    const requestAnimation = () => {
        requestAnimationFrame(function () {
            cursorEl.style.transform =
                `translate(${mousePosition.x}px, ${mousePosition.y}px)`;

            const hoveredEl = document.elementFromPoint(mousePosition.x, mousePosition.y);

            if (isClickable(hoveredEl, "card")) {
                cursorEl.classList.add("link__hover");
                document.body.style.cursor = "none";
            } else {
                cursorEl.classList.remove("link__hover");
                document.body.style.cursor = "auto";
            }
        })
    };

    const updateMouseState = (e) => {
        mouseEvent = e;
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;

        requestAnimation();
    }

    const updateMouseStateScroll = () => {
        mousePosition.x = mouseEvent?.clientX ?? 0;
        mousePosition.y = mouseEvent?.clientY ?? 0;

        requestAnimation();
    };

    document.addEventListener("mousemove", updateMouseState);
    window.addEventListener("scroll", updateMouseStateScroll);
})();
