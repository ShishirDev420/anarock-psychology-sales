/* ============================================================
   ANAROCK Psychology of Sales Intelligence
   GSAP-powered: spring physics, parallax, cinematic easing
   Architecture reference: shishir-and-anarock-rule-the-world.vercel.app
   ============================================================ */
;(function () {
  'use strict'

  // ============ 1. SCROLL REVEAL REGISTRATION ============
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.12, rootMargin: '40px 0px 40px 0px' })

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el)
  })

  // ============ 2. SPRING PHYSICS CARD HOVER (Hooke's Law) ============
  var hoverCardSelectors = [
    '.principle-card',
    '.bento-card',
    '.brain-stage',
    '.funnel-callout',
    '.delta-col',
    '.loop-prompt'
  ]

  hoverCardSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (card) {
      // Check if specular-highlight already exists
      if (!card.querySelector('.specular-highlight')) {
        var highlight = document.createElement('div')
        highlight.className = 'specular-highlight'
        card.appendChild(highlight)
      }

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

        if (typeof gsap !== 'undefined') {
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
        }
      })

      card.addEventListener('mouseleave', function () {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.85)',
            overwrite: 'auto'
          })
        }
      })
    })
  })

  // ============ 3. HERO 3D PARALLAX ON MOUSE ============
  var heroEl = document.querySelector('.hero')
  var heroLogoWrapper = document.querySelector('.hero-logo-wrapper')
  var heroLogoImg = document.querySelector('.hero-logo-img')
  var heroLogoGlow = document.querySelector('.hero-logo-glow')
  var heroLogoGlowAccent = document.querySelector('.hero-logo-glow-accent')
  var orbitalOne = document.querySelector('.hero-orbital-tilt-1')
  var orbitalTwo = document.querySelector('.hero-orbital-tilt-2')
  var orbitalThree = document.querySelector('.hero-orbital-tilt-3')

  if (heroEl && heroLogoWrapper && heroLogoImg && typeof gsap !== 'undefined') {
    var glowEls = [heroLogoGlow, heroLogoGlowAccent].filter(Boolean)
    var orbitalEls = [orbitalOne, orbitalTwo, orbitalThree].filter(Boolean)
    var heroIntroComplete = false
    var lastHeroPointer = null

    // Set initial 3D context
    gsap.set(heroLogoImg, {
      z: 30,
      transformPerspective: 1000,
      transformOrigin: 'center center',
      force3D: true
    })
    if (orbitalEls.length) {
      gsap.set(orbitalEls, { force3D: true, transformPerspective: 1000 })
    }
    if (glowEls.length) {
      gsap.set(glowEls, { transformOrigin: 'center center', force3D: true })
    }

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

      // Logo SVG/image parallax (inverse coefficient)
      gsap.to(heroLogoImg, {
        rotateX: tiltX,
        rotateY: tiltY,
        x: imgDX,
        y: imgDY,
        z: 30,
        transformPerspective: 1000,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      })

      // Glow layers: shift opposite direction
      if (heroLogoGlow) {
        gsap.to(heroLogoGlow, {
          x: glowDX,
          y: glowDY,
          duration: 0.8,
          ease: 'power1.out',
          overwrite: 'auto'
        })
      }
      if (heroLogoGlowAccent) {
        gsap.to(heroLogoGlowAccent, {
          x: glowDX * 1.4,
          y: glowDY * 1.4,
          duration: 1.0,
          ease: 'power1.out',
          overwrite: 'auto'
        })
      }

      // Orbital rings: individual rotateX/rotateY multipliers
      if (orbitalOne) {
        gsap.to(orbitalOne, {
          x: glowDX * 0.5,
          y: glowDY * 0.5,
          rotateX: 65 + tiltX * 0.35,
          rotateY: 15 + tiltY * 0.35,
          duration: 0.95,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
      if (orbitalTwo) {
        gsap.to(orbitalTwo, {
          x: glowDX * 0.5,
          y: glowDY * 0.5,
          rotateX: -40 + tiltX * 0.35,
          rotateY: -20 + tiltY * 0.35,
          duration: 0.95,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
      if (orbitalThree) {
        gsap.to(orbitalThree, {
          x: glowDX * 0.5,
          y: glowDY * 0.5,
          rotateX: 20 + tiltX * 0.35,
          rotateY: 40 + tiltY * 0.35,
          duration: 0.95,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
    }

    heroEl.addEventListener('mousemove', function (e) {
      lastHeroPointer = { clientX: e.clientX, clientY: e.clientY }
      if (!heroIntroComplete) return
      applyHeroParallax(lastHeroPointer)
    })

    heroEl.addEventListener('mouseleave', function () {
      lastHeroPointer = null
      if (!heroIntroComplete) return
      gsap.to(heroLogoImg, {
        rotateX: 0, rotateY: 0, x: 0, y: 0, z: 30,
        duration: 1.2, ease: 'power3.out', overwrite: 'auto'
      })
      if (heroLogoGlow) {
        gsap.to(heroLogoGlow, {
          x: 0, y: 0,
          duration: 1.2, ease: 'power3.out', overwrite: 'auto'
        })
      }
      if (heroLogoGlowAccent) {
        gsap.to(heroLogoGlowAccent, {
          x: 0, y: 0,
          duration: 1.2, ease: 'power3.out', overwrite: 'auto'
        })
      }
      if (orbitalOne) {
        gsap.to(orbitalOne, {
          x: 0, y: 0, rotateX: 65, rotateY: 15,
          duration: 1.2, ease: 'power3.out', overwrite: 'auto'
        })
      }
      if (orbitalTwo) {
        gsap.to(orbitalTwo, {
          x: 0, y: 0, rotateX: -40, rotateY: -20,
          duration: 1.2, ease: 'power3.out', overwrite: 'auto'
        })
      }
      if (orbitalThree) {
        gsap.to(orbitalThree, {
          x: 0, y: 0, rotateX: 20, rotateY: 40,
          duration: 1.2, ease: 'power3.out', overwrite: 'auto'
        })
      }
    })

    // ============ 4. GSAP LOGO INTRO ANIMATION TIMELINE ============
    var tl = gsap.timeline({
      delay: 0.4,
      onComplete: function () {
        heroIntroComplete = true
        // Idle animations: logoFloat (3s alternate)
        gsap.to(heroLogoWrapper, {
          y: -7,
          rotation: 0.4,
          duration: 3.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
        // Glow pulse (2.5s alternate)
        if (heroLogoGlow) {
          gsap.to(heroLogoGlow, {
            opacity: 0.75,
            scale: 1.06,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        }
        if (heroLogoGlowAccent) {
          gsap.to(heroLogoGlowAccent, {
            opacity: 0.82,
            scale: 1.04,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        }
        // If pointer was already over hero during intro, apply parallax now
        if (lastHeroPointer) applyHeroParallax(lastHeroPointer)
      }
    })

    // Logo wrapper fade+scale in
    tl.fromTo(heroLogoWrapper,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
    // Orbital rings fade in (outer → middle → inner stagger)
    if (orbitalEls.length) {
      tl.fromTo(orbitalEls,
        { opacity: 0, scale: 0.65 },
        { opacity: 1, scale: 1, duration: 2.0, ease: 'power3.out', stagger: 0.12 },
        '0.15'
      )
    }
    // Glow layers: opacity + scale bounce
    if (glowEls.length) {
      tl.fromTo(glowEls,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out' },
        '0.1'
      )
    }

    // Fade in hero content after logo
    var heroTagline = document.querySelector('.hero-tagline')
    var heroStats = document.querySelector('.hero-stats')
    var heroSubtitle = document.querySelector('.hero-subtitle')
    var heroCta = document.querySelector('.btn-primary')

    if (heroTagline) {
      tl.fromTo(heroTagline,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
    }
    if (heroStats) {
      tl.fromTo(heroStats,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
    }
    if (heroSubtitle) {
      tl.fromTo(heroSubtitle,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      )
    }
    if (heroCta) {
      tl.fromTo(heroCta,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }
  }

  // ============ 5. COUNTER ANIMATION (GSAP) ============
  function animateCounterGSAP(el) {
    var text = el.textContent
    var match = text.match(/[\d,]*\d+(?:\.\d+)?/)
    if (!match) return
    var raw = match[0].replace(/,/g, '')
    var target = parseFloat(raw)
    if (isNaN(target)) return
    var suffix = text.slice(match.index + match[0].length)
    var prefix = text.slice(0, match.index)
    var isDecimal = raw.indexOf('.') !== -1
    var decimals = isDecimal ? raw.split('.')[1].length : 0

    var obj = { val: 0 }

    if (typeof gsap !== 'undefined') {
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power3.out',
        onUpdate: function () {
          var display
          if (isDecimal) {
            display = obj.val.toFixed(decimals)
          } else {
            display = Math.floor(obj.val)
          }
          // Format with commas for thousands
          var parts = display.toString().split('.')
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          el.textContent = prefix + parts.join('.') + suffix
        },
        onComplete: function () {
          var finalDisplay
          if (isDecimal) {
            finalDisplay = target.toFixed(decimals)
          } else {
            finalDisplay = Math.floor(target)
          }
          var p = finalDisplay.toString().split('.')
          p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          el.textContent = prefix + p.join('.') + suffix
        }
      })
    } else {
      // Fallback: set directly
      var finalDisplay
      if (isDecimal) {
        finalDisplay = target.toFixed(decimals)
      } else {
        finalDisplay = Math.floor(target)
      }
      var p = finalDisplay.toString().split('.')
      p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      el.textContent = prefix + p.join('.') + suffix
    }
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounterGSAP(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el)
  })

  // ============ 6. NAVIGATION SCROLL TRACKING ============
  var sections = document.querySelectorAll('section[id]')
  var navLinks = document.querySelectorAll('.nav-links a')
  var navEl = document.getElementById('navbar')

  if (sections.length && navLinks.length) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id')
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href')
            link.classList.toggle('active', href === '#' + id)
          })
        }
      })
    }, { threshold: 0.25 })
    sections.forEach(function (s) { sectionObs.observe(s) })
  }

  // Nav scroll shadow: add scrolled class when scrollY > 50
  if (navEl) {
    function updateNavShadow() {
      var scrolled = window.scrollY > 50
      navEl.classList.toggle('scrolled', scrolled)
    }
    window.addEventListener('scroll', updateNavShadow, { passive: true })
    updateNavShadow()
  }

  // ============ 7. SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href')
      if (href === '#') return
      e.preventDefault()
      var target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  // ============ 8. NAV PROGRESS BAR ============
  var progressBar = document.getElementById('navProgress')
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY
      var total = document.documentElement.scrollHeight - window.innerHeight
      progressBar.style.width = total > 0 ? (scrolled / total) * 100 + '%' : '0%'
    }, { passive: true })
  }

  // ============ 9. SCROLL INDICATOR FADE ============
  var scrollInd = document.querySelector('.scroll-indicator')
  if (scrollInd) {
    window.addEventListener('scroll', function () {
      scrollInd.style.opacity = window.scrollY > 100 ? '0' : '1'
      scrollInd.style.transition = 'opacity 0.4s ease'
    }, { passive: true })
  }

  // ============ 10. PRINCIPLE CARD CLICK-TO-EXPAND ============
  function togglePlaybook(id, el) {
    var playbookDiv = typeof id === 'string' ? document.getElementById(id) : id
    var isCurrentlyOpen = el.classList.contains('is-open')

    // Close any other open playbooks
    document.querySelectorAll('.principle-card.is-open').forEach(function (other) {
      if (other !== el) {
        other.classList.remove('is-open')
      }
    })
    document.querySelectorAll('.bento-card.is-open').forEach(function (other) {
      if (other !== el) {
        other.classList.remove('is-open')
      }
    })

    if (!isCurrentlyOpen) {
      el.classList.add('is-open')
      if (playbookDiv && typeof gsap !== 'undefined') {
        gsap.fromTo(playbookDiv,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        )
      }
    }
  }

  // Principle cards: click to expand
  document.querySelectorAll('.principle-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return
      var expandEl = card.querySelector('.principle-expand')
      if (!expandEl) return
      togglePlaybook(expandEl, card)
    })
  })

  // Bento cards: click to expand
  document.querySelectorAll('.bento-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return
      var revealEl = card.querySelector('.bento-reveal')
      if (!revealEl) return
      togglePlaybook(revealEl, card)
    })
  })

  // ============ 11. READING MODE TOGGLE ============
  var body = document.body
  var pills = document.querySelectorAll('.rm-pill')

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active') })
      pill.classList.add('active')

      var mode = pill.getAttribute('data-mode')
      body.setAttribute('data-mode', mode)

      // Additional class-based reading mode styling
      body.classList.remove('reading-visual', 'reading-standard', 'reading-deep')
      if (mode === 'standard') {
        body.classList.add('reading-standard')
      } else if (mode === 'deep') {
        body.classList.add('reading-deep')
      }
      // 'visual' is the default, no extra class needed
    })
  })

  // ============ 12. PSYCHOLOGY PLAYGROUND TAB SWITCHER ============
  window.switchTab = function (tabId, el) {
    if (!el) return
    // Highlight active tab
    var tabContainer = el.parentElement
    if (tabContainer) {
      tabContainer.querySelectorAll('[data-tab]').forEach(function (tab) {
        tab.classList.remove('active')
      })
    }
    el.classList.add('active')

    // Switch content panels
    var playground = el.closest('.playground, .solution-playground')
    if (!playground) {
      // Try global scope
      playground = document.querySelector('.playground, .solution-playground')
    }
    if (playground) {
      playground.querySelectorAll('.playground-panel, .tab-panel').forEach(function (panel) {
        panel.classList.remove('active')
      })
      var targetPanel = document.getElementById(tabId) || playground.querySelector('[data-panel="' + tabId + '"]')
      if (targetPanel) {
        targetPanel.classList.add('active')
      }
    }
  }

  // Initialize playground tabs if they exist
  document.querySelectorAll('.playground-tab, [data-tab]').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      var tabId = this.getAttribute('data-tab')
      if (tabId && window.switchTab) {
        window.switchTab(tabId, this)
      }
    })
  })

  // ============ 13. PERFORMANCE: PASSIVE SCROLL LISTENERS ============
  // All window scroll listeners already use { passive: true } where applicable

  // ============ BOOT LOG ============
  console.log(
    '%c ANAROCK %c Psychology of Sales Intelligence %c v3.0 ',
    'background:#9f5295;color:white;font-size:14px;font-weight:bold;padding:8px 12px;border-radius:4px 0 0 4px;',
    'background:#1a1020;color:#d46be0;font-size:14px;font-weight:500;padding:8px 12px;',
    'background:#9f5295;color:white;font-size:11px;padding:8px 12px;border-radius:0 4px 4px 0;'
  )
  console.log('  GSAP 3.12.2  ·  Spring Physics  ·  Hooke\'s Law Hover  ·  Hero 3D Parallax')
  console.log('  12 Principles  ·  10 CRM Vectors  ·  Visual/Standard/Deep Reading Modes')
})()
