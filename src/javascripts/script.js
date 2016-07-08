(function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.navbar').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    $(window).on('scroll.custom', function () {
        var height = $(this).scrollTop();

        if (height > 1000) {
            drawRadialProgressBar();
            $(window).off('scroll.custom');
        }
    })

    function hasScrolled() {
        var st = $(this).scrollTop();
        console.log('st: ', st);
        console.log('lastScrollTop: ', lastScrollTop);

        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }

        if (st > lastScrollTop && st > navbarHeight) {
            $('nav').removeClass('navbar').addClass('navbar-up');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('nav').removeClass('navbar-up').addClass('navbar');
            }
        }
        lastScrollTop = st;
    }

    $('.clickProjectLink').click(function () {
        $('html, body').animate({
            scrollTop: $("#projects").offset().top
        }, 1000);
    });

    $('.clickSkillSetLink').click(function () {
        $('html, body').animate({
            scrollTop: $("#skillSet").offset().top
        }, 1000);
    });

    $('.clickAboutMeLink').click(function () {
        $('html, body').animate({
            scrollTop: $("#aboutMe").offset().top
        }, 1000);
    });

    function drawRadialProgressBar() {
        var canvas = document.getElementsByTagName('canvas');

        for (var i = 0; i < canvas.length; i++) {
            progressBar(canvas[i].id);
        }

        function progressBar(canvasId) {
            var degreesCall;
            var canvas = document.getElementById(canvasId);
            var ctx = canvas.getContext('2d');
            var cWidth = canvas.width;
            var cHeight = canvas.height;
            var progressColor = canvas.getAttribute('data-progress-bar-color');
            var circleColor = 'lightgray';
            var rawPerc = canvas.getAttribute('data-perc');
            var definition = canvas.getAttribute('data-text');
            var perc = parseInt(rawPerc);
            var degrees = 0;
            var endDegrees = (360 * perc) / 100;

            var lineWidth = 20;

            function getDegrees() {
                if (degrees < endDegrees) {
                    degrees++;
                }
                else {
                    clearInterval(degreesCall);
                }
                drawProgressBar();
            }

            function drawProgressBar() {
                ctx.clearRect(0, 0, cWidth, cHeight);
                ctx.beginPath();
                ctx.strokeStyle = circleColor;
                ctx.lineWidth = lineWidth - 1;
                ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0, Math.PI * 2, false);
                ctx.stroke();
                var radians = 0;
                radians = degrees * Math.PI / 180;
                ctx.beginPath();
                ctx.strokeStyle = progressColor;
                ctx.lineWidth = lineWidth;
                ctx.arc(cHeight / 2, cWidth / 2, cWidth / 3, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
                ctx.stroke();
                ctx.fillStyle = 'black';
                ctx.font = "bold 13px 'Open Sans', sans-serif";
                var outputTextPerc = Math.floor(degrees / 360 * 100) + '%';
                var outputTextPercWidth = ctx.measureText(outputTextPerc).width;
                var outputTextDefinitionWidth = ctx.measureText(definition).width;
                ctx.fillText(definition, cWidth / 2 - outputTextDefinitionWidth / 2, cHeight / 2 + 5);
            }

            degreesCall = setInterval(getDegrees, 10 / (degrees - endDegrees));
        }
    }
}(jQuery));