/* =========================================================================
    Get Url Parameter
========================================================================= */

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results || 0;
}

/* =========================================================================
    Wait For Image
========================================================================= */


 $('.js-wait-for-image').waitForImages(function() {
    $('.hidden-before-images-ready').animate({
        opacity: '1'
    }, 200);
 });



/* =========================================================================
    Mobile Nav
========================================================================= */


// $('.mobile-navbar-nav-overlay, .mobile-navbar-nav').swipe( {
//     //Single swipe handler for left swipes
//     swipeLeft:function(event, direction, distance, duration, fingerCount) {
//         $('.mobile-nav-trigger').trigger('click');
//     },
//     //Default is 75px, set to 0 so any distance triggers swipe
//     threshold:0
// });

$(document).on('click', '.mobile-navbar-nav .next-level-trigger',function(){
    $(this).siblings('.mobile-navbar-nav .nav-list-level-2-wrapper').css('z-index', '1');
    $('.mobile-navbar-nav').addClass('level-2-open');
});


$(document).on('click', '.mobile-navbar-nav .prev-level-trigger',function(){
    $('.mobile-navbar-nav').removeClass('level-2-open');
    var mobileNavTranslateBackFired = false;
    $('.mobile-navbar-nav-list').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        if ( !mobileNavTranslateBackFired ) {
            mobileNavTranslateBackFired = true;
            $('.mobile-navbar-nav .nav-list-level-2-wrapper').css('z-index', '0');
        }
    });
});


/* =========================================================================
    Browser Scrolled Detect
========================================================================= */

function scrolledCheck() {

    if ($(window).scrollTop() > 0) {
        $('body').addClass('browser-scrolled');
    } else {
        $('body').removeClass('browser-scrolled');
    }

    if ($(window).scrollTop() > $('.desktop-navbar').outerHeight()) {
        $('body').addClass('navbar-condensed');
    } else {
        $('body').removeClass('navbar-condensed');
    }

}

scrolledCheck();

$(window).on('scroll', function() {
    scrolledCheck();
});

/* =========================================================================
    Browser Scroller
========================================================================= */


$(document).on('click', '.js-browser-scroller', function() {

    if($('.browser-scrolled').length){
        $('html,body').animate({ scrollTop: 0 }, 700);
    }
    else{
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }

});


/* =========================================================================
    Sroll Down Window Height
========================================================================= */

$(document).on('click', '.js-scroll-down-window-height', function() {

    $('html, body').animate({
        scrollTop: $(window).height() - $('.desktop-navbar').height()
    }, 600, 'easeOutExpo');

});


/* =========================================================================
    Scroll To Element
========================================================================= */


$(document).on('click', '.js-body-scroll-to-element', function() {
    var elementSelector = $(this).data('element-selector');
    var scrollOffset = $(this).data('scroll-offset');
    $('html, body').animate({
        scrollTop: $(elementSelector).offset().top - scrollOffset
    }, 600, 'easeOutExpo');
});



/* =========================================================================
    100vh Backup
========================================================================= */

function setHeight100vh() {
    $('.height-100vh').height($(window).height());
}
if (!Modernizr.cssvhunit) {
    setHeight100vh();
    $(window).resize($.debounce(250, setHeight100vh));
}

 /* =========================================================================
    Search
========================================================================= */

$('.desktop-navbar-search').hover(
    function() {
        $(this).addClass('open');
    },
    function() {
         $(this).removeClass('open');
    });

/* =========================================================================
    Dropdown
========================================================================= */

 if ($('html.mod-no-mobile').length) {

    $('.js-dropdown-hover').hover(
        function() {
            $(this).addClass('open');
        },
         function() {
            $(this).removeClass('open');
        });

 }

 if ($('html.mod-mobile').length) {

    $(document).on('click', '.js-dropdown-toggle', function() {

        var $dropdown = $(this).parent();

        $dropdown.toggleClass('open')
                .siblings('.dropdown').removeClass('open');

    });


 }

$(document).on('click', '.js-dropdown-toggle-update', function() {

    var $this = $(this);

    $this.parents('.dropdown').find('.dropdown-toggle').html($this.html());

});



/* =========================================================================
    Body Class
========================================================================= */


$(document).on('click', '.js-body-add-class', function() {
    $('body').addClass($(this).data('body-class'));
});

$(document).on('click', '.js-body-remove-class', function() {
    $('body').removeClass($(this).data('body-class'));
});

$(document).on('click', '.js-body-toggle-class', function() {
    $('body').toggleClass($(this).data('body-class'));
});


