(function() {
    /* header 상단 버튼 클릭시 */
    $(document).on("click", "#header .mc-blog > a, #header .alarm > a, #header .user > a", function(e) {
        $(this).next().toggleClass("active");
        return false;
    });
    /* gnb 메뉴 관련 */
    $(document).on("click", "body", function() {
        $("#header .util .active").removeClass("active");
    });
    $(document).on("click", ".mc-blog-layer, .alarm-layer, .user-layer", function(e) {
        return false;
    });
    $(document).on("mouseover focusin", ".gnb > ul > li > a", function() {
        $(this).parent().addClass("active").siblings().removeClass("active");
    });
    $(document).on("mouseover focusin", ".gnb > ul > li", function() {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(document).on("focusin", ".gnb .all-menu", function() {
        $(this).closest(".gnb").find(".active").removeClass("active");
    });
    $(document).on("mouseleave", ".gnb > ul", function() {
        $(this).children().removeClass("active");
    });
    $(document).on("click", ".gnb .all-menu", function(e) {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(this).closest(".gnb").addClass("all-open");
        } else {
            $(this).closest(".gnb").removeClass("all-open");
        }
        e.preventDefault();
    });
})();