jQuery(document).ready(function($) {
    'use strict';

    // Mobil Menü
    $('#main-menu-nav').clone().appendTo('.mobile-menu');
    $('.mobile-menu .has-sub').append('<div class="submenu-toggle"/>');

    $('.slide-menu-toggle').on('click', function() {
        $('body').toggleClass('nav-active');
    });

    $('.mobile-menu ul li .submenu-toggle').on('click', function(e) {
        if ($(this).parent().hasClass('has-sub')) {
            e.preventDefault();
            if (!$(this).parent().hasClass('show')) {
                $(this).parent().addClass('show').children('.m-sub').slideToggle(170);
            } else {
                $(this).parent().removeClass('show').find('> .m-sub').slideToggle(170);
            }
        }
    });

    // Arama Butonları
    $('.show-search, .show-mobile-search').on('click', function() {
        $('#nav-search, .mobile-search-form').fadeIn(250).find('input[type="search"]').focus();
    });

    $('.hide-search, .hide-mobile-search').on('click', function() {
        $('#nav-search, .mobile-search-form').fadeOut(250).find('input[type="search"]').blur();
    });

    // Sticky Sidebar
    if (typeof $.fn.theiaStickySidebar !== 'undefined') {
        $('#main-wrapper, #sidebar-wrapper').theiaStickySidebar({
            additionalMarginTop: 25,
            additionalMarginBottom: 25
        });
    }

    // Başa Dön Butonu
    var backTop = $('.back-top');
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 100) {
            backTop.fadeIn(250);
        } else {
            backTop.fadeOut(250);
        }
    });
    backTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // Owl Carousel (Örnek kullanım, özelleştirilebilir)
    if (typeof $.fn.owlCarousel !== 'undefined') {
        $('.slide-posts').owlCarousel({
            items: 4,
            rtl: false,
            nav: true,
            navText: ['', ''],
            loop: true,
            margin:10,
            autoplay: true,
            autoplayHoverPause: true,
            dots: false,
            responsive: {
                0: { items: 1 },
                768: { items: 3 },
                1000: { items: 4 }
            }
        });
    }
});