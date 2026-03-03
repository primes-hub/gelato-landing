$(document).ready(function(){
    $('body').addClass('sub');
    $('body').removeClass('main');

    // 모바일헤더 swiper
    // const slider = function (elem, pagi) {
    //     const mobileHeaderSlide = new Swiper(elem, {
    //         slidesPerView: 'auto',
    //         observer: true,
    //         observeParents: true,
    //         freeMode: true,
    //         grabCursor: true,
    //     });
    // }
    // slider('.sub-nav-mobile .swiper' );



    // 서브메뉴 (드롭다운)
    $('.sub-nav .parent-data').click(function(){
        $(this).find('ul').slideToggle();
        $(this).toggleClass('rotate');
        $('.sub-nav .child-data-box').stop().slideUp();
        $('.sub-nav .child-data').removeClass('rotate');
    });

    $('.sub-nav .child-data').click(function(){
        $(this).find('ul').slideToggle();
        $(this).toggleClass('rotate');
        $('.sub-nav .parent-data-box').stop().slideUp();
        $('.sub-nav .parent-data').removeClass('rotate');
    });

    $('html').click(function(e){
        if(!$(e.target).hasClass('p-link')){
            $('.sub-nav .parent-data-box').stop().slideUp();
            $('.sub-nav .child-data-box').stop().slideUp();
            $('.sub-nav .parent-data').removeClass('rotate');
            $('.sub-nav .child-data').removeClass('rotate');
        }
    });


    // 회사소개 -> 사업장현황
    $('#company.location .kakao-btn').click(function () {
        $(this).parent().toggleClass('on');
    });

    // 게시판 - 목록에서 사용하는 검색 select
    commonUtils.uiSelectMenu('#searchCategory');

    // 제품 상세2
    const slide05 = new Swiper('#productView2 .swiper', {
        speed : 1000,
        slidesPerView: 4.5,
        spaceBetween: 14,
        direction: 'vertical',
        observer: true,
        observeParents: true,
    });

    $('#productView2 .view-top .swiper-slide img').click(function () {
        const imgUrl = $(this).attr('src');
        console.log(imgUrl)
        $('#productView2 .img-wrap .img img').attr('src', imgUrl);
    });
});