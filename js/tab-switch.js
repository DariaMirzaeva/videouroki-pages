$(document).ready(function () {
    TabSwitch.events();
});

var TabSwitch = {
    events: function () {
        $(document).on('click', '[data-tab-button]', TabSwitch.activationCurrentTab);
    },
    activationCurrentTab: function () {
        TabSwitch.toggleTab($(this));
        TabSwitch.toggleContent($(this));
    },
    toggleTab: function (self) {
        $('[data-tab-button]').removeClass('active');
        self.addClass('active');
    },
    toggleContent: function (self) {
        var getElement = $('[data-tab-container]#' + self.data('id'));

        getElement.siblings('[data-tab-container]:visible').fadeOut(250, function () {
            getElement.fadeIn(250);
        });
    }
};
