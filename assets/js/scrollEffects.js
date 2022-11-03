// LAX.js scroll Animations

// Debounce function
const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
}

const initLax = () => {
    lax.init();
    lax.addDriver("scrollY", function () {
        return window.scrollY;
    }, {
        frameStep: 0.5,
        easing: "easeInOutQuint"
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
            translateY: [
                ["elInY", "elCenterY"],
                [150, 0]
            ],
            scale: [
                ["elInY", "elCenterY"],
                [0.5, 1]
            ],
            opacity: [
                ["elInY", "elOutY - 100"],
                [0, 1]
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
                ["screenHeight - 1000", "screenHeight - 60"],
                [100, 0]
            ]
        }
    });
    
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 5,
            glare: true,
            speed: 1000
        });
    
        lax.addElements(".scalein", {
            scrollY: {
                scale: [
                    ["elInY", "elCenterY - 200"],
                    [0.8, 1]
                ]
            }
        });
    }
};

const updateLax = debounce(() => {
    console.log("RESIZING");
    initLax();
}, 500);

window.addEventListener("resize", updateLax);
window.onload = initLax;
