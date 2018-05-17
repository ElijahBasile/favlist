const app = {
    init: function(formSelector) {
        this.max = 0

        document
            .querySelector(formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    handleSubmit: function(ev) {
        ev.preventDefault()
        const p = ev.target
        const place = {
            id: ++this.max,
            name: p.placeName.value,
        }
        console.log(place)
        p.reset()
    },

}

app.init('#placeForm')