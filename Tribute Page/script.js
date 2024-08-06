document.getElementById("more-info").addEventListener("click", function() {
    window.location.href = "more-info.html";
});


document.getElementById("more-info").addEventListener("click", function() {
    const infoContent = document.getElementById("info-content");
    const button = document.getElementById("more-info");

    if (infoContent.style.display === "none" || !infoContent.style.display) {
        infoContent.style.display = "block";
        button.innerText = "Show Less Info";
        infoContent.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(function() {
            if (opacity < 1) {
                opacity += 0.1;
                infoContent.style.opacity = opacity;
            } else {
                clearInterval(fadeIn);
            }
        }, 50);
    } else {
        button.innerText = "More Info";
        let opacity = 1;
        const fadeOut = setInterval(function() {
            if (opacity > 0) {
                opacity -= 0.1;
                infoContent.style.opacity = opacity;
            } else {
                clearInterval(fadeOut);
                infoContent.style.display = "none";
            }
        }, 50);
    }
});
