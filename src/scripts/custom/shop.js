

function updateVariantImage ($images, optionValue) {

    $images.removeClass('active')
    .filter('[data-alt-handle="' + optionValue + '"]').addClass('active');

}


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
            variantData.price = variant.price;
            variantData.compare_at_price = variant.compare_at_price;
            variantData.available = variant.available;
            variantData.inventory_quantity = variant.inventory_quantity;

            return false;
        }
    });

    return variantData;

}



function generateVariantPriceHtml (variant) {

    var priceHtml = '';

    var price = variant.price;
    var compareAtPrice = variant.compare_at_price;

    var priceFormatted = Shopify.formatMoney(price);
    var compareAtPriceFormatted = Shopify.formatMoney(compareAtPrice);

    if(price < compareAtPrice){
        priceHtml = '<del class="product-price product-price-compare-at">'+ priceFormatted +'</del><ins class="product-price product-price-on-sale">' + compareAtPriceFormatted + '</ins>'
    }
    else{
        priceHtml = '<span class="product-price">'+ priceFormatted +'</span>';
    }

    return priceHtml;

}




function getAddToCartBtnStatus (variant) {

    var btnStatus = 'data-choose-size-btn-text';

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




$(document).on('click', '.js-product-card-option-value', function(){

    var $this = $(this);

    $this.addClass('selected-value active-value').siblings().removeClass('selected-value active-value');

    var optionValue = $this.data('product-option-value');

    var $card = $this.parents('.product-card');

    var $productImages = $card.find('.product-card-image');

    updateVariantImage($productImages, optionValue);
});




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

    var $addToCartBtn = $quickShop.find('.product-add-to-cart');

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

        $('.product-quick-shop-price').html(variantPriceHtml);

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






$(document).on('click', '.js-product-quick-shop-add-to-cart', function(){


    var variantID = $(this).attr('data-variant-id');

    CartJS.addItem(variantID, 1, {}, {

    "success": function(data, textStatus, jqXHR) {

        //Open Mini Cart
        setTimeout(function(){
            $('body').addClass('mini-cart-open');

            setTimeout(function(){
            $('body').removeClass('mini-cart-open');
            }, 2000);

        }, 200);

    },

    "error": function(jqXHR, textStatus, errorThrown) {

    }

    });


});


$(document).on('cart.requestComplete', function(event, data) {




});


















