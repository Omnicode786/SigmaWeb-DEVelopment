// GSAP core timeline for nav load
const tlNav = gsap.timeline({ defaults: { ease: "power3.out" } });
tlNav
    .from("nav h1", { y: 30, opacity: 0, duration: 0.35, delay: 0.2 })
    .from(".part2 a", { y: 24, opacity: 0, duration: 0.25, stagger: 0.08 }, "-=0.05")
    .from(".part2 .primary", { y: 24, opacity: 0, duration: 0.3 }, "-=0.15");

// Hero animations
gsap.from(".center-part1 h1", { x: "-10%", opacity: 0, duration: 0.9, delay: 0.1 });
gsap.from(".center-part1 p", { y: 20, opacity: 0, duration: 0.7, delay: 0.25 });
gsap.from(".center-part1 .cta", { y: 20, opacity: 0, duration: 0.7, delay: 0.35 });
gsap.from(".center-part2 img", { x: "10%", opacity: 0, duration: 0.9, delay: 0.2 });

// Auto marquee float (subtle)
gsap.to(".marque img:not(.arrow)", {
    y: -3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 1.4,
    stagger: { each: 0.12, from: "random" }
});

// Wheel rotates arrows
window.addEventListener("wheel", (e) => {
    gsap.to(".arrow", { rotate: e.deltaY > 0 ? -180 : 0, duration: 0.3, ease: "power2.out" });
});

// ScrollTrigger for Services header
gsap.registerPlugin(ScrollTrigger);

gsap.from(".services", {
    y: 24, opacity: 0, duration: 0.4,
    scrollTrigger: {
        trigger: ".section2",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// Cards slide in from sides with groups
const tlCards = gsap.timeline({
    scrollTrigger: {
        trigger: ".container",
        start: "top 85%",
        end: "bottom 40%",
        scrub: 1.2
    }
});

tlCards
    .from(".elem.line1.left", { x: "-30%", opacity: 0, duration: 0.8 }, 0)
    .from(".elem.line1.right", { x: "30%", opacity: 0, duration: 0.8 }, 0)
    .from(".elem.line2.left", { x: "-30%", opacity: 0, duration: 0.8 }, 0.5)
    .from(".elem.line2.right", { x: "30%", opacity: 0, duration: 0.8 }, 0.5);

// Card hover micro-interactions
document.querySelectorAll(".elem").forEach((card) => {
    const lift = gsap.to(card, { y: -6, boxShadow: "0 14px 0 rgba(0,0,0,0.35)", duration: 0.25, paused: true, ease: "power2.out" });
    card.addEventListener("mouseenter", () => lift.play());
    card.addEventListener("mouseleave", () => lift.reverse());
});

// Mobile menu toggle
const menuBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".part2");
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("show");
        const open = menu.classList.contains("show");
        gsap.fromTo(menu, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.25, ease: "power2.out" });
        menuBtn.innerHTML = open ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
    });
}