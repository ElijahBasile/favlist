const app = {
    init(selectors) {
        this.places = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(place) {
        const item = document.createElement('li')
        item.textContent = place.name
        return item
    },

    handleSubmit(ev) {
        ev.preventDefault()
        const p = ev.target
        const place = {
            id: ++this.max,
            name: p.placeName.value,
        }
        this.places.push(place)
        this.list.appendChild(this.renderListItem(place))
        p.reset()
    },

}

app.init({
    formSelector: '#placeForm',
    listSelector: '#placeList',
})