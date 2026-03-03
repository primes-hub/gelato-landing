// 페이지 없는 메뉴 클릭 시 alert
function fn_alert_preparing() {
    alert('준비중입니다.');
}




// header bg function
// 외부 js에서 사용할 수 있으므로 전역으로 선언
let headerBox;
let hLogo;
let hDep1a;
let hSitemapBtn;

let tween1;
let tween2;
let tween3;
let tween4;

const plusHeaderBg = function () {
    tween1.play();
    //tween2.play();
    //tween3.play();
    //tween4.play();
};
const minusHeaderBg = function () {
    tween1.reverse();
    //tween2.reverse();
    //tween3.reverse();
    //tween4.reverse();
};




$(document).ready(function () {


    AOS.init({
        // Global settings:
        //disable: 'mobile', // accepts following values: false(default), 'phone', 'tablet', 'mobile', boolean, expression or function

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        duration: 1200, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
    });


    // header bg tween init
    headerBox = document.querySelector('.header_box');
    //hLogo = document.querySelector('#header .header_box .h_logoBox a');
    //hDep1a = document.querySelectorAll('#header .header_box .h_nav .dep1 .dep1_li .dep1_a');
    //hSitemapBtn = document.querySelector('#header .header_box .siteMap_btn');

    tween1 = gsap.to(headerBox, {
        duration: .05,
        background: 'rgba(0,0,0,0.4)',
        //boxShadow: '0 0 0 1px #dfdfdf',
    });
    //tween2 = gsap.to(hLogo, {
    //    duration: .25,
    //    backgroundImage: 'url("/images/layout/logo-on.png")',
    //});
    // tween3 = gsap.to(hDep1a, {
    //    duration: .25,
    //    color: '#333',
    // });
    //tween4 = gsap.to(hSitemapBtn, {
    //    duration: .25,
    //    backgroundImage: 'url("/images/layout/btn-sitemap-on.png")',
    //});




    // splitting
    // ------------------------------------------
    Splitting({
        target: "[data-splitting]",
        by: "words", // 단어로: words, 글자로: chars
    });
    setSplitting();

    function setSplitting() {
        let $splittingTxt = $(".custom-splitting");

        // Splitting Word Set Delay
        $($splittingTxt).each(function () {
            splittingTextDelay($(this), $(this).data("duration"), $(this).data("delay-speed"));
        });

        // Splitting word 번역기능 비활성화
        $(".splitting .char").attr("translate", "no");
    }

    function splittingTextDelay(object, duration, delaySpeed = 0) {
        // 문장별 animation-duration, animation-delay 커스텀
        $(object).find('.word').css('animation-duration', `${duration}s`);
        $(object).find('.word').css('animation-delay', `${delaySpeed}s`);
    }




    // Scroll Trigger
    // ------------------------------------------
    gsap.registerPlugin(ScrollTrigger);

    // scroll 시 요소 보일때 애니메이션 실행
    // .scroll-ani : 트리거 클래스
    // .custom-splitting : splitting.js 커스텀한 클래스
    gsap.utils.toArray(".scroll-ani.custom-splitting").forEach(function (elem) {
        ScrollTrigger.create({
            trigger: elem,

            onEnter: function () { $(elem).addClass('on') },
            onEnterBack: function () { $(elem).addClass('on'); },

            onLeave: function () { $(elem).removeClass('on'); },
            onLeaveBack: function () { $(elem).removeClass('on'); }
        });
    });

    // scroll 시 요소 보일때 애니메이션 실행
    // .scroll-ani : 트리거 클래스
    gsap.utils.toArray(".scroll-ani").forEach(function (elem) {
        ScrollTrigger.create({
            trigger: elem,

            start: 'top 80%', // default: "top bottom"
            end: 'bottom top', // default: "bottom top"

            onEnter: function () { $(elem).addClass('on') },
            onEnterBack: function () { $(elem).addClass('on'); },

            // onLeave: function() { $(elem).removeClass('on'); },
            // onLeaveBack: function() { $(elem).removeClass('on'); }
        });
    });




    // Gnb
    // ------------------------------------------
    const header = document.querySelector('#header');
    const ham = document.querySelector('.siteMap_btn');



    // gnb (PC)
    $('#header .h_nav .dep1_li').mouseenter(function () {
        //$('#header').addClass('open');
        //$(this).addClass('on');
        //$('#header .h_nav .dep2, #header .lnb-bg').stop().slideDown(300);
        plusHeaderBg();
    });
    $('#header .h_nav .dep1_li').mouseleave(function () {
        //$('#header').removeClass('open');
        //$(this).removeClass('on');
        //$('#header .h_nav .dep2, #header .lnb-bg').stop().slideUp(300);
        minusHeaderBg();

        if (window.scrollY > 0) {
            plusHeaderBg();
        } else {
            minusHeaderBg();
        }
    });


    $('#header .h_nav .dep1_li').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
    });

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();

        $('.main .section[id]').each(function () {
            var sctId = $(this).attr('id');
            var offsetTop = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();

            if (scrollPos >= offsetTop - 100 && scrollPos < offsetTop + sectionHeight - 100) {
                $('.dep1_li').removeClass('on');
                $('.dep1_a[href="#' + sctId + '"]').closest('.dep1_li').addClass('on');
            }
        });
    });

    // header hover
    header.addEventListener('mouseenter', () => {
        plusHeaderBg();
    });

    header.addEventListener('mouseleave', () => {
        //minusHeaderBg();

        if (window.scrollY > 0) {
            plusHeaderBg();
        } else {
            minusHeaderBg();
        }
    });




    // 스크롤하면 헤더 배경색 추가
    function addHeaderBg(scrollY) {
        if (scrollY > 0) {
            plusHeaderBg();
        } else {
            minusHeaderBg();
        }
    }
    addHeaderBg(window.scrollY);
    window.addEventListener('scroll', () => {
        addHeaderBg(window.scrollY);
    });




    // Gnb (mobile)
    function mobileGnb() {
        if (window.innerWidth <= 1200) {
            $(".siteMap_box .dep1>li>a").click(function (e) {
                // e.preventDefault();
                $(this).parent().toggleClass('on').siblings().removeClass('on');
                // $(this).parent().find('.sm_dep2').stop().slideToggle(300);
                // $(this).parent().siblings().find('.sm_dep2').stop().slideUp(300);

                $('.siteMap_box').removeClass('on');
                $('body').removeClass('body_bg');
            });
        }
    }
    mobileGnb();
    window.addEventListener('resize', () => {
        mobileGnb();
    });




    // top button
    $(window).scroll(function () {
        const scrollTop = $(window).scrollTop();
        const documentHeight = $(document).height();

        // fullpage 아닐 때
        if (scrollTop > 100) {
            $('#topBtn').addClass('on');
        } else {
            $('#topBtn').removeClass('on');
        }
    });

    $('#topBtn').click(function () {
        // fullpage 아닐 때
        const target = document.getElementById('container');
        target.scrollIntoView({
            behavior: 'smooth',
        });

        // fullpage 일 때
        // $.fn.fullpage.moveTo(1, 1);
    });




    // 스크롤 방향에 따라 헤더 노출 (pc, 모바일 둘 다 가능)
    let lastScrollY = 0;
    window.addEventListener('scroll', e => {
        // scroll down에 헤더 숨김
        const scrollY = window.scrollY;
        const scrollDown = scrollY > lastScrollY;
        if (scrollDown) {
            $('body').addClass('scrollDown');
        } else {
            $('body').removeClass('scrollDown');
        }
        lastScrollY = scrollY;
    });



    // sitemap open
    $('.siteMap_btn').click(function () {
        $(this).toggleClass("active");
        $('.siteMap_box').toggleClass("on");
        $('body').toggleClass('body_bg');
    });

    // sitemap close
    $('.close_btn').click(function (e) {
        e.preventDefault();
        $('body').removeClass('body_bg');
        $('.siteMap_box').removeClass('on');
        $('.siteMap_btn').removeClass("is_active");
    });

    $(window).resize(function () {
        $('body').removeClass('body_bg');
        $('.siteMap_box').removeClass('on');
        $('.siteMap_btn').removeClass("is_active");
    });


    // 다국어 언어 전환
    /*
    $('.lang-btn > li').click(function(){
        $(this).find('ul').stop().slideToggle(200, 'linear');
        $(this).find('.swich-btn > span').toggleClass('rotate');
    });
    $('.lang-btn > li').mouseout(function(){
        $(this).find('ul').stop().slideUp(300, 'linear');
        $(this).find('.swich-btn > span').css({
            'transform' : 'rotate(0) scale(0.5)',
        });
    });
     */

    // 가맹문의

    $('.bot-fixed-wrap .mo-fix-btn').on('click', function () {
        $('.bot-fixed-box').slideToggle(500);
        $(this).toggleClass('on');
    });
    $("#footer .po_pop a").click(function () {
        $(this).siblings('.popup').addClass('on');
        $('body').addClass('body_bg');
    });
    $("#footer .po_pop .pop_close_btn").click(function (e) {
        e.stopPropagation();
        $(this).closest('.popup').removeClass('on');
        $('body').removeClass('body_bg');
    });

    //layer popup
    $('.agree-chk-box .more_btn').click(function (e) {
        e.preventDefault();

        $('body').addClass('body_bg');
        $(this).siblings('.popup').addClass('on');
    });

    // 팝업 닫기
    $('.popup__close').click(function (e) {
        e.preventDefault();

        $('body').removeClass('body_bg');
        $(this).closest('.popup').removeClass('on');
    });
});