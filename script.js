// Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Typing Effect
const words = ["Secure Web Applications", "Powerful Financial Systems", "Scalable Backend APIs"];
let wordIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function type() {
    if (charIndex < words[wordIndex].length) {
        typingElement.textContent += words[wordIndex][charIndex];
        charIndex++;
        setTimeout(type, 50);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 30);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
    }
}

document.addEventListener("DOMContentLoaded", type);

// Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            reveal.style.opacity = 1;
            reveal.style.transform = "translateY(0)";
        }
    });
});
