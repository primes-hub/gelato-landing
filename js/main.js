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
    var GOLD = '#c7a865';
    var PINS = [
        { id: 'incheon',    label: '인천', left: 32, top: 32, size: 'sm' },
        { id: 'suwon',      label: '수원', left: 41, top: 35, size: 'sm' },
        { id: 'pyeongtaek', label: '',     left: 40, top: 37, size: 'sm' },
        { id: 'daejeon',    label: '대전', left: 42, top: 48, size: 'md' },
        { id: 'sejong',     label: '',     left: 44, top: 48, size: 'sm' },
        { id: 'cheongju',   label: '',     left: 47, top: 46, size: 'sm' },
        { id: 'cheonan',    label: '',     left: 41, top: 44, size: 'sm' },
        { id: 'chungju',    label: '',     left: 50, top: 43, size: 'sm' },
        { id: 'gwangju',    label: '광주', left: 31, top: 62, size: 'md' },
        { id: 'jeonju',     label: '전주', left: 37, top: 55, size: 'sm' },
        { id: 'changwon',   label: '창원', left: 58, top: 71, size: 'sm' },
        { id: 'mokpo',      label: '',     left: 27, top: 69, size: 'sm' },
        { id: 'yeosu',      label: '',     left: 39, top: 71, size: 'sm' },
        { id: 'jinju',      label: '',     left: 54, top: 70, size: 'sm' },
        { id: 'gimhae',     label: '',     left: 62, top: 70, size: 'sm' },
        { id: 'gangneung',  label: '강릉', left: 72, top: 38, size: 'md' },
        { id: 'chuncheon',  label: '춘천', left: 52, top: 29, size: 'md' },
        { id: 'wonju',      label: '원주', left: 56, top: 33, size: 'sm' },
        { id: 'sokcho',     label: '',     left: 70, top: 27, size: 'sm' },
        { id: 'donghae',    label: '',     left: 71, top: 45, size: 'md' },
        { id: 'samcheok',   label: '',     left: 69, top: 47, size: 'sm' },
        { id: 'taebaek',    label: '',     left: 64, top: 44, size: 'sm' },
        { id: 'jeongseon',  label: '',     left: 62, top: 41, size: 'sm' },
        { id: 'yeongwol',   label: '',     left: 59, top: 41, size: 'sm' },
        { id: 'pohang',     label: '포항', left: 67, top: 54, size: 'sm' },
        { id: 'andong',     label: '',     left: 60, top: 52, size: 'sm' },
        { id: 'ulsan',      label: '울산', left: 66, top: 62, size: 'sm' },
        { id: 'jeju',       label: '제주', left: 28, top: 87, size: 'sm' }
    ];
    var SIZES = {
        lg: { mid: 11, inner: 2.8 },
        md: { mid: 6,  inner: 1.8 },
        sm: { mid: 3.5, inner: 1  }
    };
    var NS = 'http://www.w3.org/2000/svg';

    function mkCircle(attrs, style) {
        var c = document.createElementNS(NS, 'circle');
        for (var k in attrs) c.setAttribute(k, attrs[k]);
        if (style) for (var s in style) c.style[s] = style[s];
        return c;
    }

    function renderStorePins() {
        var svg = document.getElementById('sn-pins-svg');
        if (!svg) return;

        PINS.forEach(function (pin) {
            var sz = SIZES[pin.size];
            var rMid   = sz.mid   / 2;
            var rInner = sz.inner / 2;
            var outerOpacity = pin.size === 'lg' ? 0.45 : pin.size === 'md' ? 0.35 : 0.22;
            var fillOpacity  = pin.size === 'lg' ? 1    : pin.size === 'md' ? 0.85 : 0.6;

            var g = document.createElementNS(NS, 'g');
            g.setAttribute('transform', 'translate(' + pin.left + ',' + pin.top + ')');

            if (pin.size === 'lg') {
                [[0.5, '0s'], [0.4, '1s'], [0.3, '2s']].forEach(function (cfg) {
                    g.appendChild(mkCircle(
                        { 'class': 'sn-glow-ring', fill: 'none', stroke: GOLD, 'stroke-width': cfg[0] },
                        { animationDelay: cfg[1], filter: 'blur(0.3px)' }
                    ));
                });
                g.appendChild(mkCircle({ r: rMid * 1.2, fill: GOLD, opacity: '0.08' }, { filter: 'blur(1.5px)' }));
            } else if (pin.size === 'md') {
                g.appendChild(mkCircle({ r: rMid * 1.2, fill: GOLD, opacity: '0.04' }, { filter: 'blur(1.5px)' }));
            }

            g.appendChild(mkCircle({
                r: rMid,
                fill: pin.size === 'sm' ? 'rgba(199,168,101,0.06)' : 'rgba(199,168,101,0.12)',
                stroke: GOLD,
                'stroke-width': pin.size === 'lg' ? '0.3' : '0.2',
                'stroke-opacity': outerOpacity
            }));

            var inner = mkCircle({ r: rInner, fill: GOLD, 'fill-opacity': fillOpacity });
            if (pin.size === 'lg') {
                inner.setAttribute('class', 'sn-pulse-core');
                inner.style.filter = 'drop-shadow(0 0 2px rgba(199,168,101,0.8))';
            }
            g.appendChild(inner);

            if (pin.size === 'lg' && pin.label) {
                var txt = document.createElementNS(NS, 'text');
                txt.setAttribute('x', rMid + 1.5);
                txt.setAttribute('y', '0.5');
                txt.setAttribute('fill', '#fff');
                txt.setAttribute('font-size', '2.8');
                txt.setAttribute('font-weight', '600');
                txt.setAttribute('dominant-baseline', 'middle');
                txt.style.letterSpacing = '0.01em';
                txt.style.filter = 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))';
                txt.textContent = pin.label;
                g.appendChild(txt);
            }

            svg.appendChild(g);
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

// 카운트 업 함수 (jQuery animate 이용)
(function ($) {
    $.fn.countUp = function (opts) {
        const opt = $.extend({ duration: 1200, decimal: 0 }, opts);
        return this.each(function () {
            const $el = $(this);
            if ($el.data('counted')) return; // 중복 방지

            // 목표값: data-target 우선, 없으면 현재 텍스트에서 쉼표 제거 후 숫자화
            const raw = $el.data('target') ?? $el.text().replace(/,/g, '');
            const target = parseFloat(raw);

            // 시작값 0으로 보이게
            $el.text('0');

            $({ val: 0 }).animate({ val: target }, {
                duration: opt.duration,
                easing: 'swing',
                step: function (now) {
                    // 소수 필요하면 data-decimal 지정해서 사용 가능
                    const decimals = $el.data('decimal') ?? opt.decimal;
                    const curr = decimals ? now.toFixed(decimals) : Math.floor(now);
                    $el.text(formatNumber(curr));
                },
                complete: function () {
                    const decimals = $el.data('decimal') ?? opt.decimal;
                    const done = decimals ? target.toFixed(decimals) : Math.round(target);
                    $el.text(formatNumber(done));
                    $el.data('counted', true);
                }
            });
        });
    };
})(jQuery);

// 뷰포트 진입 시 한 번만 실행
$(function () {
    const $section = $('.brand-rate');

    function runCount() {
        $section.find('.num').countUp({ duration: 1400 });
    }

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    runCount();
                    io.unobserve(e.target); // 한 번만
                }
            });
        }, { threshold: 0.3 }); // 30% 보이면 실행
        if ($section.length) io.observe($section[0]);
    } else {
        // 폴백: 스크롤 체크
        let fired = false;
        function inView($el) {
            const rect = $el[0].getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            return rect.top < vh * 0.85 && rect.bottom > 0;
        }
        function onScroll() {
            if (!fired && $section.length && inView($section)) {
                fired = true;
                runCount();
                $(window).off('scroll resize', onScroll);
            }
        }
        $(window).on('scroll resize', onScroll);
        onScroll(); // 초기 체크
    }
});