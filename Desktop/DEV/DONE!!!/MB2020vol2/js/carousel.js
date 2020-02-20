function updateDot() {
    let activeIndex = $(".active").index('.slide');

    $('.dot').removeClass('active');
    $('.dot:nth-child(' + (activeIndex + 1) + ')').addClass('active');
}

// function to change the active slide
function changeActiveSlide(thisIndex) {
    $('.slide').removeClass('active');
    $('.slide').removeClass('before');
    $('.slide').removeClass('after');
    $('.slide:nth-child(' + (thisIndex + 1) + ')').addClass('active');

    $('.slide').each(function () {
        if ($(this).index('.slide') > thisIndex) {
            $(this).addClass('after');
        } else if ($(this).index('.slide') < thisIndex) {
            $(this).addClass('before');
        }
    });

    updateDot();
}

$(function () {
    // create many .dot in .dots
    for (let i = 0; i < $('.carousel .slide').length; i++) {
        $('.dots').append('<li class="dot"></li>');
    }

    updateDot();

    // handle dots being clicked
    $('.dot').click(function () {
        changeActiveSlide($(this).index('.dot'));
    });

    // handle arrow clicks
    $('.left-arrow').click(function () {
        if ($('.active').index('.slide') > 0) {
            changeActiveSlide($('.active').index('.slide') - 1);
        }
    });

    $('.right-arrow').click(function () {
        if ($('.active').index('.slide') < $('.slide').length - 1) {
            changeActiveSlide($('.active').index('.slide') + 1);
        }
    });

    // handle dragging slides
    var startX;
    var currentX;
    var dragging = false;
    var dragDistance;
    var transformMatrix;
    var startTransformX;
    var transformXPercent;
    var activeIndex;
    var firstAfter;

    // function to set transform of slides
    function setTransform(thisTransformXPercent, element) {
        if (thisTransformXPercent < -100) {
            thisTransformXPercent = -100;
        } else if (thisTransformXPercent > 0) {
            thisTransformXPercent = 0;
        }
        // limit travel area of first and last slide
        if (element.index('.slide') == 0 && thisTransformXPercent > -50) {
            thisTransformXPercent = -50;
        } else if (element.index('.slide') == $('.slide').length - 1 && thisTransformXPercent < -50) {
            thisTransformXPercent = -50;
        }
        let transformScaleDecimal = 1 - Math.abs((thisTransformXPercent + 50) / 250);
        let boxShadowModifier = 1 - Math.abs((thisTransformXPercent + 50) / 50);
        if (transformScaleDecimal > 0.9) {
            element.css('z-index', 10);
            // prepare next 0.8 slide to be on top of others after it
            firstAfter = true;
        } else if (transformScaleDecimal > 0.8) {
            element.css('z-index', 9);
            // prepare next 0.8 slide to be on top of others after it
            firstAfter = true;
        } else if (firstAfter) {
            firstAfter = false;
            element.css('z-index', 8);
        } else {
            element.css('z-index', 7);
        }

        element.css('transform', 'translate(' + thisTransformXPercent + '%, -50%) scale(' + transformScaleDecimal + ')');

        element.css('box-shadow', '0px '
            + (boxShadowModifier * 20) + 'px '
            + (boxShadowModifier * 100) + 'px '
            + (boxShadowModifier * -10) + 'px #777');
    }

    $('.slide').on('mousedown touchstart', function (e) {
        startX = event.pageX || e.originalEvent.touches[0].pageX;
        dragging = true;
        transformMatrix = $('.slide.active').css('transform').replace(/[^0-9\-.,]/g, '').split(',');
        startTransformX = transformMatrix[12] || transformMatrix[4];
        activeIndex = $('.active').index('.slide');

        // temporarily remove transition
        $('.slide').css('transition', 'none');
    });

    $('body').on('mousemove touchmove', function (e) {
        if (dragging) {
            currentX = event.pageX || e.originalEvent.touches[0].pageX;
            dragDistance = currentX - startX;
            transformXPercent = 100 / $('.slide.active').width() * (dragDistance + parseInt(startTransformX));

            $('.slide').each(function () {
                let thisIndex = $(this).index('.slide');
                let indexDifference = thisIndex - activeIndex;
                setTransform(transformXPercent + (50 * indexDifference), $(this));
            });
            // ensure firstAfter doesn't carry-over between mouse moves
            firstAfter = false;
        }
    })
        .on('mouseup touchend', function () {
            // set active slide to current front slide
            let topSlide = 0;
            $('.slide').each(function () {
                if (parseInt($(this).css('z-index')) > parseInt($('.slide:nth-child(' + (topSlide + 1) + ')').css('z-index'))) {
                    topSlide = $(this).index('.slide');
                }
            });
            changeActiveSlide(topSlide);

            dragging = false;

            $('.slide').attr('style', '');
            // put transition back
            $('.slide').css('transition', 'transform .3s ease');
        });
});