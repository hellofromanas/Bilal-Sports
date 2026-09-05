// ===== Bilal Sports — Global JS =====

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initGSAP();
});

/* Mobile nav toggle */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* GSAP scroll animations */
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Navbar entrance
  gsap.from('.navbar', { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' });

  // Hero elements
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero-eyebrow', { y: 30, opacity: 0, duration: 0.7 })
    .from('.hero h1', { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.hero p', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero-actions .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4')
    .from('.hero-stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.3');

  // Cricket bat slides in from the left
  if (document.querySelector('.hero-bat')) {
    gsap.from('.hero-bat', {
      x: -200,
      rotation: -35,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.4)',
      delay: 0.4
    });
  }

  // Football bounces into place
  if (document.querySelector('.hero-ball')) {
    gsap.from('.hero-ball', {
      y: -300,
      opacity: 0,
      duration: 1,
      ease: 'bounce.out',
      delay: 0.8
    });
  }

  // Cricket ball drops + spins in
  if (document.querySelector('.hero-cricketball')) {
    gsap.from('.hero-cricketball', {
      y: -200,
      rotation: 360,
      opacity: 0,
      duration: 1.1,
      ease: 'bounce.out',
      delay: 1.1
    });
  }

  // Generic scroll reveal for any .reveal element
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      }
    });
  });

  // Info cards stagger
  if (document.querySelector('.info-grid')) {
    gsap.from('.info-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.info-grid', start: 'top 85%' }
    });
  }

  // Product cards stagger (fade in dynamically while scrolling)
  gsap.utils.toArray('.products-grid').forEach((grid) => {
    gsap.from(grid.querySelectorAll('.product-card'), {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 85%' }
    });
  });

  // Gear showcase images
  if (document.querySelector('.gear-showcase')) {
    gsap.from('.gear-item', {
      scale: 0.85,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.gear-showcase', start: 'top 85%' }
    });
  }

  // Testimonials
  if (document.querySelector('.testimonial-grid')) {
    gsap.from('.testimonial-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonial-grid', start: 'top 85%' }
    });
  }

  // Section titles / tags general reveal
  gsap.utils.toArray('section:not(.hero)').forEach((sec) => {
    const tag = sec.querySelector('.section-tag');
    const title = sec.querySelector('.section-title');
    const sub = sec.querySelector('.section-sub');
    if (tag || title || sub) {
      gsap.from([tag, title, sub].filter(Boolean), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: 'top 80%' }
      });
    }
  });

  // Contact page items
  gsap.utils.toArray('.contact-info-item').forEach((item, i) => {
    gsap.from(item, {
      x: -40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 90%' }
    });
  });

  if (document.querySelector('.contact-card')) {
    gsap.from('.contact-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-card', start: 'top 85%' }
    });
  }
}

/* Products page: category filter */
function filterProducts(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const cat = card.dataset.category;
    const show = category === 'all' || cat === category;
    if (show) {
      card.style.display = '';
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    } else {
      card.style.display = 'none';
    }
  });
}

/* Contact form: front-end only handling */
function handleContactSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  status.textContent = "Thanks! Your message has been received — we'll get back to you soon.";
  status.classList.add('show', 'success');
  form.reset();
  return false;
}
