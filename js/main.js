/* ============================================================
   ANAROCK Psychology of Sales Intelligence
   GSAP-powered: spring physics, parallax, cinematic easing
   Architecture reference: shishir-and-anarock-rule-the-world.vercel.app
   ============================================================ */
;(function () {
  'use strict'

  // ============ 1. Scroll Reveal ============
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el)
  })

  // ============ 2. GSAP Spring Physics Card Hover ============
  document.querySelectorAll('.principle-card, .bento-card, .brain-stage, .funnel-callout').forEach(function (card) {
    var highlight = document.createElement('div')
    highlight.className = 'specular-highlight'
    card.appendChild(highlight)

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect()
      var x = e.clientX - rect.left
      var y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', x + 'px')
      card.style.setProperty('--mouse-y', y + 'px')

      var cx = rect.width / 2
      var cy = rect.height / 2
      var tiltX = ((y - cy) / cy) * -4
      var tiltY = ((x - cx) / cx) * 4

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 800,
        scale: 1.015,
        y: -5,
        duration: 0.5,
        ease: 'elastic.out(1, 0.85)',
        overwrite: 'auto'
      })
    })

    card.addEventListener('mouseleave', function () {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto'
      })
    })
  })

  // ============ 3. Counter Animation ============
  function animateCounter(el) {
    var text = el.textContent
    var match = text.match(/[\d.]+/)
    if (!match) return
    var target = parseFloat(match[0])
    var suffix = text.replace(match[0], '')
    var duration = 2000
    var decimals = (match[0].match(/\./) && match[0].split('.')[1].length) || 0
    var start = performance.now()
    function update(now) {
      var elapsed = now - start
      var progress = Math.min(elapsed / duration, 1)
      var eased = 1 - Math.pow(1 - progress, 3)
      var current = target * eased
      el.textContent = decimals ? current.toFixed(decimals) : Math.floor(current)
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })
  document.querySelectorAll('[data-count]').forEach(function (el) { counterObserver.observe(el) })

  // ============ 4. Hero 3D Parallax ============
  var heroLogoWrapper = document.querySelector('.hero-logo-wrapper')
  var heroLogoImg = document.querySelector('.hero-logo-img')
  var heroLogoGlow = document.querySelector('.hero-logo-glow')
  var heroLogoGlowAccent = document.querySelector('.hero-logo-glow-accent')
  var orbitalOne = document.querySelector('.hero-orbital-tilt-1')
  var orbitalTwo = document.querySelector('.hero-orbital-tilt-2')
  var orbitalThree = document.querySelector('.hero-orbital-tilt-3')
  var heroEl = document.querySelector('.hero')

  if (heroLogoWrapper && heroLogoImg && heroEl) {
    var glowEls = [heroLogoGlow, heroLogoGlowAccent].filter(Boolean)
    var orbitalEls = [orbitalOne, orbitalTwo, orbitalThree].filter(Boolean)
    var heroIntroComplete = false
    var lastHeroPointer = null

    gsap.set(heroLogoImg, { z: 30, transformPerspective: 1000, transformOrigin: 'center center', force3D: true })
    gsap.set(glowEls, { transformOrigin: 'center center', force3D: true })
    gsap.set(orbitalEls, { force3D: true })

    function applyHeroParallax(pointer) {
      var rect = heroLogoWrapper.getBoundingClientRect()
      var cx = rect.left + rect.width / 2
      var cy = rect.top + rect.height / 2
      var mx = pointer.clientX - cx
      var my = pointer.clientY - cy
      var tiltX = (my / window.innerHeight) * -18
      var tiltY = (mx / window.innerWidth) * 18
      var imgDX = (mx / window.innerWidth) * 15
      var imgDY = (my / window.innerHeight) * 15
      var glowDX = (mx / window.innerWidth) * -10
      var glowDY = (my / window.innerHeight) * -10
      var orbitDX = (mx / window.innerWidth) * 6
      var orbitDY = (my / window.innerHeight) * 6

      gsap.to(heroLogoImg, {
        rotateX: tiltX, rotateY: tiltY, x: imgDX, y: imgDY, z: 30,
        transformPerspective: 1000, duration: 0.6, ease: 'power2.out', overwrite: 'auto'
      })
      if (heroLogoGlow) {
        gsap.to(heroLogoGlow, { x: glowDX, y: glowDY, duration: 0.8, ease: 'power1.out', overwrite: 'auto' })
      }
      if (heroLogoGlowAccent) {
        gsap.to(heroLogoGlowAccent, { x: glowDX * 1.4, y: glowDY * 1.4, duration: 1.0, ease: 'power1.out', overwrite: 'auto' })
      }
      gsap.to(orbitalEls, {
        x: orbitDX, y: orbitDY, z: -200,
        rotateX: function (index) { return [65, -40, 20][index] + tiltX * 0.35 },
        rotateY: function (index) { return [15, -20, 40][index] + tiltY * 0.35 },
        transformPerspective: 1000, duration: 0.95, ease: 'power2.out', overwrite: 'auto'
      })
    }

    heroEl.addEventListener('mousemove', function (e) {
      lastHeroPointer = { clientX: e.clientX, clientY: e.clientY }
      if (!heroIntroComplete) return
      applyHeroParallax(lastHeroPointer)
    })
    heroEl.addEventListener('mouseleave', function () {
      lastHeroPointer = null
      if (!heroIntroComplete) return
      gsap.to(heroLogoImg, { rotateX: 0, rotateY: 0, x: 0, y: 0, z: 30, duration: 1.2, ease: 'power3.out', overwrite: 'auto' })
      gsap.to(glowEls, { x: 0, y: 0, duration: 1.2, ease: 'power3.out', overwrite: 'auto' })
      gsap.to(orbitalOne, { x: 0, y: 0, z: -200, rotateX: 65, rotateY: 15, duration: 1.2, ease: 'power3.out', overwrite: 'auto' })
      gsap.to(orbitalTwo, { x: 0, y: 0, z: -200, rotateX: -40, rotateY: -20, duration: 1.2, ease: 'power3.out', overwrite: 'auto' })
      gsap.to(orbitalThree, { x: 0, y: 0, z: -200, rotateX: 20, rotateY: 40, duration: 1.2, ease: 'power3.out', overwrite: 'auto' })
    })

    // GSAP Logo Intro
    var tl = gsap.timeline({
      delay: 0.4,
      onComplete: function () {
        heroIntroComplete = true
        gsap.to(heroLogoWrapper, { y: -7, rotation: 0.4, duration: 4.0, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        if (heroLogoGlow) {
          gsap.to(heroLogoGlow, { opacity: 0.75, scale: 1.06, duration: 5.0, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        }
        if (heroLogoGlowAccent) {
          gsap.to(heroLogoGlowAccent, { opacity: 0.82, scale: 1.04, duration: 8.0, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        }
        if (lastHeroPointer) applyHeroParallax(lastHeroPointer)
      }
    })

    tl.fromTo(heroLogoWrapper, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' })
    tl.fromTo(orbitalEls, { opacity: 0, scale: 0.65 }, { opacity: 1, scale: 1, duration: 2.0, ease: 'power3.out' }, '0.15')
    tl.fromTo(glowEls, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out' }, '0.1')

    // Fade in stats after logo
    tl.fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
    tl.fromTo('.hero-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.4')
    tl.fromTo('.btn-primary', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  }

  // ============ 5. Smooth Scroll ============
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      var target = document.querySelector(this.getAttribute('href'))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })

  // ============ 6. Active Nav Link ============
  var sections = document.querySelectorAll('section[id]')
  var navLinks = document.querySelectorAll('.nav-links a')
  var sectionObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id
        navLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + id) })
      }
    })
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' })
  sections.forEach(function (s) { sectionObs.observe(s) })

  // ============ 7. Nav Progress ============
  var progressBar = document.getElementById('navProgress')
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY
      var total = document.documentElement.scrollHeight - window.innerHeight
      progressBar.style.width = total > 0 ? (scrolled / total) * 100 + '%' : '0%'
    })
  }

  // ============ 8. Scroll Indicator Fade ============
  var scrollInd = document.querySelector('.scroll-indicator')
  if (scrollInd) {
    window.addEventListener('scroll', function () {
      scrollInd.style.opacity = window.scrollY > 100 ? '0' : '1'
      scrollInd.style.transition = 'opacity 0.4s ease'
    })
  }

  // ============ 9. Principle Card Click-to-Expand ============
  var principleCards = document.querySelectorAll('.principle-card')
  principleCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return
      var isOpen = card.classList.contains('is-open')
      principleCards.forEach(function (c) { c.classList.remove('is-open') })
      if (!isOpen) {
        card.classList.add('is-open')
        gsap.fromTo(card.querySelector('.principle-expand'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      }
    })
  })

  // ============ 10. Bento Card Click-to-Expand ============
  var bentoCards = document.querySelectorAll('.bento-card')
  bentoCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return
      var isOpen = card.classList.contains('is-open')
      bentoCards.forEach(function (c) { c.classList.remove('is-open') })
      if (!isOpen) {
        card.classList.add('is-open')
        gsap.fromTo(card.querySelector('.bento-reveal'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      }
    })
  })

  // ============ 11. Reading Mode Toggle ============
  var body = document.body
  var pills = document.querySelectorAll('.rm-pill')
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active') })
      pill.classList.add('active')
      body.setAttribute('data-mode', pill.dataset.mode)
    })
  })

  console.log('%c ANAROCK Psychology of Sales Intelligence ', 'background:#9f5295;color:white;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:4px;')
})()
