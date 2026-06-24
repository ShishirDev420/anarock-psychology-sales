; (function () {
  'use strict'

  // ============================
  // 1. Icons are inlined in index.html for reliability
  // ============================

  // ============================
  // 2. Reading Mode Toggle
  // ============================
  var body = document.body
  var pills = document.querySelectorAll('.rm-pill')
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active') })
      pill.classList.add('active')
      body.setAttribute('data-mode', pill.dataset.mode)
    })
  })

  // ============================
  // 3. Hero Star Field
  // ============================
  var starHost = document.getElementById('heroStars')
  if (starHost) {
    for (var i = 0; i < 60; i++) {
      var s = document.createElement('div')
      s.className = 'star'
      s.style.left = Math.random() * 100 + '%'
      s.style.top = Math.random() * 100 + '%'
      s.style.animationDelay = Math.random() * 4 + 's'
      s.style.animationDuration = (3 + Math.random() * 3) + 's'
      starHost.appendChild(s)
    }
  }

  // ============================
  // 4. Stat Counter Animation
  // ============================
  var counters = document.querySelectorAll('[data-count]')
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return
      var el = entry.target
      var target = parseFloat(el.dataset.count)
      var decimal = parseInt(el.dataset.decimal) || 0
      var duration = 1500
      var startTime = null
      function step(t) {
        if (!startTime) startTime = t
        var p = Math.min((t - startTime) / duration, 1)
        var eased = 1 - Math.pow(1 - p, 3)
        var value = target * eased
        el.textContent = decimal ? value.toFixed(decimal) : Math.floor(value)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      counterObserver.unobserve(el)
    })
  }, { threshold: 0.3 })
  counters.forEach(function (c) { counterObserver.observe(c) })

  // ============================
  // 5. Scroll Reveal
  // ============================
  var revealEls = document.querySelectorAll('.principle-card, .bento-card, .brain-stage, .funnel-callout, .delta-row, .delta-col, .loop-prompt, .section-intro, .terminal')
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return
      entry.target.classList.add('reveal', 'visible')
      revealObserver.unobserve(entry.target)
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
  revealEls.forEach(function (el, i) {
    el.classList.add('reveal')
    el.style.transitionDelay = (i % 8) * 60 + 'ms'
    revealObserver.observe(el)
  })

  // ============================
  // 6. Specular Highlights
  // ============================
  document.querySelectorAll('.principle-card, .bento-card, .brain-stage, .funnel-callout').forEach(function (card) {
    var highlight = document.createElement('div')
    highlight.style.cssText =
      'position:absolute;inset:0;pointer-events:none;z-index:1;border-radius:inherit;' +
      'background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,0.07),transparent 75%);' +
      'opacity:0;transition:opacity 0.4s ease;'
    card.appendChild(highlight)
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect()
      var x = ((e.clientX - rect.left) / rect.width) * 100
      var y = ((e.clientY - rect.top) / rect.height) * 100
      highlight.style.setProperty('--mx', x + '%')
      highlight.style.setProperty('--my', y + '%')
    })
    card.addEventListener('mouseenter', function () { highlight.style.opacity = '1' })
    card.addEventListener('mouseleave', function () { highlight.style.opacity = '0' })
  })

  // ============================
  // 7. Principle Card Click-to-Expand (Standard mode)
  // ============================
  var principleCards = document.querySelectorAll('.principle-card')
  principleCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return
      var wasOpen = card.classList.contains('is-open')
      principleCards.forEach(function (c) { c.classList.remove('is-open') })
      if (!wasOpen) card.classList.add('is-open')
    })
  })

  // ============================
  // 8. Nav Progress
  // ============================
  var progressBar = document.getElementById('navProgress')
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY
      var total = document.documentElement.scrollHeight - window.innerHeight
      var pct = total > 0 ? (scrolled / total) * 100 : 0
      progressBar.style.width = pct + '%'
    })
  }

  // ============================
  // 9. Smooth Scroll
  // ============================
  document.querySelectorAll('.nav-links a, .cta-button, .scroll-indicator').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        var target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  // ============================
  // 10. Hero Scroll Indicator Fade
  // ============================
  var scrollInd = document.querySelector('.scroll-indicator')
  if (scrollInd) {
    window.addEventListener('scroll', function () {
      scrollInd.style.opacity = window.scrollY > 100 ? '0' : '1'
      scrollInd.style.transition = 'opacity 0.4s ease'
    })
  }

  // ============================
  // 11. Loop Node Click Pulse
  // ============================
  document.querySelectorAll('.loop-node').forEach(function (node) {
    node.addEventListener('click', function () {
      node.style.transition = 'transform 0.15s ease'
      node.style.transformOrigin = 'center'
      node.style.transform = 'scale(1.15)'
      setTimeout(function () { node.style.transform = '' }, 200)
    })
  })

  // ============================
  // 12. Console Greeting
  // ============================
  console.log('%cANAROCK Psychology of Sales Intelligence', 'color:#9f5295;font-weight:bold;font-size:16px')
  console.log('%cThree reading modes available: Visual / Standard / Deep Dive', 'color:#d46be0')
})()
