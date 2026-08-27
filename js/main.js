// ============================================
// Yuqing Wei's Personal Website — Main Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Highlight current page in nav ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Mobile hamburger menu ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // --- Tab switching with sliding indicator ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const tabNavs = document.querySelectorAll('.tab-nav');

  // Create and manage sliding indicators for each tab-nav
  const indicators = [];
  tabNavs.forEach(nav => {
    const indicator = document.createElement('div');
    indicator.className = 'tab-indicator';
    nav.appendChild(indicator);
    indicators.push({ nav, indicator });

    function moveIndicator(btn, instant) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const left = btnRect.left - navRect.left;
      const width = btnRect.width;
      if (instant) {
        indicator.style.transition = 'none';
        // Force reflow to apply the 'none' transition
        void indicator.offsetWidth;
        indicator.style.transition = '';
      }
      indicator.style.left = left + 'px';
      indicator.style.width = width + 'px';
    }

    // Find initially active button
    const activeBtn = nav.querySelector('.tab-btn.active');
    if (activeBtn) {
      // Position indicator after fonts load to ensure correct sizing
      moveIndicator(activeBtn, true);
      if (document.readyState === 'complete') {
        moveIndicator(activeBtn, true);
      } else {
        window.addEventListener('load', () => moveIndicator(activeBtn, true));
      }
    }

    // Click handlers
    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        moveIndicator(btn);
        // Sync panels — support both .tab-panel (research) and .tab-content (leadership)
        document.querySelectorAll('.tab-panel, .tab-content').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-tab') === tab);
        });
      });
    });
  });

  // Recalculate indicator on resize
  window.addEventListener('resize', () => {
    indicators.forEach(({ nav, indicator }) => {
      const activeBtn = nav.querySelector('.tab-btn.active');
      if (activeBtn) {
        const navRect = nav.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        indicator.style.transition = 'none';
        void indicator.offsetWidth;
        indicator.style.transition = '';
        indicator.style.left = (btnRect.left - navRect.left) + 'px';
        indicator.style.width = btnRect.width + 'px';
      }
    });
  });

  // --- Scroll fade-in animation ---
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  // --- Scroll progress bar ---
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  const navbar = document.querySelector('.navbar');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';

    // Navbar shadow on scroll
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollTop > 20);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Project showcase modal (right-click or keyboard) ---
  const showcaseConfigs = {
    parrotao: {
      title: 'ParroTAO Training Analysis Platform',
      description: 'A visual overview of the ParroTAO training platform, bringing together team management, training coordination, wearable data, and AI-assisted performance analytics.',
      images: [
        { src: 'images/project-showcases/parrotao-training-platform.png', alt: 'ParroTAO training platform overview' }
      ]
    },
    campus: {
      title: 'AI Agent Smart Campus Assistant',
      description: 'The offline RAG workflow used by the Smart Campus Assistant to transform trusted campus documents into a searchable knowledge base for grounded answers and personalized course planning.',
      images: [
        { src: 'images/project-showcases/rag-offline-pipeline-en.png', alt: 'RAG offline pipeline in English' },
        { src: 'images/project-showcases/rag-offline-pipeline-zh.png', alt: 'RAG offline pipeline in Chinese' }
      ]
    }
  };

  let showcaseModal;
  let showcasePreviousFocus;

  function closeShowcaseModal() {
    if (!showcaseModal) return;
    showcaseModal.classList.remove('is-open');
    showcaseModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (showcasePreviousFocus) showcasePreviousFocus.focus();
  }

  function openShowcaseModal(showcaseId, trigger) {
    const config = showcaseConfigs[showcaseId];
    if (!config) return;

    showcasePreviousFocus = trigger;
    if (!showcaseModal) {
      showcaseModal = document.createElement('div');
      showcaseModal.className = 'showcase-modal';
      showcaseModal.setAttribute('role', 'dialog');
      showcaseModal.setAttribute('aria-modal', 'true');
      showcaseModal.setAttribute('aria-hidden', 'true');
      showcaseModal.innerHTML = `
        <div class="showcase-modal__backdrop" data-showcase-close></div>
        <section class="showcase-modal__dialog" aria-labelledby="showcase-modal-title">
          <button type="button" class="showcase-modal__close" data-showcase-close aria-label="Close showcase">×</button>
          <div class="showcase-modal__content">
            <p class="showcase-modal__eyebrow">PROJECT SHOWCASE</p>
            <h2 id="showcase-modal-title"></h2>
            <p class="showcase-modal__description"></p>
            <div class="showcase-modal__gallery"></div>
          </div>
        </section>`;
      document.body.appendChild(showcaseModal);
      showcaseModal.addEventListener('click', (event) => {
        if (event.target.closest('[data-showcase-close]')) closeShowcaseModal();
      });
    }

    showcaseModal.querySelector('#showcase-modal-title').textContent = config.title;
    showcaseModal.querySelector('.showcase-modal__description').textContent = config.description;
    showcaseModal.querySelector('.showcase-modal__gallery').innerHTML = config.images
      .map(image => `<figure><img src="${image.src}" alt="${image.alt}" loading="lazy"></figure>`)
      .join('');
    showcaseModal.classList.add('is-open');
    showcaseModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    showcaseModal.querySelector('.showcase-modal__close').focus();
  }

  document.querySelectorAll('[data-showcase]').forEach(trigger => {
    trigger.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      openShowcaseModal(trigger.dataset.showcase, trigger);
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openShowcaseModal(trigger.dataset.showcase, trigger);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && showcaseModal?.classList.contains('is-open')) closeShowcaseModal();
  });

  // --- Quick card 3D tilt + mouse-follow glare ---
  document.querySelectorAll('.quick-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      card.style.setProperty('--mx', (x / rect.width * 100) + '%');
      card.style.setProperty('--my', (y / rect.height * 100) + '%');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
