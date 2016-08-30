$(document).ready(function() {
    var $window = $(window),
        $body = $('body');
    
    
    
    //sidebar position
    var $sidebarScrolling = $('.sidebar-scrolling'),
        windowScrollTop = $window.scrollTop();
        
    if ($sidebarScrolling.length) {
        var sidebarScrollingPosition = $('.sidebar-scrolling').offset().top,
            sidebarHeight = $sidebarScrolling.height(),
            menuHeight = $('.header').height();
        
        function checkSidebarPosition() {
            windowScrollTop = $window.scrollTop();
            var footerPosition = $('.footer').offset().top - sidebarHeight - 60;
            
            if (sidebarScrollingPosition < windowScrollTop) {
                $sidebarScrolling.addClass('is-fixed');
            } else {
                $sidebarScrolling.removeClass('is-fixed');
            }
            
            //not right calculation for this, may be due to fonts, so:
            setTimeout(function() {
                footerPosition = $('.footer').offset().top - sidebarHeight - 60;
            }, 0);
            
            if (windowScrollTop >= footerPosition) {
                $sidebarScrolling.addClass('is-fixed-bottom');
                $sidebarScrolling.css('top', footerPosition - menuHeight);
            } else {
                $sidebarScrolling.removeClass('is-fixed-bottom');
                $sidebarScrolling.css('top', '0px');
            }
        }
        
        checkSidebarPosition();
        
        $window.on('scroll', function() {
            checkSidebarPosition();
        });
    }
    
    
    
    //toggle menu in sidebar
    var $menuLinks = $('.sidebar__menu_link'),
        $menuLinksParents = $menuLinks.parent('li'),
        $hiddenMenuBlocks = $('.sidebar__menu_sub');
    
    $menuLinks.on('click', function(e) {
        var $thisHiddenMenu = $(this).siblings('ul'),
            $thisParent = $(this).parent('li');
        
        if ($thisHiddenMenu.length) {
            e.preventDefault();
            
            if ($thisParent.hasClass('is-active')) {
                $hiddenMenuBlocks.stop().slideUp(300);
                $menuLinksParents.removeClass('is-active');
            } else {
                $hiddenMenuBlocks.stop().slideUp(300);
                $thisHiddenMenu.stop().slideDown(300);
                $menuLinksParents.removeClass('is-active');
                $thisParent.addClass('is-active');
            }
            
        }
    });
    
    
    
    //sidebar catalog
    var $catalogLinks = $('.sidebar__menu_link-scroll'),
        checkingElementsYPositions = [];
    
    if ($catalogLinks.length) {
        $catalogLinks.each(function(index, element) {
            var targetBlock = $(element).attr('href'),
                $targetBlock = $(targetBlock),
                startPosition = $targetBlock.offset().top - 20,
                stopPosition = startPosition + $targetBlock.height(),
                $targetBlockPosition = [startPosition, stopPosition];
        
            checkingElementsYPositions.push($targetBlockPosition);
        });
        
        checkPosition(checkingElementsYPositions);
        
        $window.on('scroll', function() {
            windowScrollTop = $window.scrollTop();
            checkPosition(checkingElementsYPositions);
        });
    }
    
    $catalogLinks.on('click', function(e) {
        e.preventDefault();
        var targetBlock = $(this).attr('href'),
            scrollTarget = $(targetBlock).offset().top;
        
        $("html, body").stop().animate({scrollTop: scrollTarget}, '700', 'linear');
    });
    
    function checkPosition(positions) {
        for (var i = 0; i < positions.length; i++) {
            if ((windowScrollTop > positions[i][0]) && (windowScrollTop < positions[i][1])) {
                $catalogLinks.eq(i).addClass('is-active');
            } else {
                $catalogLinks.eq(i).removeClass('is-active');
            }
        }
    }
    
    
    
    //toggle blocks in sidebar form
    var $toggleFormBlocksButton = $('.form__container_title_toggle');
    
    $toggleFormBlocksButton.on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $(this).closest('.form__container').find('.form__container_in').stop().slideToggle(300);
    });
    
    
    
    //toggle lots
    var $toggleSlideContainer = $('.block__docs_lot'),
        $toggleSlideBlocks = $toggleSlideContainer.find('.block__docs_lot_content'),
        $toggleSlideLinks = $toggleSlideContainer.find('.slide-toggle-info');
    
    $toggleSlideLinks.on('click', function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.block__docs_lot'),
            $target = $parent.find('.block__docs_lot_content');
        
        if ($parent.hasClass('is-opened')) {
            $target.stop().slideUp(700);
            $parent.removeClass('is-opened');
        } else {
            $toggleSlideContainer.removeClass('is-opened');
            $toggleSlideBlocks.stop().slideUp(700);
            $parent.addClass('is-opened');
            $target.stop().slideDown(700);
        }
    });
    
    
    
    //tabs on providers page
    var $tabLinks = $('.block__tabs_tab'),
        $tabsBlocks = $('.tabs__info');
    
    $tabLinks.on('click', function(e) {
        e.preventDefault();
        
        if ($(this).hasClass('is-active')) {
            return false;
        }
        
        var target = $(this).attr('href'),
            $target = $(target);
        
        $tabLinks.removeClass('is-active');
        $tabsBlocks.hide().removeClass('is-active');
        $(this).addClass('is-active');
        $target.fadeIn(300).addClass('is-active');
    });
    
    
    
    //slider on article page
    $('.slider__articles').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        prevArrow: '<span class="slider__articles_prev"></span>',
        nextArrow: '<span class="slider__articles_next"></span>'
    });
    
    //slider on procurement training page
    $('.slider__partners').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        prevArrow: '<span class="slider__partners_prev"></span>',
        nextArrow: '<span class="slider__partners_next"></span>'
    });
    
    //slider on clients top
    $('.slider__clients').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        fade: true,
        speed: 1000,
        arrows: false,
        dots: true,
        appendDots: $('.content__in_dots'),
        slide: '.slider__clients_slide'
    });
    
    //slider on clients reviews
    $('.slider__testi').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        prevArrow: '<span class="slider__testi_prev"></span>',
        nextArrow: '<span class="slider__testi_next"></span>'
    });
    
    //sliders on social page
    if ($('.slider__social_bottom').length) {
        var slidesSocialNumber = $('.slider__social_bottom_slide').length;
        
        $('.slider__social_bottom_slide_all').text(slidesSocialNumber);
    }
    
    $('.slider__social_top').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        speed: 1000,
        asNavFor: '.slider__social_bottom'
    });
    
    $('.slider__social_bottom').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider__social_top',
        focusOnSelect: true,
        prevArrow: '<span class="slider__social_bottom_left"></span>',
        nextArrow: '<span class="slider__social_bottom_right"></span>',
        speed: 1000
    });
});
