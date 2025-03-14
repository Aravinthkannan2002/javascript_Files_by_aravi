const { cardItems, modalHeader, modalCardPrice, closeM } = require("./script");

cardItems.forEach((cardItems) = gt, {
    cardItem, : .addEventListener('click', function () {
        const cardHeader = cardItem.querySelector('.cardText-js');
        const cardPrice = cardItem.querySelector('.card-price');

        modalHeader.innerText = cardHeader.innerText;
        modalCardPrice.innerText = cardPrice.innerText;
    }),


    window, : .onkeydown = function (event) {
        if (event.keyCode == 27) {
            closeM();
        }
    },

    var: modal = document.querySelector('#modal-window'),
    window, : .onclick = function (event) {
        if (event.target == modal) {
            closeM();
        }
    }
});
