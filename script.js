function loading() {
    for (var img of document.querySelectorAll("img")) {
        if (img.complete)
            continue;
        img.style.opacity = 0;
        img.onload = loaded;
    }
}

function loaded(e) {
    e.target.style.transition = "1s";
    e.target.style.opacity = 1;
}

var scrollVelocity = 0, notScrolling = true;
addEventListener("wheel", (event) => {
    event.preventDefault();
    if (Math.sign(scrollVelocity) === Math.sign(event.deltaY))
        scrollVelocity += event.deltaY * .1;
    else
        scrollVelocity = event.deltaY * .1;
    if (notScrolling) {
        notScrolling = false;
        requestAnimationFrame(loop);
    }
}, { passive: false });

function loop(t) {
    if (scrollVelocity !== 0) {
        scrollVelocity *= .95;
        window.scrollBy({
            top: scrollVelocity,
            behavior: "instant"
        });
        if (
            Math.abs(scrollVelocity) < 1 ||
            (
                scrollVelocity > 0 ?
                    window.scrollY === document.body.scrollHeight - window.innerHeight :
                    window.scrollY === 0
            )
        )
            scrollVelocity = 0;
    }
    if (scrollVelocity !== 0)
        requestAnimationFrame(loop);
    else
        notScrolling = true;
}