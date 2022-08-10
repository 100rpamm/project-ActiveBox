function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger-menu_button', '.burger-menu_lines');
    let links = menu.find('.burger-menu_link');
    let overlay = menu.find('.burger-menu_overlay');
    button.on('click', (e)=>{
        e.preventDefault();
        toggleMenu();
    });
    links.on('click', ()=>toggleMenu()
    );
    overlay.on('click', ()=>toggleMenu()
    );
    function toggleMenu() {
        menu.toggleClass('active');
        if (menu.hasClass('active')) $('body').css('overlow', 'hidden');
        else $('body').css('overlow', 'visible');
    }
}
burgerMenu('.burger-menu');
let header = document.querySelector('.header');
window.addEventListener('scroll', function(e) {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 0) header.classList.add('header_fixed');
    else header.classList.remove('header_fixed');
});
const sections = $('section'), nav = $('nav.burger-menu_nav'), nav_height = nav.outerHeight();
$(window).on('scroll', function() {
    const cur_pos = $(this).scrollTop();
    sections.each(function() {
        const top = $(this).offset().top - nav_height, bottom = top + $(this).outerHeight();
        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').parent().removeClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
        }
    });
});
nav.find('a').on('click', function() {
    const $el = $(this), id = $el.attr('href');
    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);
    return false;
});

//# sourceMappingURL=index.3c11e1f0.js.map
