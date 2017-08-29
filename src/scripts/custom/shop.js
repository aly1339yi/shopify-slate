/* =========================================================================
    
========================================================================= */


function updateVariantImage ($images, optionValue) {

    $images.removeClass('active')
    .filter('[data-alt-handle="' + optionValue + '"]').addClass('active');

}


/* =========================================================================
  
========================================================================= */


function updateProductSlider($productSlides, optionValue){

    var $productSliders = $('.product-shop-slider');

    var slides = $productSlides.filter('[data-alt-handle="' + optionValue + '"]');

    var html = $('<div/>').append(slides.clone()).html();

    $productSliders.each(function(){
        $(this).height($(this).height());
    });

    $productSliders.empty();

    desktopProductSliderData.destroy();
    mobileProductSliderData.destroy();

    desktopProductSliderInit(html);
    mobileProductSliderInit(html);

    $productSliders.removeAttr('style');
}


/* =========================================================================
  
========================================================================= */


function getVariantData($values, variants){

    var variantData = {};

    var option1 = null;
    var option2 = null;
    var option3 = null;

    $values.each(function() {

        var optionPosition = $(this).data('product-option-position');
        var optionValue = $(this).data('product-option-value');

        switch (optionPosition) {
            case 1:
                option1 = optionValue;
                break;
            case 2:
                option2 = optionValue;
                break;
            case 3:
                option3 = optionValue;
                break;
        }

    });

    $.each( variants, function( index, variant ) {
        if( variant.option1 == option1 && variant.option2 == option2 && variant.option3 == option3 ){

            variantData.id = variant.id;
            variantData.url = variant.url;
            variantData.price = variant.price;
            variantData.compare_at_price = variant.compare_at_price;
            variantData.available = variant.available;
            variantData.inventory_quantity = variant.inventory_quantity;

            return false;
        }
    });

    return variantData;

}


/* =========================================================================
  
========================================================================= */


function getVariantIDFromColor(color, position, variants){

    var optionKey = 'option' + position;
    var variantID = '';

    $.each( variants, function( index, variant ) {

        if( variant[optionKey] == color ){
            variantID = variant.id;

            return false;
        }
    });

    return variantID;

}


/* =========================================================================
  
========================================================================= */


function generateVariantPriceHtml (variant) {

    var priceHtml = '';

    var price = variant.price;
    var compareAtPrice = variant.compare_at_price;

    var priceFormatted = Shopify.formatMoney(price);
    var compareAtPriceFormatted = Shopify.formatMoney(compareAtPrice);

    if(price < compareAtPrice){
        priceHtml = '<span class="product-price product-price-compare-at">'+ priceFormatted +'</span><span class="product-price product-price-on-sale">' + compareAtPriceFormatted + '</span>'
    }
    else{
        priceHtml = '<span class="product-price">'+ priceFormatted +'</span>';
    }

    return priceHtml;

}


/* =========================================================================
  
========================================================================= */


function getAddToCartBtnStatus (variant) {

    var btnStatus = '';

    if(variant.available){
        if(variant.inventory_quantity > 0){
            btnStatus = 'add-to-cart';
        }
        else{
            btnStatus = 'pre-order';
        }
    }
    else{
        btnStatus = 'sold-out';
    }

    return btnStatus;
}


/* =========================================================================
  
========================================================================= */


$(document).on('click', '.js-product-card-option-value', function(){

    var $this = $(this);

    $this.addClass('selected-value active-value').siblings().removeClass('selected-value active-value');

    var colorOptionValue = $this.data('product-option-value');

    var colorOptionPosition = $this.data('color-option-position');

    var $card = $this.parents('.product-card');

    var $productLink = $card.find('.product-card-link');

    var productURL = $productLink.data('product-url');

    var $productImages = $card.find('.product-card-image');

    var product= JSON.parse($card.find('.product-json').html());

    var variants = product.variants;

    // update variant image

    updateVariantImage($productImages, colorOptionValue);

    // update variant url base on color

    var variantID = getVariantIDFromColor( colorOptionValue, colorOptionPosition, variants );

    var variantURI = '?variant=' + variantID;

    var productVariantURL = productURL + variantURI;

    $productLink.attr('href', productVariantURL);
    
});


/* =========================================================================
  
========================================================================= */


