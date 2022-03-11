// LAX.js scroll Animations
lax.init();
lax.addDriver("scrollY", function () {
    return window.scrollY;
}, {
    frameStep: 0.5
});

lax.addElements(".fadeout", {
    scrollY: {
        translateY: [
            ["elCenterY", "elOutY"],
            [0, 300]
        ],
        opacity: [
            ["elCenterY", "elOutY"],
            [1, 0]
        ]
    }
});

lax.addElements(".fadein", {
    scrollY: {
        translateX: [
            ["elInY", "elCenterY"],
            [300, 0]
        ],
        opacity: [
            ["elInY", "elCenterY"],
            [0, 1]
        ]
    }
});

lax.addElements(".scalein", {
    scrollY: {
        scale: [
            ["elInY", "elCenterY"],
            [0.8, 1]
        ]
    }
});

lax.addElements(".navFadeOut", {
    scrollY: {
        opacity: [
            ["screenHeight/1.4", "screenHeight + 50"],
            [1, 0]
        ],
        translateY: [
            ["screenHeight - 50", "screenHeight + 50"],
            [0, -100]
        ]
    }
});

lax.addElements(".navFadeIn", {
    scrollY: {
        opacity: [
            ["screenHeight - 1000", "screenHeight"],
            [0, 1]
        ],
        translateY: [
            ["screenHeight - 1000", "screenHeight"],
            [100, 0]
        ]
    }
});
