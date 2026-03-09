$(window).on('load', function () {

    // Transitions Only After Page Load
    $('body').addClass('loaded');

    // 스크롤 상단으로
    setTimeout(() => {
        scrollTo(0, 0);
    }, 100);
    // $.fn.fullpage.moveTo(1, 1); // fullpage 페이지 (fullpage init 이후에 실행해야 작동함)


    AOS.refresh();
});



$(document).ready(function () {

    $(this).scrollTop(0);

    $('body').addClass('main');
    $('body').removeClass('sub');

    //  visual -----------------------------------------------------------------------------------------------
    // swiper
    const slider = function (elem) {
        const slide01 = new Swiper(elem, {
            effect: 'fade',
            loop: true,
            speed: 1000,
            fadeEffect: {
                crossFade: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: elem + ' .swiper-button-next',
                prevEl: elem + ' .swiper-button-prev',
            },
            pagination: {
                el: elem + ' .swiper-pagination',
                clickable: true,
                // renderBullet: function (index, className) {
                //     return '<span class="' + className + '">' + (index + 1) + "</span>";
                // },
            },
        });
    }
    slider('.main .visual .swiper');



    //  benefit  -----------------------------------------------------------------------------------------------
    // swiper
    const slide02 = new Swiper('.main .benefit-slide-box', {
        speed: 1000,
        slidesPerView: 5,
        spaceBetween: 15,
        loop: true,
        loopAdditionalSlides: 8,
        slidesPerGroup: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        // Responsive breakpoints
        breakpoints: {
            1: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            501: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            769: {
                slidesPerView: 3.5,
                spaceBetween: 15,
            },
            1300: {
                slidesPerView: 5,
                spaceBetween: 15,
            },
        }
    });

    //news 

    const slide03 = new Swiper('.main .news-slide-box', {
        speed: 300,
        slidesPerView: 3,
        spaceBetween: 40,
        //loop: true,
        loopAdditionalSlides: 8,
        slidesPerGroup: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
        // Responsive breakpoints
        breakpoints: {
            1: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            501: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1300: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        }
    });

    // gallery 
    var $pop = $('.gallery-pop-box');
    var $popImg = $pop.find('.con img');
    $('.main .gallery-slide-box').each(function () {
        var el = this;
        if (el.swiper) return;

        var sw = new Swiper(el, {

            speed: 4000,
            slidesPerView: "auto",
            freeMode: true,
            spaceBetween: 12,
            loop: true,
            loopAdditionalSlides: 7,
            allowTouchMove: false,
            simulateTouch: false,
            slidesPerGroup: 1,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            breakpoints: {
                0: { allowTouchMove: true },
                769: { allowTouchMove: false }
            }
        })
        $(el).on('click', '.swiper-slide', function (e) {
            e.preventDefault();
            var bigSrc = $(this).attr('data-img');
            if (!bigSrc) return;
            $popImg.attr('src', bigSrc);
            $pop.addClass('on');
        });
    });

    // 팝업 닫기 
    $pop.on('click', '.pop-close', function (e) {
        e.preventDefault();
        $pop.removeClass('on');
        $popImg.attr('src', '');
    });
    $pop.on('click', function (e) {
        if ($(e.target).closest('.in').length === 0) {
            $pop.removeClass('on');
            $popImg.attr('src', '');
        }
    });

    $('.privacy_btn').on('click', function (e) {
        e.preventDefault();
        $('#privacyPop').addClass('show');
    });

    $('.pop_close_btn').click(function () {
        $(this).parents('.pop_wrap').removeClass('show');
    });

});

