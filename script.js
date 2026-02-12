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


async function sendMessage(){
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    const userMessage = input.value;
    messages.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;

    const res = await fetch("http://localhost:5000/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:userMessage})
    });

    const data = await res.json();
    messages.innerHTML += `<div><strong>AI:</strong> ${data.reply}</div>`;

    input.value="";
}
