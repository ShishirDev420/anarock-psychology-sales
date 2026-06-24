;(function () {
  'use strict'

  // — Scroll Reveal —
  const revealElements = document.querySelectorAll('.insight-card, .bento-card, .funnel-stage, .loop-phase, .delta-row, .section-title, .section-desc, .section-label')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal', 'visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  revealElements.forEach((el) => {
    el.classList.add('reveal')
    observer.observe(el)
  })

  // — Staggered Card Reveals —
  document.querySelectorAll('.insight-grid, .crm-bento').forEach((grid) => {
    const cards = grid.querySelectorAll('.insight-card, .bento-card')
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`
    })
  })

  // — Specular Mouse Tracking on Cards —
  document.querySelectorAll('.insight-card, .bento-card, .loop-phase').forEach((card) => {
    const highlight = document.createElement('div')
    highlight.className = 'specular-highlight'
    highlight.style.cssText =
      'position:absolute;inset:0;pointer-events:none;z-index:1;border-radius:inherit;' +
      'background:radial-gradient(200px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.06),transparent 75%);' +
      'opacity:0;transition:opacity 0.4s ease;'
    card.appendChild(highlight)
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      highlight.style.setProperty('--mx', `${x}%`)
      highlight.style.setProperty('--my', `${y}%`)
    })
    card.addEventListener('mouseenter', () => { highlight.style.opacity = '1' })
    card.addEventListener('mouseleave', () => { highlight.style.opacity = '0' })
  })

  // — Funnel Connector Pulse —
  document.querySelectorAll('.funnel-stage').forEach((stage) => {
    stage.addEventListener('mouseenter', () => {
      const connector = stage.nextElementSibling
      if (connector && connector.classList.contains('funnel-connector')) {
        connector.style.background = 'linear-gradient(180deg, var(--brand-purple-light), rgba(159,82,149,0.3))'
        connector.style.transition = 'background 0.3s ease'
      }
    })
    stage.addEventListener('mouseleave', () => {
      const connector = stage.nextElementSibling
      if (connector && connector.classList.contains('funnel-connector')) {
        connector.style.background = 'linear-gradient(180deg, var(--brand-purple), transparent)'
      }
    })
  })

  // — Unit Badge Color Mapping —
  const unitColors = {
    11: '#ff3b30', 12: '#ff9f0a', 8: '#ff3b30', 9: '#ff9f0a',
    19: '#ff3b30', 15: '#ffd60a', 20: '#ff3b30', 7: '#ff9f0a',
    5: '#ff9f0a', 26: '#ff3b30', 23: '#ffd60a', 4: '#ff9f0a'
  }
  document.querySelectorAll('.insight-card').forEach((card) => {
    const unit = card.dataset.unit
    const accent = card.querySelector('.card-accent')
    if (unit && unitColors[unit]) {
      accent.style.background = unitColors[unit]
    }
  })

  // — Delta Row Labeling for Responsive —
  const deltaLabels = ['Dimension', 'Standard Practice', 'Psychology-Optimized', 'Delta']
  document.querySelectorAll('.delta-row').forEach((row) => {
    const spans = row.querySelectorAll('span')
    spans.forEach((span, i) => {
      span.dataset.label = deltaLabels[i]
    })
  })

  // — Hero Scroll Indicator Hide on Scroll —
  const scrollIndicator = document.querySelector('.scroll-indicator')
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0'
        scrollIndicator.style.transition = 'opacity 0.5s ease'
      } else {
        scrollIndicator.style.opacity = '1'
      }
    })
  }

  // — Smooth Nav Link Scroll —
  document.querySelectorAll('.nav-links a, .cta-button').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  })

  console.log('ANAROCK Psychology of Sales Intelligence — Loaded')
})()
