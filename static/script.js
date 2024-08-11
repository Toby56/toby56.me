let keyframes = []

for (let i = 0; i < 4; i++) {
    keyframes = [...keyframes,
    { translateX: 18.3, duration: 1000 },
    { translateX: 0, duration: 0 }
    ];
}

let wiggleAnimation = anime({
    targets: '#wiggle',
    keyframes: keyframes,
    duration: 1000,
    easing: 'linear',
    autoplay: false
});
var animationSeek = { progress: 0 }

var widdleAnimationAnimation = anime({
    targets: animationSeek,
    progress: 1000 * 4,
    duration: 1000 * 4,
    easing: 'easeOutQuint',
    update: function () {
        wiggleAnimation.seek(animationSeek.progress)
    }
});

async function navigate(path) {
    if (path == "/") {
        document.getElementById("content").innerHTML = "";

        document.body.classList.add("index");

        widdleAnimationAnimation.restart();
    } else if (path.substring(0, 6) == "/page/") {
        contentName = path.substring(6)

        content = await fetch('/content/' + contentName);
        document.getElementById("content").innerHTML = await content.text();

        addClickHandlers();

        document.body.classList.remove("index");
    } else { return }

    let title = path.substring(6) || "Hello world"
    title = (title[0].toUpperCase() + title.slice(1)).replaceAll("-", " ");

    document.title = title
    document.getElementById("title").innerText = title

    navigatedPath = path;
}

async function handleClick(event) {
    let path = this.getAttribute("href")

    if (path != window.location.pathname) {
        history.pushState({}, "", path);

        navigate(path)
    }

    event.preventDefault();
}

function addClickHandlers() {
    let anchorElements = document.getElementsByTagName("a");

    if (anchorElements.length != 0) {
        for (element of anchorElements) {
            let path = element.getAttribute("href")
            if (path == "/" || path.substring(0, 6) == "/page/") {
                element.addEventListener("click", handleClick, false)
            };
        };
    };
}


function app() {
    // Add click event handlers to links
    addClickHandlers();

    // Regularly check for URL changes
    let lastUrl;

    setInterval(() => {
        if (window.location.href != lastUrl && window.location.pathname != navigatedPath) {
            navigate(window.location.pathname)

            lastUrl = window.location.href;
        }
    }, 50);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", app);
} else {
    app()
}