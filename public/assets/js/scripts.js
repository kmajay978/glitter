
$(document).ready(function () {
    $('.owl-carousel.login-carousel').owlCarousel({
        loop: true,
        margin: 50,
        nav: false,
        autoplay: true,
        autoplayTimeout: 6000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1,
            }
        }
    });


    /*-- Single Profile Carousel --*/
    $('.profile-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                mergeFit: true,
                items: 1,

            }
        }
    });
      $(".swipe").click(function () {
           
        element.addEventListener(('mouseup'), (ev) => {
            if (mouseIsClicked) {
              ev.preventDefault()
              mouseIsClicked = false
            
            }
          })
      
          element.addEventListener(('mouseleave'), (ev) => {
            if (mouseIsClicked) {
              ev.preventDefault()
              mouseIsClicked = false
            
            }
          })
        });
       

    /* TAB 1 */
    // $(".btn-countinue-1").click(function () {
    //     $("#login-tab-2").addClass("active-tab-2");
    //     $("#login-tab-2").prev().addClass("disable-tab-1");
    // });

    // $(".login-back-1").click(function () {
    //     $("#login-tab-2").removeClass("active-tab-2");
    //     $("#login-tab-2").prev().removeClass("disable-tab-1");
    // });

    // /* TAB 2 */
    // $(".btn-countinue-2").click(function () {
    //     $("#login-tab-3").addClass("active-tab-3");
    //     $("#login-tab-3").prev().addClass("disable-tab-2");
    // });
    // $(".login-back-2").click(function () {
    //     $("#login-tab-3").removeClass("active-tab-3");
    //     $("#login-tab-3").prev().removeClass("disable-tab-2");
    // });

    // /* TAB 3 */
    // $(".btn-countinue-3").click(function () {
    //     $("#login-tab-4").addClass("active-tab-4");
    //     $("#login-tab-4").prev().addClass("disable-tab-3");
    // });
    // $(".login-back-3").click(function () {
    //     $("#login-tab-4").removeClass("active-tab-4");
    //     $("#login-tab-4").prev().removeClass("disable-tab-3");
    // });

    // /* TAB 4 */
    // $(".btn-countinue-4").click(function () {
    //     $("#login-tab-5").addClass("active-tab-5");
    //     $("#login-tab-5").prev().addClass("disable-tab-4");
    // });
    // $(".login-back-4").click(function () {
    //     $("#login-tab-5").removeClass("active-tab-5");
    //     $("#login-tab-5").prev().removeClass("disable-tab-4");
    // });


    $('.feature-menu').on('click', 'li', function () {
        $('.feature-menu li.active').removeClass('active');
        $(this).addClass('active');
    });
    
    
    /*-- VIDEO CHAT ACTION MENU --*/
    // $('.vc-action-btn').click(function(){
    //     if($('.action-menu').hasClass('active')) {
    //         $('.action-menu').removeClass('active');
    //     } else {
    //         $('.action-menu').addClass('active');
    //     }
    // });
    
    /*-- Chat Box --*/
    $('.inbox-categories > div').click(function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
    });
    
    /*-- Incoming Answer --*/
    $('.btn-close, .cta-accept, .cta-reject').click(function(){
        $('.vc-incoming-wrapper').removeClass('active');
    });

    
    /*-- ALL GIFT WRAPPER --*/
    $('.all-gift-btn').click(function(){
        $('.all-gifts-wrapper').addClass('active');
    });
    $('.all-gifts-wrapper').click(function(){
        $(this).removeClass('active');
    });

    /** user search slider **/

    // $('.users-listing__slider').owlCarousel({
    //     loop: false,
    //     margin: 15,
    //     nav: false,
    //     autoplay: false,
    //     merge: true,
    //     autoplayTimeout: 6000,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 1
    //         },
    //         1000: {
    //             mergeFit: true,
    //             items: 18,

    //         }
    //     }
    // });
    
    
        
    /* screen recorder */
    
    $(".profile-swipe-wrapper").click(function(){
       
        $(".screen-recorder-modal").addClass("active");
        
    });
    
     $(".screen-recorder-modal a.btn, .modal-close img").click(function(){
         
       $(".screen-recorder-modal, .modal-wrapper").removeClass("active");
     
     });
    
    
    /* custom checkbox */
    
    $(".switch input").click(function(){
     if($(this).is(':checked')){
      $(this).parent('label').prev('span').html("Active");
     }
        else{
     $(this).parent('label').prev('span').html("InActive");
        }
        
    });

    

    //$('.search-people-row').jScrollPane();

    var pane = jQuery('.search-people-row');
    pane.jScrollPane({

        verticalDragMinHeight: 80,
        verticalDragMaxHeight: 80,
        horizontalDragMinWidth: 80,
        horizontalDragMaxWidth: 80,
        mouseWheelSpeed: 3,
        animateScroll: true,
        animateDuration: 300,
        animateEase: 'linear',
        showArrows: false,
        arrowScrollOnHover: false

    });

    var panes = $('.profile-bio-inner');
    panes.jScrollPane({

        verticalDragMinHeight: 80,
        verticalDragMaxHeight: 80,
        horizontalDragMinWidth: 80,
        horizontalDragMaxWidth: 80,
        mouseWheelSpeed: 3,
        animateScroll: true,
        animateDuration: 300,
        animateEase: 'linear',
        showArrows: false,
        arrowScrollOnHover: false

    });


});