/* =========================================================================
    Element Fadein Fadeout
========================================================================= */


$(document).on('click', '.js-element-fadein', function() {
    $($(this).data('element-selector')).fadeIn(400);
});

$(document).on('click', '.js-element-fadeout', function() {
    $($(this).data('element-selector')).fadeOut(400);
});

$(document).on('click', '.js-element-toggle', function() {
    $($(this).data('element-selector')).fadeToggle(400);
});

$(document).on('click', '.js-element-fadeinout', function() {

    var $this = $(this);
    var index = $this.index();

    var $switchTargets = $($this.data('element-selector'));
    var $activeTarget = $switchTargets.filter(':visible');

    $this.addClass('active').siblings().removeClass('active');

    if($activeTarget.length){
        $activeTarget.fadeOut(0, function() {
            $switchTargets.eq(index).fadeIn(0); 
        });
    }
    else{
        $switchTargets.eq(index).fadeIn(0); 
    }

});

$(document).on('click', '.js-element-slideupdown', function() {

    var $this = $(this);
    var index = $this.index();

    var $switchTargets = $($this.data('element-selector'));
    var $activeTarget = $switchTargets.filter(':visible');

    $this.addClass('active').siblings().removeClass('active');

    if($activeTarget.length){
        $activeTarget.slideUp(300, function() {
            $switchTargets.eq(index).slideDown(300); 
        });
    }
    else{
        $switchTargets.eq(index).slideDown(300); 
    }

});



/* =========================================================================
    Stop Propagation
========================================================================= */


 $(document).on('click', '.js-stop-propagation', function(event) {
    event.stopPropagation();
 });


/* =========================================================================
    Tab
========================================================================= */


 $(document).on('click', '.tab-label', function(event) {

    event.preventDefault();

    var $this = $(this);
    var index = $this.index();

    var $tabContent = $this.parents('.tab').find('.tab-content');

    $this.addClass('active').siblings().removeClass('active');

    $tabContent.filter(':visible').fadeOut(0, function() {
        $tabContent.eq(index).fadeIn(0); 
    });

 });




/* =========================================================================
    Pagination Load More Ajax
========================================================================= */

(function () {
    

var paginationIsLoading = false;

$(document).on('click', '.js-pagination-load-more', function(event) {

    event.preventDefault();

    var $ajaxWrapper = $('#pagination-load-more-target');

    var ajaxURL = $(this).attr('href');

    $.ajax({
        url: ajaxURL,
        dataType: "html"
    })

    .done(function(data) {

        console.log('load');

        // loadmore button update
        var $pagination = $(data).find('.pagination-load-more');

        $('.pagination-load-more-wrapper').html($pagination);

        var ajaxURLNext = $('.pagination-load-more').attr('href');

        if (!ajaxURLNext) {
                $('.pagination-load-more-wrapper').remove();
        }

        // append the new items
        var $items = $(data).find('#pagination-load-more-target > *');

        $items.css('opacity', '0');

        $ajaxWrapper.append($items);

        // show the new items
        var $itemsWaitForImages = $items.length >= 3 ? $items.eq(2) : $items;
        $itemsWaitForImages.waitForImages(function() {
                $items.animate({
                        opacity: '1'
                }, 400);
        });

        //set the flag
        paginationIsLoading = false;

    });
});



if ($('html.mod-no-mobile').length && $('.pagination-style-scroll').length) {

    $(window).scroll($.throttle(250, function() {

        var limit = 3 * $(window).height();
        if ($(document).height() - $('body').scrollTop() < limit) {
            if(!paginationIsLoading){
                paginationIsLoading = true;
                $('.pagination-load-more').trigger('click');
            }
        }

    }));

}







}());


/* =========================================================================
    Slide Tone Class Spread
========================================================================= */

function slideToneClassSpread(sliderData,dataAttribute,classPrefix,element){

    var regex = new RegExp("(^|\\s)"+classPrefix+"\\S+", "g");

    var $slide = sliderData.currSlide.content;

    element.removeClass(function (index, css) {
        return (css.match (regex) || []).join(' ');
    });

    element.addClass($slide.data(dataAttribute));

}


/* =========================================================================
    Product Image Fullscreen
========================================================================= */


$(document).on('click', '.js-product-image-fullscreen', function() {
    $('.product-image-popup').fadeIn().find('img').prop('src', $(this).find('img').prop('src'));
});


/* =========================================================================
    Email Subscribe Popup
========================================================================= */

