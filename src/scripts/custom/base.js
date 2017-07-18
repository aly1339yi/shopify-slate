/* =========================================================================
    Wait For Image
========================================================================= */


 $('.js-wait-for-image-wrapper').waitForImages(function() {
    $('.hidden-before-images-ready').animate({
        opacity: '1'
    }, 350);
 });


/* =========================================================================
    Fitvids
========================================================================= */


 $('.fitvids').fitVids();


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

    $('.js-dropdown-toggle').click(function() {

         var $dropdown = $(this).parent();

         $dropdown.toggleClass('open')
                .siblings('.dropdown').removeClass('open');

    });

 }


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
    $($(this).data('element-selector')).fadeIn();
 });

 $(document).on('click', '.js-element-fadeout', function() {
    $($(this).data('element-selector')).fadeOut();
 });

 $(document).on('click', '.js-element-toggle', function() {
    $($(this).data('element-selector')).fadeToggle(300);
 });


/* =========================================================================
    Stop Propagation
========================================================================= */


 $(document).on('click', '.js-stop-propagation', function(event) {
    event.stopPropagation();
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
    Image Swap
========================================================================= */


 var imageSourceSwap = function() {

    var $this = $(this);
    var swapImageSrc = $this.attr('data-swap-image-src');
    $this.attr('data-swap-image-src', $this.attr('src'));
    $this.attr('src', swapImageSrc);

 };

 $('.js-product-image-swap').hover(imageSourceSwap, imageSourceSwap);


/* =========================================================================
    Pagination Load More Ajax
========================================================================= */


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


/* =========================================================================
    Customer
========================================================================= */


$(document).on('click', '.js-rest-password-fadein', function() {

    $('.recover-password-form').fadeIn(0);
    $('.customer-login-form').fadeOut(0);

});

$(document).on('click', '.js-rest-password-fadeout', function() {

    $('.recover-password-form').fadeOut(0);
    $('.customer-login-form').fadeIn(0);

});



// Initialize observers on address selectors, defined in shopify_common.js
if (Shopify) {
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew'
    });
}

// Initialize each edit form's country/province selector
$('.address-country-option').each(function() {
    var formId = $(this).data('form-id');
    var countrySelector = 'AddressCountry_' + formId;
    var provinceSelector = 'AddressProvince_' + formId;
    var containerSelector = 'AddressProvinceContainer_' + formId;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
    });
});

$('.address-delete').on('click', function() {
    var $el = $(this);
    var formId = $el.data('form-id');
    var confirmMessage = $el.data('confirm-message');
    if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
        Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
    }
});











