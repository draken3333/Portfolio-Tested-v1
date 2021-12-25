$(function() {
    // *burger

    $(document).ready(function() {
        $(".btn-burger").click(function() {
            $(this).toggleClass("active");


            $('.header-nav').slideToggle(300, 'linear', function() {

            });

        });
    });


    // */burger




    //^ Slow Navigation 


    //? Плавный скролл для всех ссылок содержащих в себе # хештег  


    $('.flowing-scroll').on( 'click', function(){ 
        var el = $(this);
        var dest = el.attr('href'); // получаем направление
        if(dest !== undefined && dest !== '') { // проверяем существование
            $('html').animate({ 
                scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
            }, 500 // скорость прокрутки
            );
        }
        return false;
    });



    //^ / Slow Navigation 









    //^Tabs 



    const tabsLinks = document.querySelectorAll(".tabs-link");
    const tabPanels = document.querySelectorAll(".tabs-panel");




    for (let link of tabsLinks) {
        link.addEventListener("click", e => {

            e.preventDefault();



            document.querySelector(".tabs li.active").classList.remove("active");
            document.querySelector(".tabs-panel.active").classList.remove("active");

            const parentListItem = link.parentElement;
            parentListItem.classList.add("active");

            const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

            const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
            panel[0].classList.add("active");
        });
    }



    //^/Tabs 

    //^ Modals


    const myModal = new HystModal({
        linkAttributeName: "data-modal",
        // linkAttributeName: "data-hungerModals",
        //settings (optional). see Configuration
    });

    //^ /Modals



});