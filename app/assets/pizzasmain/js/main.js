$(function () {

    //? menu

    $(document).ready(function () {
        $(".btn-burger").click(function () {
            $(this).toggleClass("active");
            $(".menu").slideToggle(300, function () {
                if ($(this).css("display") === "none") {
                    $(this).removeAttr("style");
                }
            });
        });
    });
    //*/menu



    // ?tabs

    $(".work-wrapper").each(function () {
        let ths = $(this);
        ths.find(".tabs__blocks").not(":first").hide();
        ths
            .find(".link")
            .click(function () {
                ths
                    .find(".link")
                    .removeClass("is-active")
                    .eq($(this).index())
                    .addClass("is-active");
                ths.find(".tabs__blocks").hide().eq($(this).index()).fadeIn();
            })
            .eq(0)
            .addClass("is-active");
    });

    // */tabs
    
    // ?slider
    $('.pizza-items').slick({
      
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            prevArrow:'<button type="button" class="slick-prev"><img src="images/section-shop/arrow-left-market.svg" alt=""></button>',
            nextArrow:'<button type="button" class="slick-next"><img src="images/section-shop/arrow-right-market.svg" alt=""></button>',

         
    });

    // */slider

    $('.slider-comments').slick({

        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 1,
                centerMode: false,
                slidesToScroll: 1,
                variableWidth: false,
              }
            },]
       
      });
          


    // */slider



});