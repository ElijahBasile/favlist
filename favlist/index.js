class App {
    constructor(selectors) {
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
    }

    saveOnEnter(place,ev) {
        if(ev.key === "Enter") {
            this.editPlace(place,ev)
        }
    }


    renderListItem(place) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = place.id
        const nameSpan = item.querySelector('.placeName')
        nameSpan.textContent = place.name
        nameSpan.addEventListener(
            'keypress',
            this.saveOnEnter.bind(this,place)
        )

        //remove item
        item.querySelector('.alert').addEventListener('click', this.removePlace.bind(this, place))

        item.querySelector('.warning').addEventListener('click', this.favPlace.bind(this, place))

        item
            .querySelector('.moveup')
            .addEventListener('click', ev => {
                const item = ev.target.parentElement.parentElement
                if (item.previousSibling) {
                    item.parentNode.insertBefore(item, item.previousSibling)
                    const temp = this.places[-1+this.places.indexOf(place)]
                    this.places[-1+this.places.indexOf(place)] = this.places[this.places.indexOf(place)]
                    this.places[this.places.indexOf(place)] = temp
                } 
            })
        item
            .querySelector('.movedown')
            .addEventListener('click', ev => {
                const item = ev.target.parentElement.parentElement
                if (item.nextSibling) {
                    item.parentNode.insertBefore(item, item.nextSibling.nextSibling);
                    const temp = this.places[this.places.indexOf(place)]   
                    this.places[this.places.indexOf(place)] = this.places[1+(this.places.indexOf(place))]
                    this.places[1+this.places.indexOf(place)].nextSibling = temp
                }
            })

        item.querySelector('.button.edit').addEventListener('click', this.editPlace.bind(this, place))

        item
            .querySelector('.placeName')
            .addEventListener('keyup', ev => {
                this.places[this.places.indexOf(place)].name = ev.target.textContent
            })

        return item
    }

    removePlace (place, ev) {
            //remove item from the list
            const del = ev.target.closest('.place')
            del.remove()

            //remove from the array
            this.places.splice(this.places.indexOf(place),1)
    }

    favPlace (place, ev) {
        const fav = ev.target.closest('.place')
        place.fav = fav.classList.toggle('fav')
    }

    editPlace (place, ev) {
        const item = ev.target.closest('.place')
        const nameField = item.querySelector('.placeName')
        const btn = item.querySelector('.edit.button')

        if (nameField.isContentEditable) {
            nameField.contentEditable = false
            btn.textContent = 'Edit'
            btn.classList.remove('success')
        } else {
            nameField.contentEditable = true
            nameField.focus()
            btn.textContent = 'Save'
            btn.classList.add('success')
        }
        place.name = nameField.textContent
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const p = ev.target
        const place = {
            id: ++this.max,
            name: p.placeName.value,
            fav: false,
        }
        this.places.unshift(place)

        const item = this.renderListItem(place)
        this.list.insertBefore(item, this.list.firstElementChild)
        


        p.reset()
    }

}

const app = new App({
    formSelector: '#placeForm',
    listSelector: '#placeList',
    templateSelector: '.place.template',
    deleteSelector: '.button.alert',
})
