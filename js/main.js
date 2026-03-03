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