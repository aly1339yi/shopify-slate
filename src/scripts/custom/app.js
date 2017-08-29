
/* =========================================================================
    Homepage Page
========================================================================= */

if ($('.template-index').length) {


}






/* =========================================================================
    Collection Page
========================================================================= */


if ($('.template-collection').length) {

    tinysort('.js-size-sort',{data:'size-sort',order:'desc'});

    $(".size-s").insertAfter($(".size-xs"));
    $(".size-m").insertAfter($(".size-s"));
    $(".size-l").insertAfter($(".size-m"));
    $(".size-xl").insertAfter($(".size-l"));
    $(".size-onesize").insertAfter($(".size-onesize").parent().children().last());


    $(document).on('click', '.js-sort-cookie', function() {
        $this = $(this);
        sortKeyWord = $this.text();
        $.cookie('collection_sort_keyword', sortKeyWord, {
            expires: 7,
            path: '/'
        });
    });

    var collectionSortKeyword = $.cookie('collection_sort_keyword');
    if(collectionSortKeyword && $.urlParam('sort_by')){
        $('#sort-key-word').text(' (' + collectionSortKeyword + ')');
    }




}

/* =========================================================================
    Product Page
========================================================================= */


if ($('.template-product').length) {

    var desktopProductSliderData = null;
    var mobileProductSliderData = null;

    function desktopProductSliderInit(sliders) {

        desktopProductSliderData = $('.desktop-product-shop-slider').royalSlider({

            controlNavigation : 'none',
            arrowsNav         : true,
            arrowsNavAutoHide : false,
            loop              : true,
            transitionType    : 'fade',
            addActiveClass    : true,
            autoHeight        : true,

            slides            : sliders

        }).data('royalSlider');

    }

    function mobileProductSliderInit(sliders) {

        mobileProductSliderData = $('.mobile-product-shop-slider').royalSlider({

            controlNavigation : 'bullets',
            arrowsNav         : false,
            arrowsNavAutoHide : false,
            loop              : true,
            transitionType    : 'move',
            addActiveClass    : true,
            autoHeight        : true,

            slides            : sliders

        }).data('royalSlider');

    }


    $('.desktop-product-shop-slider').waitForImages(function() {

        desktopProductSliderInit(null);

    });

    $('.mobile-product-shop-slider').waitForImages(function() {

        mobileProductSliderInit(null);

    });


}

































