$(function () {
    var hl = $('.highlight'),
         newsList = $('.news-headlines'),
    newsListItems = $('.news-headlines li'),
    firstNewsItem = $('.news-headlines li:nth-child(1)'),
      newsPreview = $('.news-preview'),
          elCount = $('.news-headlines').children(':not(.highlight)').index(),
         vPadding = (parseInt(firstNewsItem.css('padding-top').replace('px', ''), 10)) +
                    (parseInt(firstNewsItem.css('padding-bottom').replace('px', ''), 10)),
          vMargin = (parseInt(firstNewsItem.css('margin-top').replace('px', ''), 10)) +
                    (parseInt(firstNewsItem.css('margin-bottom').replace('px', ''), 10)),
          myTimer = null,
         siblings = null,
      totalHeight = null,
          indexEl = 1,
                i = null;

    function doEqualHeight() {
        if (newsPreview.height() < newsList.height()) {
            newsPreview.height(newsList.height());
        } else if ((newsList.height() < newsPreview.height()) && (newsList.height() > parseInt(newsPreview.css('min-height').replace('px', ''), 10))) {
            newsPreview.height(newsList.height());
        }
    } //-- doEqualHeight()

    function doTimedSwitch() {
        myTimer = setInterval(function () {
            if (($('.selected').prev().index() + 1) === elCount) {
                firstNewsItem.trigger('click');
            } else {
                $('.selected').next(':not(.highlight)').trigger('click');
            }
        }, 3000);
    } //-- doTimedSwitch()

    function doClickItem() {

        newsListItems.on('click', function () {

            newsListItems.removeClass('selected');
            $(this).addClass('selected');

            siblings = $(this).prevAll();
            totalHeight = 0;

            // this loop calculates the height of individual elements, including margins/padding
            for (i = 0; i < siblings.length; i += 1) {
                totalHeight += $(siblings[i]).height();
                totalHeight += vPadding;
                totalHeight += vMargin;
            }

            // this moves the highlight vertically the distance calculated in the previous loop
            // and also corrects the height of the highlight to match the current selection
            hl.css({
                top: totalHeight,
                height: $(this).height() + vPadding
            });

            indexEl = $(this).index() + 1;

            $('.news-content:nth-child(' + indexEl + ')').siblings().removeClass('top-content');
            $('.news-content:nth-child(' + indexEl + ')').addClass('top-content');

            clearInterval(myTimer);
            doTimedSwitch();

        });

    } //-- doClickItem()

    function doWindowResize() {

        $(window).resize(function () {

            clearInterval(myTimer);
            setTimeout(function () {
                $('.selected').trigger('click');
            }, 1000);

            doEqualHeight();

        });

    } //-- doWindowResize()

    //-- initate the script
    doClickItem();
    doWindowResize();
    setTimeout(function () {
        doEqualHeight();
    }, 500);
    $('.selected').trigger('click');
});