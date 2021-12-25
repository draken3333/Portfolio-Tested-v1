$(function () {
    document.querySelector('#play').onclick = play;
    document.querySelector('#pause').onclick = pause;
    document.querySelector('#stop').onclick = stop;
    document.querySelector('#volume').oninput = volume;
    document.querySelector('#play-second').onclick = playSecond;

    let video;
    let display;
    let progress;

    video = document.querySelector('#video-player');
    progress = document.querySelector('#progress');

    video.ontimeupdate = progressUpdate;
    progress.onclick = videoRewind;

    function play() {
        video.play();
        document.getElementById('videoTitle').classList.add('is-active');

        document.getElementById('video-bar').classList.add('is-active');
    };
    function playSecond() {
        video.play();

    };

    function pause() {
        video.pause();

    };
    function stop() {
        video.pause();
        video.currentTime = 0;
        location.reload();

    };
    function volume() {
        let v = this.value;

        video.volume = v / 100;

    };

    function progressUpdate() {
        let d = video.duration;
        let c = video.currentTime;
        progress.value = 100 * c / d;

    }

    function videoRewind() {
        let w = this.offsetWidth;
        let o = event.offsetX;
        console.log(w)
        console.log(o)
        this.value = o / w * 100;
        video.pause();
        video.currentTime = video.duration * (o / w);
        video.play;
    }



    // *select
    $('.select').each(function () {
        const _this = $(this),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450; // длительность анимации 

        _this.hide();
        _this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'new-select',
            text: _this.children('option:disabled').text()
        }).insertAfter(_this);

        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);

        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                class: 'new-select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }

        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function () {
            if (!$(this).hasClass('on')) {
                $(this).addClass('on');
                selectList.slideDown(duration);

                selectItem.on('click', function () {
                    let chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text($(this).find('span').text());

                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });

            } else {
                $(this).removeClass('on');
                selectList.slideUp(duration);
            }
        });
    });



    $('.section-gallery__images').slick({
        prevArrow: '<button type="button" class="arrow-left slick-prev"><img src="images/section-gallery/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="arrow-right slick-next"><img src="images/section-gallery/arrow-right.svg" alt=""></button>',
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',

    });

    //   *menu

    $(document).ready(function () {
        $(".burger").click(function () {
            $(this).toggleClass("active");
            $('.menu').slideToggle(300, function () {
                if ($(this).css('display') === "none") {
                    $(this).removeAttr('style');
                }
            });
        });
    });


    //   *animation 

    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);


        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffSet = offset(animItem).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;

                }
                if ((pageYOffset > animItemOffSet - animItemPoint) && pageYOffset < (animItemOffSet + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if(!animItem.classList.contains('_anim-no-hide')){
                        animItem.classList.remove('_active');
                    }
                }


            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
    }


    // *откладывет функцию

    setTimeout(() => {
        animOnScroll();

    }, 300);

    //*/animation



});