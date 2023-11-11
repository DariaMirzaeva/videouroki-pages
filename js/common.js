$(document).ready(function () {
    Common.events();
});

$(window).on('load', function () {
    $('#preloader').fadeOut(200);
    Common.init();
});

$(window).resize(function () {
    Common.resizeCleaner();
});

Common = {
    events: function () {
        $(document).on('click', '[data-faq-list-head]', this.faqListItemVisibility);
        $(document).on('click', '[data-scroll]', this.scrollToSection);
        $(document).on('scroll', this.getScrollPosition)
    },
    init: function () {
        this.setIdOnCourseSlider();
        this.rangeSliderInit();
        this.rangeSliderChange();
        this.customScrollInit();
    },
    getRangeSlider: null,
    getCourseSlider: null,
    currentScroll: null,
    savingScroll: null,
    getScrollPosition: function () {
        Common.currentScroll = $(this).scrollTop();
    },
    contentLocked: function () {
        var windowWidth = $(window).width();

        Common.savingScroll = Common.currentScroll;

        var cssProps = {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            'overflow-y': 'scroll',
            top: -Common.savingScroll,
            width: windowWidth + 'px'
        }

        $('body').css(cssProps);
    },
    contentUnlocked: function () {
        $('body, .header').removeAttr('style');
        $(document).scrollTop(Common.savingScroll);
    },
    resizeCleaner: function () {
        if ($(window).width() >= 1024) {
            $('body, .header, .nav-container').removeAttr('style');
            $('[menu-button]').removeClass('active');
        }
    },
    setIdOnCourseSlider: function () {
        $('#course-slider .owl-item').each(function (index) {
            $(this).attr('data-id', index + 1);
        })
    },
    rangeSliderInit: function () {
        var rangeSlider = $('#range-slider');
        rangeSlider.ionRangeSlider({
            skin: "round",
            hide_min_max: true,
            min: 1,
            max: $('#course-slider .owl-item').length,
            from: 1,
            step: 1
        });
        Common.getRangeSlider = rangeSlider;
    },
    rangeSliderChange: function () {
        Common.getRangeSlider.on('change', function () {
            var value = Number($(this).val());
            Common.getCourseSlider.trigger('to.owl.carousel', value - 1);
        });
    },
    updateRangeSlider: function (id) {
        var dataRangeSlider = Common.getRangeSlider.data('ionRangeSlider');

        dataRangeSlider.update({
            from: id
        });
    },
    faqListItemVisibility: function () {
        var siblingElements = $(this).closest('[data-faq-list-item]').siblings('[data-faq-list-item]');

        $(this).closest('[data-faq-list-item]').toggleClass('active').siblings('[data-faq-list-item]').removeClass('active');

        $(this).closest('[data-faq-list-item]').find('[data-faq-list-case]').slideToggle(200, function () {
            siblingElements.find('[data-faq-list-case]').slideUp(200);
        })
    },
    scrollToSection: function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var headerHeight = $('.header').height();

        $('body, html').animate({scrollTop: $('#' + id).offset().top - headerHeight}, 700);
    },
    customScrollInit: function () {
        $('.popup-container').slimScroll({
            height: '100%',
            size: 6,
            railVisible: true,
            alwaysVisible: true,
            color: '#ffd940',
            railColor: '#f2f2f2',
            distance: '18px',
            opacity: 1,
            railOpacity: 1
        });
    }
}
