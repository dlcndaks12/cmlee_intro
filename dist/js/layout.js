$(document).ready(function() {
    $("nav a").on("click", function(e) {
        var $page = $(".page-area");
        $(this).parent().addClass("active").siblings().removeClass("active");
        if ($(this).hasClass("home")) {
            $page.removeClass("active");
        }
        if ($(this).hasClass("p-list")) {
            $page.addClass("active");
            $page.load("../html/project-list.html");
        }
        $(".gnb-trigger").trigger("click");
        e.preventDefault();
    });
    $(".gnb-trigger").on("click", function(e) {
        $(this).parent().toggleClass("active");
        if ($(this).parent().hasClass("active")) {
            TweenMax.killAll();
            var tlm2 = new TimelineMax();
            tlm2.to($(".gnb-trigger .line1"), .6, {
                y: 13
            }, "hamburger1").to($(".gnb-trigger .line3"), .6, {
                y: -13
            }, "hamburger1").to($(".gnb-trigger .line2"), .2, {
                delay: .4,
                opacity: 0
            }, "hamburger1").to($(".gnb-trigger .line1"), 1, {
                ease: Elastic.easeOut.config(1, .3),
                rotation: 45
            }, "hamburger2").to($(".gnb-trigger .line3"), 1, {
                ease: Elastic.easeOut.config(1, .3),
                rotation: -45
            }, "hamburger2");
        } else {
            TweenMax.killAll();
            var tlm2 = new TimelineMax();
            tlm2.to($(".gnb-trigger .line1"), .4, {
                rotation: 0
            }, "hamburger1").to($(".gnb-trigger .line3"), .4, {
                rotation: 0
            }, "hamburger1").to($(".gnb-trigger .line2"), .2, {
                delay: .2,
                opacity: 1
            }, "hamburger2").to($(".gnb-trigger .line1"), .6, {
                ease: Elastic.easeOut.config(1, .3),
                y: 0
            }, "hamburger2").to($(".gnb-trigger .line3"), .6, {
                ease: Elastic.easeOut.config(1, .3),
                y: 0
            }, "hamburger2");
        }
        e.preventDefault();
    });
});