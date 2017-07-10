

   $('.js-wait-for-image-wrapper').waitForImages(function() {
      $('.hidden-before-images-ready').animate({
         opacity: '1'
      }, 350);
   });

   // VIDEO

   $('.fitvids').fitVids();

   // BROWSER SCROLLED DETECT


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



   // 100vh BACKUP FUNCTION

   function setHeight100vh() {
      $('.height-100vh').height($(window).height());
   }
   if (!Modernizr.cssvhunit) {
      setHeight100vh();
      $(window).resize($.debounce(250, setHeight100vh));
   }

   //SEARCH
   $('.desktop-navbar-search').hover(
      function() {
         $(this).addClass('open');
      },
      function() {
         $(this).removeClass('open');
      });


   //DROPDOWN

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

      $('.js-dropdown-header-click').click(function() {

         var $dropdown = $(this).parent();

         $dropdown.toggleClass('open')
            .siblings('.dropdown').removeClass('open');

      });

   }

   // COLOR THE DROPDOWN
   $(document).on('mouseenter', '.js-color-the-dropdown', function(){
     $(this).parents('.dropdown').find('.dropdown-color-me').css('background-color', $(this).data('color-hex'));
     // $('.embroidery-preview').css('color', $(this).data('color-hex'));
   });

   $(document).on('mouseleave', '.js-color-the-dropdown', function(){
     $(this).parents('.dropdown').find('.dropdown-color-me').css('background-color', 'white');
   });




   //MINICART

   if ($('html.mod-no-mobile').length) {

      $('.desktop-mini-cart-trigger').mouseenter(function() {
         $('body').addClass('mini-cart-open');
      });

      $('.mini-cart').mouseleave(function() {
         $('body').removeClass('mini-cart-open');
      });

   }

   // BODY CLASS

   $(document).on('click', '.js-body-add-class', function() {
      $('body').addClass($(this).data('body-class'));
   });

   $(document).on('click', '.js-body-remove-class', function() {
      $('body').removeClass($(this).data('body-class'));
   });

   $(document).on('click', '.js-body-class-toggle', function() {
      $('body').toggleClass($(this).data('body-class'));
   });

   // ELEMENT FADEIN FADEOUT

   $(document).on('click', '.js-element-fadein', function() {
      $($(this).data('element-selector')).fadeIn();
   });
   $(document).on('click', '.js-element-fadeout', function() {
      $($(this).data('element-selector')).fadeOut();
   });
   $(document).on('click', '.js-element-toggle', function() {
      $($(this).data('element-selector')).fadeToggle(300);
   });


   // STOP PROPAGATION

   $(document).on('click', '.js-stop-propagation', function(event) {
      event.stopPropagation();
   });


   // SCROLL TO ELEMENT

   $(document).on('click', '.js-body-scroll-to-element', function() {
      var elementSelector = $(this).data('element-selector');
      var scrollOffset = $(this).data('scroll-offset');
      $('html, body').animate({
         scrollTop: $(elementSelector).offset().top - scrollOffset
      }, 600, 'easeOutExpo');
   });





   // IMAGE SWAP

   var imageSourceSwap = function() {

      var $this = $(this);
      var sourceAlt = $this.data('src-alt');
      $this.data('src-alt', $this.attr('src'));
      $this.attr('src', sourceAlt);

   };

   $('.js-product-image-swap').hover(imageSourceSwap, imageSourceSwap);




    //PAGINATION LOAD MORE AJAX

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






   // PRODUCT IMAGE FULLSCREEN

   $(document).on('click', '.js-product-image-fullscreen', function() {
      $('.product-image-popup').fadeIn().find('img').prop('src', $(this).find('img').prop('src'));
   });


   // EMAIL SUBSCRIBE POPUP

   if (!$.cookie('site_visited')) {
      $('.subscribe-popup').fadeIn();
      $.cookie('site_visited', 'true', {
         expires: 7,
         path: '/'
      });
   }











