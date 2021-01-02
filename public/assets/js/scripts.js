/* global WebKitCSSMatrix */

const React = require('react')
const sleep = require('p-sleep')

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 300 // px/s
}

const getElementSize = (element) => {
  const elementStyles = window.getComputedStyle(element)
  const widthString = elementStyles.getPropertyValue('width')
  const width = Number(widthString.split('px')[0])
  const heightString = elementStyles.getPropertyValue('height')
  const height = Number(heightString.split('px')[0])
  return { x: width, y: height }
}

const pythagoras = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

const animateOut = async (element, speed, easeIn = false) => {
  const startPos = getTranslate(element)
  const bodySize = getElementSize(document.body)
  const diagonal = pythagoras(bodySize.x, bodySize.y)

  const velocity = pythagoras(speed.x, speed.y)
  const time = diagonal / velocity
  const multiplier = diagonal / velocity

  const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y)
  let rotateString = ''

  const rotationPower = 200

  if (easeIn) {
    element.style.transition = 'ease ' + time + 's'
  } else {
    element.style.transition = 'ease-out ' + time + 's'
  }

  if (getRotation(element) === 0) {
    rotateString = rotationString((Math.random() - 0.5) * rotationPower)
  } else if (getRotation(element) > 0) {
    rotateString = rotationString((Math.random()) * rotationPower / 2 + getRotation(element))
  } else {
    rotateString = rotationString((Math.random() - 1) * rotationPower / 2 + getRotation(element))
  }

  element.style.transform = translateString + rotateString

  await sleep(time * 1000)
}

const animateBack = (element) => {
  element.style.transition = settings.snapBackDuration + 'ms'
  const startingPoint = getTranslate(element)
  const translation = translationString(startingPoint.x * -settings.bouncePower, startingPoint.y * -settings.bouncePower)
  const rotation = rotationString(getRotation(element) * -settings.bouncePower)
  element.style.transform = translation + rotation

  setTimeout(() => {
    element.style.transform = 'none'
  }, settings.snapBackDuration * 0.75)

  setTimeout(() => {
    element.style.transition = '10ms'
  }, settings.snapBackDuration)
}

const getSwipeDirection = (speed) => {
  if (Math.abs(speed.x) > Math.abs(speed.y)) {
    return (speed.x > 0) ? 'right' : 'left'
  } else {
    return (speed.y > 0) ? 'up' : 'down'
  }
}

const calcSpeed = (oldLocation, newLocation) => {
  const dx = newLocation.x - oldLocation.x
  const dy = oldLocation.y - newLocation.y
  const dt = (newLocation.time - oldLocation.time) / 1000
  return { x: dx / dt, y: dy / dt }
}

const translationString = (x, y) => {
  const translation = 'translate(' + x + 'px, ' + y + 'px)'
  return translation
}

const rotationString = (rot) => {
  const rotation = 'rotate(' + rot + 'deg)'
  return rotation
}

const getTranslate = (element) => {
  const style = window.getComputedStyle(element)
  const matrix = new WebKitCSSMatrix(style.webkitTransform)
  const ans = { x: matrix.m41, y: matrix.m42 }
  return ans
}

const getRotation = (element) => {
  const style = window.getComputedStyle(element)
  const matrix = new WebKitCSSMatrix(style.webkitTransform)
  const ans = -Math.asin(matrix.m21) / (2 * Math.PI) * 360
  return ans
}

const dragableTouchmove = (coordinates, element, offset, lastLocation) => {
  const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y }
  const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() }
  const translation = translationString(pos.x, pos.y)
  const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000
  const rotation = rotationString(rotCalc * settings.maxTilt)
  element.style.transform = translation + rotation
  return newLocation
}

const touchCoordinatesFromEvent = (e) => {
  const touchLocation = e.targetTouches[0]
  return { x: touchLocation.clientX, y: touchLocation.clientY }
}

const mouseCoordinatesFromEvent = (e) => {
  return { x: e.clientX, y: e.clientY }
}