function countryDropdown(seletor) {
    var Selected = $(seletor);
    var Drop = $(seletor + '-drop');
    var DropItem = Drop.find('li');

    Selected.click(function () {
        Selected.toggleClass('open');
        Drop.toggle();
    });

    Drop.find('li').click(function () {
        Selected.removeClass('open');
        Drop.hide();

        var item = $(this);
        Selected.html(item.html());
    });

    DropItem.each(function () {
        var code = $(this).attr('data-code');

        if (code != undefined) {
            var countryCode = code.toLowerCase();
            $(this).find('i').addClass('flagstrap-' + countryCode);
        }
    });
}

countryDropdown('#country');


/*
$(function () {
    $("#age-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#age").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#age").val("$" + $("#age-range").slider("values", 0) +
        " - $" + $("#age-range").slider("values", 1));
});
$(function () {
    $("#height-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#height").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#height").val("$" + $("#height-range").slider("values", 0) +
        " - $" + $("#height-range").slider("values", 1));
});
$(function () {
    $("#weight-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#weight").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#weight").val("$" + $("#weight-range").slider("values", 0) +
        " - $" + $("#weight-range").slider("values", 1));
});







$('input[type="range"]').rangeslider({
    polyfill: false
});

*/

$(document).ready(function () {
    /*
    var output = $(".range-slider .output");
    var range = $('.range-slider input[type="range"]');

    output.text(parseFloat(range.val()).toFixed(3));


    // function adjusStep ()

    if (+range.val() > 5 && +range.attr("step") === 3) {
        range.attr("step", "5");
        range.attr("min", "5");
        range.rangeslider("update", true);
    } else if (+range.val() === 5 && +range.attr("step") === 5) {
        range.attr("step", "3");
        range.attr("min", "2");
        range.rangeslider("update", true);
    }

    range.on("input", function () {

        output.text(parseFloat(range.val()).toFixed(3));

        if (+range.val() > 5 && +range.attr("step") === 3) {
            range.attr("step", "5");
            range.attr("min", "5");
            range.rangeslider("update", true);
        } else if (+range.val() <= 5 && +range.attr("step") === 5) {
            range.attr("step", "3");
            range.attr("min", "2");
            range.rangeslider("update", true);
        }
    });
    
    */
/* become member */
    
    // $("#edit-profile").click(function(){
    //     $(".edit-profile-modal").addClass("active");
        
    // })
    
    //  $("#coin-spend").click(function(){
    //     $(".coin-spend-modal").addClass("active");
        
    // })
    
    //  $("#blacklist").click(function(){
    //     $(".blacklist-modal").addClass("active");
        
    // })
    
    // $("#setting").click(function(){
    //     $(".setting-modal").addClass("active");
        
    // })
    
    //  $("#gift-modal").click(function(){
    //     $(".all-gifts-wrapper").addClass("active");
        
    // })
    
    
    
    $("#edit-first-step").click(function(){ 
        $(".edit-second-step").addClass("active-second-step");
        $(".edit-first-step").addClass("disable-first-step");
    })   
    
    /* var owl = $('#status-bar').owlCarousel({
        loop: false,
         slideSpeed: 3000,
        dots:true,
        margin: 0,
       smartSpeed: 1000,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1,

            }
        }
    });
    */
    
    
});