if (!$.cookie('site_visited')) {
    $('.subscribe-popup').fadeIn();
    $.cookie('site_visited', 'true', {
         expires: 7,
         path: '/'
    });
}


if($('html.mod-mobile').length){

    $(document).on('click', '.subscribe-popup', function() {
        $(this).addClass('open');
    });

}



/* =========================================================================
    Email Subscribe
========================================================================= */



$('.subscribe-form-subscribe').on('click', function ( event ) {
    event.preventDefault();

    var $form = $(this).parents('.subscribe-form')

    if ( validate_input($form) )
        { register($form); }
});


function validate_input($form) {
    if ( $form.find('input').val() == "" )
        return false;
    else
        return true;
}

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'jsonp',
        jsonp : 'c',
        contentType: "application/json; charset=utf-8",
        error: function(err) {
            alert("Could not connect to the server. Please try again later.");
        },
        success: function(data) {
            if(data.result=='error'){
                var msg = data.msg;
                if (msg.indexOf("already") >= 0){
                    msg = 'Thank you. This email address was previously subscribed to our mailing list.';
                }
                else{
                    msg = 'Please enter a valid email address.';
                }
                $form.find('.subscribe-form-response').fadeIn('slow').html(msg);
            }
            else{
                 if (Modernizr.mq('(min-width: 768px)')) {
                    $form.find('.subscribe-form-response').fadeIn('slow').html('Thank you!');
                 }
                 else {
                    $form.addClass('success');
                 }

                 setTimeout(function() {
                    $form.trigger("reset");
                    $form.removeClass('success');
                 }, 2000);


            }

        }
    });
}



/* =========================================================================
    Customer
========================================================================= */

if ($('.template-directory-customers').length) {


    $(document).on('click', '.js-reset-password-fadein', function() {

        $('.recover-password-form').fadeIn(0);
        $('.customer-login-form').fadeOut(0);

    });

    $(document).on('click', '.js-rest-password-fadeout', function() {

        $('.recover-password-form').fadeOut(0);
        $('.customer-login-form').fadeIn(0);

    });



    // Initialize observers on address selectors, defined in shopify_common.js

    if ($('.template-customers-addresses').length) {

        new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
          hideElement: 'AddressProvinceContainerNew'
        });
   
        // Initialize each edit form's country/province selector

        $(document).on('click', '.address-country-option', function() {

            var formId = $(this).data('form-id');
            var countrySelector = 'AddressCountry_' + formId;
            var provinceSelector = 'AddressProvince_' + formId;
            var containerSelector = 'AddressProvinceContainer_' + formId;

            new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
                hideElement: containerSelector
            });
        });

        $(document).on('click', '.address-delete', function() {
            var $el = $(this);
            var formId = $el.data('form-id');
            var confirmMessage = $el.data('confirm-message');
            if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
                Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
            }
        });

    }

}


/* =========================================================================
    Fitvids
========================================================================= */

$('.fitvids').fitVids();


/* =========================================================================
    plyr
========================================================================= */

var plyrs = plyr.setup('.js-plyr', {

    controls : ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    volume: 5

});

for (var i = 0; i < plyrs.length; i++) {
    plyrs[i].on('play', function(event) {
      var instance = event.detail.plyr;
      instance.setVolume(5);

    });      
} 


/* =========================================================================
    Owl Carousel Nav
========================================================================= */

$('.owl-carousel-nav-prev').click(function() {
    $(this).parents('.owl-carousel-wrapper').find('.owl-carousel').trigger('prev.owl.carousel');
});
$('.owl-carousel-nav-next').click(function() {
    $(this).parents('.owl-carousel-wrapper').find('.owl-carousel').trigger('next.owl.carousel');
});



/* =========================================================================
    Ripple Effect
========================================================================= */


$(document).on('click', '.btn',function(e) {

    if ($(this).find('span').length === 0) {

        $(this).append('<span></span>');

        var ripple = $(this).find('span'),
            size = ( $(this).innerWidth() > $(this).innerHeight() ) ? $(this).innerWidth()*2 : $(this).innerHeight()*2,
            clickY = $(this).offset().top,
            clickX = $(this).offset().left,
            x = e.pageX - clickX,
            y = e.pageY - clickY;

        ripple.css({
            'top': y +'px',
            'left': x +'px',
        });

        ripple.animate({
            'width': size +'px',
            'height': size +'px',
            'margin-top': -size/2 +'px',
            'margin-left': -size/2 +'px',
            'opacity': 0,
        }, 600, function() {
            $(this).remove();
        });

    }
    
});











