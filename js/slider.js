// Объявляем слайдер глобально для того что бы он был доступен для его уничтожения
var useSlider;

$(window).on('load', function () {
    //Инициализируем слайдер с курсами
    var coursSlider = new Slider({});
    coursSlider.init($('#course-slider'));

    //Получаем инстанс слайдера
    Common.getCourseSlider = coursSlider.instance;

    //Инициализируем слайдер с отзывами
    var reviewsSlider = new Slider({
        mouseDrag: false,
        items: 3,
        slideBy: 3,
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 7000,
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
            },
            1024: {
                items: 3,
                slideBy: 3,
            }
        }
    });
    reviewsSlider.init($('#reviews-slider'));

    //Инициализируем слайдер с "Как использывать видео уроки"
    useSlider = new Slider({margin: 0, loop: true});

    if ($(window).width() <= 639) {
        useSlider.init($('#use-slider'));
    } else {
        if ($('#use-slider .owl-loaded').length) {
            useSlider.destroy();
        }
    }
});

$(window).on('resize', function () {
    if ($(window).width() <= 639) {
        useSlider.init($('#use-slider'));
    } else {
        if ($('#use-slider .owl-loaded').length) {
            useSlider.destroy();
        }
    }
});


//Класс слайдеа
var Slider = function (settings) {
    this.instance = null;
    this.container = null;
    this.settings = $.extend({
        items: 1,
    }, settings || {});
}

Slider.prototype.init = function (selector) {
    this.container = selector;
    this.instance = selector.find('.owl-carousel');
    this.instance.owlCarousel(this.settings);
    this.events();
};
Slider.prototype.destroy = function () {
    this.instance.owlCarousel('destroy');
};
Slider.prototype.events = function () {
    var self = this;
    var container = this.container;

    container.on('dragged.owl.carousel', function () {
        var id = Number($(this).find('.owl-item.active').data('id'));

        Common.updateRangeSlider(id);
    });

    container.on('click', '[data-move="next"]', function () {
        var id = Number($('#course-slider .owl-item.active').data('id')) + 1;

        self.instance.trigger('next.owl.carousel');

        Common.updateRangeSlider(id);
    });

    container.on('click', '[data-move="prev"]', function () {
        var id = Number($('#course-slider .owl-item.active').data('id')) - 1;

        self.instance.trigger('prev.owl.carousel');

        Common.updateRangeSlider(id);
    });
}
