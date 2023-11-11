$(document).ready(function () {
    Popup.events();
});

var Popup = {
    events: function () {
        $(document).on('click', '[data-show-popup]', this.showPopupByContent);
        $(document).on('click', '[data-close-popup]', this.hidePopup);
        $(document).on('click', '[data-popup-overlay]', this.hidePopupOnClickOverlay);
        $(document).on('keydown', this.hidePopopOnPresEsc);
    },
    showPopup: function () {
        $('.popup').fadeIn(100).addClass('show');
    },
    hidePopup: function () {
        var visibility = $('.popup').is(':visible');
        if (visibility) {
            $('.popup').fadeOut(100, function () {
                Popup.popupContentCleaner();
                Common.contentUnlocked();
            }).removeClass('show');
        }
    },
    showPopupByContent: function (e) {
        e.stopPropagation();
        e.preventDefault();

        var self = $(this);

        Common.contentLocked();
        Popup.showPopup();
    },
    hidePopopOnPresEsc: function (e) {
        if (e.which == 27) Popup.hidePopup();
    },
    hidePopupOnClickOverlay: function (e) {
        if (!$(e.target).closest('.popup__inner').length || $(e.target).hasClass('popup-close')) {
            Popup.hidePopup();
        }
    },
    popupContentCleaner: function () {
        $('.popup__inner').children('.active').removeClass('active');
    },
};
