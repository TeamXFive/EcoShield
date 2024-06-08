/*-----===| VARIÁVEIS |===-----*/
var headerHeight;
var main = document.getElementsByTagName('main')[0];
var bannerTextContainer = document.getElementsByClassName('banner-text-container')[0];
var footer = document.getElementsByTagName('footer')[0];

/*-----===| EVENTOS |===-----*/
window.onload = calcTranslationHeight;
window.addEventListener('resize', calcTranslationHeight);

/*-----===| FUNÇÕES |===-----*/
function calcTranslationHeight() {
    headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
    main.style.top = headerHeight + "px";
    bannerTextContainer.style.height = "calc(100% - " + headerHeight + "px)";
    footer.style.transform = "translateY(" + headerHeight + "px)";
}