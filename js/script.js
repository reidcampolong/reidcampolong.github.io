document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Dynamic Aurora Background ---
    const aurora = document.getElementById('aurora');
    window.addEventListener('mousemove', (e) => {
        gsap.to(aurora, {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY,
            ease: 'power2.out'
        });
    });

    // --- Hero Section Animation ---
    const heroLines = gsap.utils.toArray('.hero-line');
    const subtitle = document.querySelector('.subtitle');

    gsap.set(heroLines, { y: 50, opacity: 0 });
    gsap.set(subtitle, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(heroLines, {
        y: 0,
        opacity: 1,
        duration: 1, // Faster
        stagger: 0.1
    }).to(subtitle, {
        y: 0,
        opacity: 1,
        duration: 0.8 // Faster
    }, "-=0.6");


    // --- Content Section Animations on Scroll ---
    const sections = gsap.utils.toArray('.content-section');

    sections.forEach(section => {
        const elements = section.querySelectorAll('.section-title, p, .project-card, .cta-button');
        gsap.set(elements, { opacity: 0, y: 30 }); // Slightly less distance

        ScrollTrigger.create({
            trigger: section,
            start: 'top 85%', // Trigger a bit sooner
            end: 'bottom 15%',
            onEnter: () => gsap.to(elements, {
                opacity: 1,
                y: 0,
                duration: 0.6, // Faster
                stagger: 0.08, // Faster stagger
                ease: 'power3.out'
            }),
            onLeaveBack: () => gsap.to(elements, {
                opacity: 0,
                y: 30, // Slightly less distance
                duration: 0.6, // Faster
                ease: 'power3.in'
            }),
        });
    });

    // --- Interactive Project Cards ---
    const projectCards = gsap.utils.toArray('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}); 