/*-----===| VARIÁVEIS |===-----*/
var headerHeight;
var bannerTextContainer = document.getElementsByClassName('banner-text-container')[0];

/*-----===| EVENTOS |===-----*/
window.onload = calcBannerTextHeight;
window.addEventListener('resize', calcBannerTextHeight);

/*-----===| FUNÇÕES |===-----*/
function calcBannerTextHeight() {
    headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
    bannerTextContainer.style.height = "calc(100% - " + headerHeight + "px)";
}