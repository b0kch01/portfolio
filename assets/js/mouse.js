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
    var mousePosition = { x: 0, y: 0 };

    document.addEventListener("mousemove", event => {
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;

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
    });
})();
