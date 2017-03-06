(function($) {
    $.fn.cardUp = function(opts) {
        var $$this = $(this);
        var defaultOpts = {
            itemWidth: 300,
            gutterX: 20,
            gutterY: 30
        };
        $(window).on("resize", function() {
            $$this.css("width", "auto");
            render($$this);
        });
        var getConWidth = function($item, winWidth, opts) {
            var conWidth = 0;
            $item.each(function(idx) {
                var gutter = opts.gutterX * idx;
                var offRight = idx * opts.itemWidth + gutter + opts.itemWidth;
                if (winWidth > offRight) {
                    conWidth = offRight;
                }
            });
            return conWidth;
        };
        var getGrid = function($item, winWidth, opts) {
            var grid = 0;
            $item.each(function(idx) {
                var gutter = opts.gutterX * idx;
                var offRight = idx * opts.itemWidth + gutter + opts.itemWidth;
                if (winWidth > offRight) {
                    grid++;
                }
            });
            return grid;
        };
        var getOffset = function($item, idx, grid, opts) {
            var offset = {
                top: 0,
                left: 0
            };
            var offTopArr = [];
            function sliceTopArr(items) {
                if (offTopArr.length < grid) {
                    var cItem;
                    var cIdx = 0;
                    for (var i = 0; i < items.length; i++) {
                        if (i == 0) {
                            cItem = items.eq(i);
                            continue;
                        }
                        var $this = items.eq(i);
                        var trans = $this.prop("style").transform.split(/[()]/)[1];
                        var posy = trans.split(",")[1];
                        var offBottom = parseInt(posy) + $this.outerHeight();
                        var cTrans = cItem.prop("style").transform.split(/[()]/)[1];
                        var cPosy = cTrans.split(",")[1];
                        var cOffBottom = parseInt(cPosy) + cItem.outerHeight();
                        if (cOffBottom < offBottom) {
                            cItem = $this;
                            cIdx = i;
                        }
                    }
                    offTopArr.push(cItem);
                    items.splice(cIdx, 1);
                } else {
                    return;
                }
                sliceTopArr(items);
            }
            if (idx >= grid) {
                sliceTopArr($item.slice(0, idx));
                var minOff;
                $(offTopArr).each(function(i) {
                    if (i == 0) {
                        minOff = $(this);
                    } else {
                        var trans = minOff.prop("style").transform.split(/[()]/)[1];
                        var posy = trans.split(",")[1];
                        var minOffBottom = parseInt(posy) + minOff.outerHeight();
                        var cTrans = $(this).prop("style").transform.split(/[()]/)[1];
                        var cPosy = cTrans.split(",")[1];
                        var cOffBottom = parseInt(cPosy) + $(this).outerHeight();
                        if (minOffBottom > cOffBottom) {
                            minOff = $(this);
                        }
                    }
                });
                if (minOff != undefined) {
                    var currTrans = minOff.prop("style").transform.split(/[()]/)[1];
                    var posx = currTrans.split(",")[0];
                    var posy = currTrans.split(",")[1];
                    offset.left = parseInt(posx);
                    offset.top = parseInt(posy) + $(minOff).outerHeight() + opts.gutterY;
                }
            } else {
                offset.left = idx * opts.itemWidth + opts.gutterX * idx;
            }
            return offset;
        };
        var render = function($this) {
            var option = $.extend({}, defaultOpts, opts || {});
            var $container = $this;
            var $item = $container.children();
            var winWidth = $container.outerWidth();
            var containerHeight = 0;
            var grid = getGrid($item, winWidth, option);
            var containerWidth = getConWidth($item, winWidth, option);
            $item.each(function(idx) {
                var col = idx % grid;
                var gutter = col * option.gutterX;
                var itemHeight = $(this).outerHeight();
                var offset = getOffset($item, idx, grid, option);
                var itemWidth = option.itemWidth + "px";
                var position = "absolute";
                var marginTop = "0";
                var transform = "translate(" + offset.left + "px, " + offset.top + "px)";

                if (grid <= 1) {
                    itemWidth = "100%";
                    containerWidth = "100%";
                    position = "static";
                    marginTop = option.gutterY + "px";
                    transform = "translate(0px, 0px)";
                }

                $(this).css({
                    position: position,
                    top: "0",
                    left: "0",
                    width: itemWidth,
                    marginTop: marginTop,
                    transform: transform,
                    transition: "transform 0.3s"
                });
                //var offBottom = $(this).position().top + itemHeight;
                var cTrans = $(this).prop("style").transform.split(/[()]/)[1];
                var offBottom = parseInt(cTrans.split(",")[1]) + $(this).outerHeight();
                if (containerHeight < offBottom) {
                    containerHeight = offBottom;
                }

                if (grid <= 1) {
                    containerHeight = 'auto';
                }
            });
            $container.css({
                position: "relative",
                width: containerWidth,
                height: containerHeight,
                margin: "0 auto"
            });
        };
        return this.each(function() {
            render($(this));
        });
    };
})(jQuery);