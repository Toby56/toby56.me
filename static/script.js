async function app() {
    let contentDIV = document.getElementById("content");
    content = await fetch('/content/hello');
    contentDIV.innerHTML = await content.text();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", app);
} else {
     app()
}