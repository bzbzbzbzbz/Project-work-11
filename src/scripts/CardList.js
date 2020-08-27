class CardList {
    constructor(domElement) {
        this.domElement = domElement;
    }

    addCard(newBlank) {
        const parent = this.domElement;
        parent.appendChild(newBlank);
    }

    render(stockCards) {
        const parent = this.domElement;
        stockCards.forEach(function (item) {
            parent.appendChild(item);
        })
    }

}