// ─────────────────────────────────────────────────────
// Store Network – 한국 지도 핀 렌더링
// ─────────────────────────────────────────────────────
;(function () {
    var PINS = [
        /* ── lg (pulse) — 4 주요 거점 ── */
        { id: 'incheon',    left: 33, top: 33, size: 'lg' },
        { id: 'gangneung',  left: 71, top: 39, size: 'lg' },
        { id: 'daejeon',    left: 42, top: 49, size: 'lg' },
        { id: 'ulsan',      left: 67, top: 63, size: 'lg' },

        /* ── md — 8 중형 거점 ── */
        { id: 'chuncheon',  left: 52, top: 30, size: 'md' },
        { id: 'suwon',      left: 40, top: 36, size: 'md' },
        { id: 'wonju',      left: 57, top: 35, size: 'md' },
        { id: 'cheongju',   left: 47, top: 47, size: 'md' },
        { id: 'pohang',     left: 68, top: 55, size: 'md' },
        { id: 'jeonju',     left: 37, top: 58, size: 'md' },
        { id: 'changwon',   left: 59, top: 71, size: 'md' },
        { id: 'jeju',       left: 31, top: 86, size: 'md' },

        /* ── sm — 배경 분포 ── */
        { id: 'paju',       left: 35, top: 25, size: 'sm' },
        { id: 'uijb',       left: 43, top: 27, size: 'sm' },
        { id: 'gapyeong',   left: 50, top: 28, size: 'sm' },
        { id: 'hwacheon',   left: 55, top: 25, size: 'sm' },
        { id: 'inje',       left: 61, top: 27, size: 'sm' },
        { id: 'goseong',    left: 67, top: 24, size: 'sm' },
        { id: 'sokcho',     left: 70, top: 29, size: 'sm' },
        { id: 'hongcheon',  left: 56, top: 33, size: 'sm' },
        { id: 'pyeongtaek', left: 40, top: 40, size: 'sm' },
        { id: 'cheonan',    left: 42, top: 44, size: 'sm' },
        { id: 'chungju',    left: 51, top: 43, size: 'sm' },
        { id: 'taebaek',    left: 65, top: 45, size: 'sm' },
        { id: 'boryeong',   left: 35, top: 52, size: 'sm' },
        { id: 'andong',     left: 61, top: 53, size: 'sm' },
        { id: 'gunsan',     left: 33, top: 57, size: 'sm' },
        { id: 'gumi',       left: 57, top: 58, size: 'sm' },
        { id: 'gyeongju',   left: 67, top: 61, size: 'sm' },
        { id: 'naju',       left: 30, top: 67, size: 'sm' },
        { id: 'jinju',      left: 54, top: 72, size: 'sm' },
        { id: 'yeosu',      left: 42, top: 74, size: 'sm' }
    ];
    var OFFSET = { left: -7, top: -4 }; /* 전체 위치 조정: 좌측·위로 이동 */

    function renderStorePins() {
        var container = document.getElementById('sn-pins-svg');
        if (!container) return;
        container.innerHTML = '';

        PINS.forEach(function (pin) {
            var pin_div = document.createElement('div');
            pin_div.className = 'sn-pin sn-pin-' + pin.size;
            pin_div.style.left = (pin.left + OFFSET.left) + '%';
            pin_div.style.top  = (pin.top  + OFFSET.top)  + '%';

            var outer = document.createElement('div');
            outer.className = 'pin-outer';

            var inner = document.createElement('div');
            inner.className = 'pin-inner';

            pin_div.appendChild(outer);
            pin_div.appendChild(inner);
            container.appendChild(pin_div);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderStorePins);
    } else {
        renderStorePins();
    }
})();

// 쉼표 포맷터
function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ─────────────────────────────────────────────────────
// Revenue – 카운트 업
// ─────────────────────────────────────────────────────
$(document).ready(function () {
    var counted = false;

    function runCount() {
        if (counted) return;
        counted = true;

        $('.brand-rate .num').each(function () {
            var $el = $(this);
            var target = parseFloat($el.attr('data-target'));
            if (isNaN(target) || target === 0) return;

            var duration = 1400;
            var pause = 1800;

            function animate() {
                var startTime = null;
                $el.text('0');
                function step(ts) {
                    if (!startTime) startTime = ts;
                    var p = Math.min((ts - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - p, 3);
                    $el.text(formatNumber(Math.floor(eased * target)));
                    if (p < 1) {
                        requestAnimationFrame(step);
                    } else {
                        $el.text(formatNumber(target));
                        setTimeout(animate, pause);
                    }
                }
                requestAnimationFrame(step);
            }
            animate();
        });
    }

    function check() {
        var $section = $('.brand-rate');
        if (!$section.length) return;
        var top = $section.offset().top;
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if (scrollBottom > top + 60) {
            runCount();
            $(window).off('scroll.revenue resize.revenue');
        }
    }

    $(window).on('scroll.revenue resize.revenue', check);
    check(); // 초기 즉시 확인
});