const TinderCard = React.forwardRef(({ flickOnSwipe = true, children, onSwipe, onCardLeftScreen, className, preventSwipe = [] }, perentRef) => {
  const swipeAlreadyReleased = React.useRef(false)

  let elementGlobal

  React.useImperativeHandle(perentRef, () => ({
    async swipe (dir = 'right') {
      if (onSwipe) onSwipe(dir)
      const power = 1000
      const disturbance = (Math.random() - 0.5) * 100
      if (dir === 'right') {
        await animateOut(elementGlobal, { x: power, y: disturbance }, true)
      } else if (dir === 'left') {
        await animateOut(elementGlobal, { x: -power, y: disturbance }, true)
      } else if (dir === 'up') {
        await animateOut(elementGlobal, { x: disturbance, y: power }, true)
      } else if (dir === 'down') {
        await animateOut(elementGlobal, { x: disturbance, y: -power }, true)
      }
      elementGlobal.style.display = 'none'
      if (onCardLeftScreen) onCardLeftScreen(dir)
    }
  }))

  const handleSwipeReleased = React.useCallback(async (element, speed) => {
    if (swipeAlreadyReleased.current) { return }
    swipeAlreadyReleased.current = true

    // Check if this is a swipe
    if (Math.abs(speed.x) > settings.swipeThreshold || Math.abs(speed.y) > settings.swipeThreshold) {
      const dir = getSwipeDirection(speed)

      if (onSwipe) onSwipe(dir)

      if (flickOnSwipe) {
        if (!preventSwipe.includes(dir)) {
          await animateOut(element, speed)
          element.style.display = 'none'
          if (onCardLeftScreen) onCardLeftScreen(dir)
          return
        }
      }
    }

    // Card was not flicked away, animate back to start
    animateBack(element)
  }, [swipeAlreadyReleased, flickOnSwipe, onSwipe, onCardLeftScreen, preventSwipe])

  const handleSwipeStart = React.useCallback(() => {
    swipeAlreadyReleased.current = false
  }, [swipeAlreadyReleased])

  const ref = React.useCallback((element) => {
    if (!element) { return } // necesarry?
    elementGlobal = element
    let offset = { x: null, y: null }
    let speed = { x: 0, y: 0 }
    let lastLocation = { x: 0, y: 0, time: new Date().getTime() }
    let mouseIsClicked = false

    element.addEventListener(('touchstart'), (ev) => {
      ev.preventDefault()
      handleSwipeStart()
      offset = { x: -touchCoordinatesFromEvent(ev).x, y: -touchCoordinatesFromEvent(ev).y }
    })

    element.addEventListener(('mousedown'), (ev) => {
      ev.preventDefault()
      mouseIsClicked = true
      handleSwipeStart()
      offset = { x: -mouseCoordinatesFromEvent(ev).x, y: -mouseCoordinatesFromEvent(ev).y }
    })

    element.addEventListener(('touchmove'), (ev) => {
      ev.preventDefault()
      const newLocation = dragableTouchmove(touchCoordinatesFromEvent(ev), element, offset, lastLocation)
      speed = calcSpeed(lastLocation, newLocation)
      lastLocation = newLocation
    })

    element.addEventListener(('mousemove'), (ev) => {
      ev.preventDefault()
      if (mouseIsClicked) {
        const newLocation = dragableTouchmove(mouseCoordinatesFromEvent(ev), element, offset, lastLocation)
        speed = calcSpeed(lastLocation, newLocation)
        lastLocation = newLocation
      }
    })

    element.addEventListener(('touchend'), (ev) => {
      ev.preventDefault()
      handleSwipeReleased(element, speed)
    })

    element.addEventListener(('mouseup'), (ev) => {
      if (mouseIsClicked) {
        ev.preventDefault()
        mouseIsClicked = false
        handleSwipeReleased(element, speed)
      }
    })

    element.addEventListener(('mouseleave'), (ev) => {
      if (mouseIsClicked) {
        ev.preventDefault()
        mouseIsClicked = false
        handleSwipeReleased(element, speed)
      }
    })
  }, [handleSwipeReleased, handleSwipeStart])

  return (
    React.createElement('div', { ref, className }, children)
  )
})

module.exports = TinderCard
/*End here*/

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
    $('.vc-action-btn').click(function(){
        if($('.action-menu').hasClass('active')) {
            $('.action-menu').removeClass('active');
        } else {
            $('.action-menu').addClass('active');
        }
    });
    
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

    $('.users-listing__slider').owlCarousel({
        loop: false,
        margin: 15,
        nav: false,
        autoplay: false,
        merge: true,
        autoplayTimeout: 6000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                mergeFit: true,
                items: 18,

            }
        }
    });
    
    
        
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

    var pane = $('.search-people-row');
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

$(document).ready(function () {
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
        console.log("Current step: " + +range.attr("step"));
        console.log("Current value: " + +range.val());

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
    
    
/* become member */
    
    $("#edit-profile").click(function(){
        $(".edit-profile-modal").addClass("active");
        
    })
    
     $("#coin-spend").click(function(){
        $(".coin-spend-modal").addClass("active");
        
    })
    
     $("#blacklist").click(function(){
        $(".blacklist-modal").addClass("active");
        
    })
    
    $("#setting").click(function(){
        $(".setting-modal").addClass("active");
        
    })
    
     $("#gift-modal").click(function(){
        $(".all-gifts-wrapper").addClass("active");
        
    })
    
    $("#edit-first-step").click(function(){ 
        $(".edit-second-step").addClass("active-second-step");
        $(".edit-first-step").addClass("disable-first-step");
    })    
    
    
    
});