$(document).on('click', '.js-product-quick-shop-option-value', function(){

    var $this = $(this);

    // visual state update

    $this.addClass('selected-value active-value').siblings().removeClass('selected-value active-value');

    var isColor = $this.data('is-color-option-value') || false;

    var optionValue = $this.data('product-option-value');

    var optionsSize = $this.data('product-options-size');

    var $quickShop = $this.parents('.product-quick-shop');

    var $productImages = $quickShop.find('.product-quick-shop-image');

    var $activeValues = $quickShop.find('.active-value');

    var $selectedValues = $quickShop.find('.selected-value');

    var $price = $quickShop.find('.product-quick-shop-price');

    var $addToCartBtn = $quickShop.find('.product-quick-shop-add-to-cart');

    var product= JSON.parse($quickShop.find('.product-json').html());

    var variants = product.variants;

    
    if(isColor){

        // update variant image

        updateVariantImage($productImages, optionValue);

    }

    if($activeValues.length == optionsSize ){

        // update variant id

        var variantData = getVariantData($activeValues, variants);

        $addToCartBtn.attr('data-variant-id', variantData.id);

        // update variant price

        var variantPriceHtml = generateVariantPriceHtml(variantData);

        $price.html(variantPriceHtml);

    }

    if($selectedValues.length == optionsSize ){

        // update add to cart button

        var btnStatus = getAddToCartBtnStatus(variantData);
        var btnText = $addToCartBtn.data(btnStatus+'-btn-text');

        $addToCartBtn.text(btnText);

        switch (btnStatus) {
            case 'add-to-cart':
                $addToCartBtn.removeAttr('disabled');
                break;
            case 'pre-order':
                $addToCartBtn.removeAttr('disabled');
                break;
            case 'sold-out':
                $addToCartBtn.attr('disabled', 'disabled');
                break;
        }

    }


});


/* =========================================================================
  
========================================================================= */


$(document).on('click', '.js-product-shop-option-value', function(){

    var $this = $(this);

    // visual state update

    $this.addClass('selected-value active-value').siblings().removeClass('selected-value active-value');

    var isColor = $this.data('is-color-option-value') || false;

    var optionValue = $this.data('product-option-value');

    var optionsSize = $this.data('product-options-size');

    var addToCartJSClass = $this.data('add-to-cart-js-class');

    var backInStockJSClass = $this.data('back-in-stock-js-class');

    var $shop = $this.parents('.product-shop');

    var $productSlides = $('.product-images-data').children('.product-shop-slide');

    var $activeValues = $shop.find('.active-value');

    var $selectedValues = $shop.find('.selected-value');

    var $price = $shop.find('.product-shop-price');

    var $backInStockField = $shop.find('.product-shop-back-in-stock-field');

    var $addToCartBtn = $shop.find('.product-shop-add-to-cart');

    var product= JSON.parse($shop.find('.product-json').html());

    var variants = product.variants;

    
    if(isColor){

        // update variant image
        // update product slider

        updateProductSlider($productSlides, optionValue);

    }

    if($activeValues.length == optionsSize ){

        // update variant id

        var variantData = getVariantData($activeValues, variants);

        $addToCartBtn.attr('data-variant-id', variantData.id);

        // update variant price

        var variantPriceHtml = generateVariantPriceHtml(variantData);

        $price.html(variantPriceHtml);

    }

    if($selectedValues.length == optionsSize ){

        // update add to cart button

        var btnStatus = getAddToCartBtnStatus(variantData);
        var btnText = $addToCartBtn.data(btnStatus+'-btn-text');

        $addToCartBtn.text(btnText).removeAttr('disabled');

        switch (btnStatus) {
            case 'add-to-cart':
                $backInStockField.fadeOut(0);
                $addToCartBtn.removeClass( backInStockJSClass ).addClass( addToCartJSClass );
                break;
            case 'pre-order':
                $backInStockField.fadeOut(0);
                $addToCartBtn.removeClass( backInStockJSClass ).addClass( addToCartJSClass );
                break;
            case 'sold-out':
                $backInStockField.fadeIn(300);
                $addToCartBtn.removeClass( addToCartJSClass ).addClass( backInStockJSClass );
                break;
        }

    }


});


/* =========================================================================
  
========================================================================= */


$(document).on('click', '.js-product-add-to-cart', function(){


    var variantID = $(this).attr('data-variant-id');

    CartJS.addItem(variantID, 1, {}, {

    "success": function(data, textStatus, jqXHR) {

        //Open Mini Cart
        setTimeout(function(){
            $('body').addClass('mini-cart-open');

            // setTimeout(function(){
            // $('body').removeClass('mini-cart-open');
            // }, 2000);

        }, 300);

    },

    "error": function(jqXHR, textStatus, errorThrown) {

    }

    });


});



/* =========================================================================
  
========================================================================= */


$(document).on('cart.requestComplete', function(event, data) {

    //console.log(data);


});


/* =========================================================================
  
========================================================================= */


$(document).on('click', '.js-product-back-in-stock-submit',function() {

    var $this = $(this);

    var $emailInput = $('.product-shop-back-in-stock-email');

    var email = $emailInput.val();

    var productID = $this.attr('data-product-id');

    var variantID = $this.attr('data-variant-id');


    BIS.create(email, variantID, productID).then(function(data) {

        var msg = '';

        if (data.status == 'OK') {

          msg = 'success'; 
        }

        else {

            //console.log(data.errors);

            var error = '';

            for (var k in data.errors) {
                error += (k + " " + data.errors[k].join());
            }
            
            if (error.indexOf("already") >= 0){
                msg = 'success'; 
            }
            else if (error.indexOf("invalid") >= 0){
                msg = 'invalid email'; 
            }
            else{
                msg = 'error'; 
            }

        }

        $this.text(msg);


    });

});















