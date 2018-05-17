const app = {
    init: function(formSelector) {
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.handleSubmit)
    },

    handleSubmit: function(ev) {
        ev.preventDefault()
        const p = ev.target
        console.log(p.placeName.value)
    },
}

app.init('#placeForm')