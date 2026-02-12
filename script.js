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
