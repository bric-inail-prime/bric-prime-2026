/* PRIME website — slideshow + mobile menu */

document.addEventListener('DOMContentLoaded', function () {

    /* ---- MOBILE MENU ---- */
    var menuBtn = document.querySelector('a.menu-button');
    var navList = document.querySelector('ul.main-menu');
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', function (e) {
            e.preventDefault();
            navList.classList.toggle('open');
            menuBtn.classList.toggle('is-closed');
            menuBtn.classList.toggle('is-open');
        });
    }

    /* ---- SLIDESHOW ---- */
    var slides = document.querySelectorAll('ul.slideshow > li');
    var pauseBtn = document.querySelector('.slick-navigation .pause');
    var playBtn  = document.querySelector('.slick-navigation .play');
    var dotsContainer = document.querySelector('.slide-dots');

    if (!slides.length) return;

    var current = 0;
    var timer = null;
    var interval = 4500;

    // Create dots
    slides.forEach(function (_, i) {
        if (!dotsContainer) return;
        var dot = document.createElement('button');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', function () { goTo(i); });
        dotsContainer.appendChild(dot);
    });

    function goTo(n) {
        slides[current].classList.remove('active');
        updateDot(current, false);
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        updateDot(current, true);
    }

    function updateDot(i, on) {
        if (!dotsContainer) return;
        var dots = dotsContainer.querySelectorAll('.slide-dot');
        if (dots[i]) dots[i].classList.toggle('active', on);
    }

    function start() {
        if (timer) clearInterval(timer);
        timer = setInterval(function () { goTo(current + 1); }, interval);
    }

    function stop() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    // Slide click navigation
    slides.forEach(function (slide, i) {
        slide.addEventListener('click', function () {
            var url = slide.getAttribute('data-url');
            if (url) window.location.href = url;
        });
    });

    // Pause / Play
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function (e) {
            e.preventDefault();
            stop();
            pauseBtn.classList.add('hidden');
            if (playBtn) { playBtn.classList.add('visible'); }
        });
    }
    if (playBtn) {
        playBtn.addEventListener('click', function (e) {
            e.preventDefault();
            start();
            playBtn.classList.remove('visible');
            if (pauseBtn) { pauseBtn.classList.remove('hidden'); }
        });
    }

    // Init
    slides[0].classList.add('active');
    start();

    /* ---- SOCIAL SHARE TOGGLE ---- */
    var shareToggle = document.querySelector('a.share');
    var socialBox   = document.querySelector('.social');
    if (shareToggle && socialBox) {
        shareToggle.addEventListener('click', function (e) {
            e.preventDefault();
            socialBox.classList.toggle('is-opened');
            shareToggle.setAttribute('aria-expanded', socialBox.classList.contains('is-opened'));
        });
        document.addEventListener('click', function (e) {
            if (!shareToggle.contains(e.target) && !socialBox.contains(e.target)) {
                socialBox.classList.remove('is-opened');
            }
        });
    }
});
