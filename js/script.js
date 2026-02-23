document.addEventListener('DOMContentLoaded', () => {
    // --- Split name into individual characters ---
    const nameEl = document.querySelector('.name');
    const nameText = nameEl.textContent;
    nameEl.innerHTML = nameText.split('').map(char =>
        char === ' '
            ? '<span class="char">&nbsp;</span>'
            : `<span class="char">${char}</span>`
    ).join('');

    const chars = nameEl.querySelectorAll('.char');
    const titleEl = document.querySelector('.title');
    const linksEl = document.querySelector('.links');

    // Set initial hidden states via JS (not CSS, so content is visible without JS)
    gsap.set(chars, {
        y: 60,
        rotationX: -80,
        opacity: 0,
        transformOrigin: 'bottom center',
    });
    gsap.set(titleEl, { visibility: 'hidden' });
    gsap.set(linksEl, { opacity: 0 });

    const tl = gsap.timeline();

    // 1. Name characters cascade in with 3D flip
    tl.to(chars, {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.035,
        ease: 'back.out(1.5)',
        delay: 0.5,
    })

    // 2. Block reveal for title — accent mask sweeps in, then out
    .to('.block-mask', {
        scaleX: 1,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
            gsap.set(titleEl, { visibility: 'visible' });
        }
    }, '-=0.2')
    .set('.block-mask', { transformOrigin: 'right' })
    .to('.block-mask', {
        scaleX: 0,
        duration: 0.45,
        ease: 'power3.inOut',
    })

    // 3. Rule extends from center
    .to('.rule', {
        width: '6rem',
        duration: 0.7,
        ease: 'power2.inOut',
    }, '-=0.2')

    // 4. Links fade up
    .to(linksEl, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
    }, '-=0.3');
});
