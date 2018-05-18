const app = {
    init(selectors) {
        this.places = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },


    renderListItem(place) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = place.id
        item
            .querySelector('.placeName')
            .textContent = place.name
        item.querySelector('.alert').addEventListener('click', ev => {
            const del = ev.target.parentElement.parentElement
            del.remove()
            this.places.splice(this.places.indexOf(place),1)
        })
        item.querySelector('.warning').addEventListener('click', ev => {
            const fav = ev.target.parentElement.parentElement
            if (place.fav === 'false') {
                  fav.style.backgroundColor = 'gold'
                place.fav = "true"
            } else {
                fav.style.backgroundColor = 'white'
                    place.fav = "false"
            }
        })
        item.querySelector('.moveup').addEventListener('click', ev => {
            const item = ev.target.parentElement.parentElement
            if (item.previousSibling) {
                item.parentNode.insertBefore(item, item.previousSibling)
                const temp = this.places[-1+this.places.indexOf(place)]
                this.places[-1+this.places.indexOf(place)] = this.places[this.places.indexOf(place)]
                this.places[this.places.indexOf(place)] = temp
            }
        })
        item.querySelector('.movedown').addEventListener('click', ev => {
            const item = ev.target.parentElement.parentElement
            if (item.nextSibling) {
                item.parentNode.insertBefore(item, item.nextSibling.nextSibling);
                const temp = this.places[this.places.indexOf(place)]   
                this.places[this.places.indexOf(place)] = this.places[1+(this.places.indexOf(place))]
                this.places[1+this.places.indexOf(place)].nextSibling = temp
            }
        })
        item.querySelector('.edit').addEventListener('click', ev => {
            const item = ev.target.parentElement.parentElement.querySelector('.placeName')
            item.contentEditable = (item.contentEditable === "false")
        })
        item.querySelector('.placeName').addEventListener('keyup', ev => {
            debugger
            this.places[this.places.indexOf(place)].name = ev.target.textContent
        })

        return item
    },

    handleSubmit(ev) {
        ev.preventDefault()
        const p = ev.target
        const place = {
            id: ++this.max,
            name: p.placeName.value,
            fav: "false",
        }
        this.places.unshift(place)

        const item = this.renderListItem(place)
        this.list.insertBefore(item, this.list.firstElementChild)
        


        p.reset()
    },

}

app.init({
    formSelector: '#placeForm',
    listSelector: '#placeList',
    templateSelector: '.place.template',
    deleteSelector: '.button.alert',
})