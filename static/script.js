async function navigate(path) {
    console.log("New: " + path + "\nOld: " + window.location.pathname)
    if (path == "/") {
        document.getElementById("content").innerHTML = "";

        document.body.classList.add("index");
    } else if (path.substring(0, 6) == "/page/") {
        contentName = path.substring(6)

        content = await fetch('/content/' + contentName);
        document.getElementById("content").innerHTML = await content.text();

        addClickHandlers();

        document.body.classList.remove("index");
    }
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
        if (window.location.href != lastUrl) {
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