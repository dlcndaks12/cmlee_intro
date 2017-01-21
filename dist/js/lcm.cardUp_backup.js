(function($) {
    $.fn.cardUp = function(opts) {
        var defaultOpts = {
            itemWidth: 300,
            gutterX: 20,
            gutterY: 30
        };
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
            var offTop3 = [];
            if (idx >= grid) {
                function sliceArray(arr) {
                    if (offTop3.length < grid) {
                        var num = 0;
                        var index = 0;
                        for (var i in arr) {
                            if (arr[i] > num) {
                                num = arr[i];
                                index = i;
                            }
                        }
                        console.log(num, index);
                        arr.splice(index, 1);
                        offTop3.push([ num, index ]);
                    } else {
                        return;
                    }
                    sliceArray(arr);
                }
                for (var i = 0; i < idx; i++) {
                    var cItem = $item.eq(i);
                    var offBottom = cItem.offset().top + cItem.outerHeight();
                    offTopArr.push(offBottom);
                }
                sliceArray(offTopArr);
                var min = 0;
                var minIdx = 0;
                for (var i in offTop3) {
                    if (i == 0) {
                        min = offTop3[i][0];
                        minIdx = 0;
                    } else {
                        if (min > offTop3[i][0]) {
                            min = offTop3[i][0];
                            minIdx = offTop3[i][1];
                        }
                    }
                }
                //console.log('item : ' + minIdx + ' , top : ' + min);
                offset.top = min + opts.gutterY;
                offset.left = $item.eq(minIdx).position().left;
            } else {
                offset.left = idx * opts.itemWidth + opts.gutterX * idx;
            }
            return offset;
        };
        return this.each(function() {
            var option = $.extend({}, defaultOpts, opts || {});
            var $container = $(this);
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
                var offBottom = $(this).offset().top + itemHeight;
                $(this).css({
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: option.itemWidth + "px",
                    transform: "translate(" + offset.left + "px, " + offset.top + "px)"
                });
                if (containerHeight < offBottom) {
                    containerHeight = offBottom;
                }
            });
            $container.css({
                position: "relative",
                width: containerWidth,
                height: containerHeight,
                margin: "0 auto"
            });
        });
    };
})(jQuery);