$(document).ready(function() {


   //Pagination AJAX Load More

   var paginationIsLoading = false;


   $(document).on('click', '.pagination-load-more', function(event) {

      event.preventDefault();

      var $ajaxWrapper = $('#ajax-target');

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
            var $items = $(data).find('#ajax-target > *');

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


   //////////////////////////////////////// HOMEPAGE PAGE /////////////////////////////////////

   if ($('.template-index').length) {

      $('.homepage-hero-slider-wrapper').waitForImages(function() {

         var dhhsData = $('.desktop-homepage-hero-slider').royalSlider({
            imageScaleMode: 'fill',
            controlNavigation: 'bullets',
            arrowsNav: true,
            arrowsNavAutoHide: false,
            arrowsNavHideOnTouch: true,
            loop: true,
            transitionType: 'fade',
            addActiveClass: true,
            autoPlay: {
               enabled: true,
               pauseOnHover: false,
               stopAtAction: false,
               delay: 3000
            }
         }).data('royalSlider');

      });


      $('.mobile-homepage-hero-slider').waitForImages(function() {

            var mhhsData = $('.mobile-homepage-hero-slider').royalSlider({
               controlNavigation: 'bullets',
               arrowsNav: false,
               arrowsNavAutoHide: true,
               arrowsNavHideOnTouch: true,
               loop: true,
               transitionType: 'move',
               addActiveClass: true,
               autoHeight:true,
            }).data('royalSlider');

      });

   }


   //////////////////////////////////////// COLLECTION PAGE /////////////////////////////////////

   if ($('.template-collection').length) {

      if ($('html.mod-no-mobile').length) {

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


      $(".size-p").insertAfter($(".size-pp"));
      $(".size-s").insertAfter($(".size-p"));
      $(".size-m").insertAfter($(".size-s"));
      $(".size-l").insertAfter($(".size-m"));
      $(".size-onesize").insertAfter($(".size-onesize").parent().children().last());

   }

   //////////////////////////////////////// PRODUCT PAGE /////////////////////////////////////

   if ($('.template-product').length) {

      if(!$('.embroidery').length){
         $('.mobile-product-gallery').waitForImages(function() {
             var mpgData = $('.mobile-product-gallery').royalSlider({

                 loop: true,
                 autoHeight:true,
                 arrowsNav: false

             }).data('royalSlider');
         });
      }


      $('.desktop-product-gallery').waitForImages(function() {

         var deskImageHeight = $('.desktop-product-gallery-image:first-child').outerHeight();
         $(window).resize(function() {
            deskImageHeight = $('.desktop-product-gallery-image:first-child').outerHeight();
         });
         $(window).scroll($.throttle(250, function() {
            var bodyScrollTop = $('body').scrollTop();
            var imageIndex0 = Math.floor(bodyScrollTop / deskImageHeight);
            $('.desktop-product-gallery-index').removeClass('active').eq(imageIndex0).addClass('active');
         }));


         if($('html.mod-no-mobile').length){

            $('.product-shopping-col-right, .product-page-sidebar').stick_in_parent({
               offset_top: 80,
               recalc_every: 1,
            });


         }

      });


   }


});
