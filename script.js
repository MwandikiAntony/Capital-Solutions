function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"})
}

/* Fade Reveal */
const faders=document.querySelectorAll(".fade-up");
const appearOptions={threshold:0.2};

const appearOnScroll=new IntersectionObserver(function(entries,observer){
entries.forEach(entry=>{
if(!entry.isIntersecting)return;
entry.target.classList.add("show");
observer.unobserve(entry.target);
});
},appearOptions);

faders.forEach(fader=>appearOnScroll.observe(fader));

/* Counter */
const counters=document.querySelectorAll('.stat h3');

counters.forEach(counter=>{
const update=()=>{
const target=+counter.getAttribute('data-target');
const c=+counter.innerText;
const increment=target/100;
if(c<target){
counter.innerText=Math.ceil(c+increment);
setTimeout(update,20);
}else{
counter.innerText=target;
}
};
update();
});
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value;
    const email = form.querySelector("input[type='email']").value;
    const message = form.querySelector("textarea").value;

    try {
        const res = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (res.ok) {
            formMessage.textContent = "Message sent successfully! You will get a reply soon.";
            formMessage.className = "form-message success";
            form.reset();
        } else {
            formMessage.textContent = "Failed to send. Try again later.";
            formMessage.className = "form-message error";
        }

    } catch (err) {
        console.error(err);
        formMessage.textContent = "Failed to send. Try again later.";
        formMessage.className = "form-message error";
    }
});


const chatbot = document.getElementById("chatbot");
const chatHeader = document.getElementById("chatHeader");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");

// Toggle chat open/close
chatHeader.addEventListener("click", () => {
    chatbot.classList.toggle("active");
});

// Send message function
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage("You", userMessage);

    chatInput.value = "";

    try {
        const res = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await res.json();
        addMessage("AI", data.reply);

    } catch (err) {
        console.error(err);
        addMessage("AI", "Sorry, something went wrong. Try again later.");
    }
}

// Add message to chat box
function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(msgDiv);

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Button click
sendBtn.addEventListener("click", sendMessage);

// Enter key to send
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});


