const form = document.querySelector('form')
let listArray = []

const deleteArrayElement = (deleteE) => {
    
}

const deleteItem = (deleteE) => {
    deleteE.preventDefault()
    const toBeDeleted = deleteE.target
    toBeDeleted.parentNode.remove()
    deleteArrayElement(deleteE);
    
    const variable = listArray.indexOf(toBeDeleted.textContent)
    if (variable != -1) listArray.splice(variable, 1)
}


const renderListItem = (item) => {
    const container = document.createElement('div')
    container.id=`${item}`
    container.className='delete'

    const listItem = document.createElement('li')

    const del = document.createElement('button')
    del.className='delete'
    del.addEventListener('click', deleteItem)

    const list = document.querySelector('ul#list')
    del.textContent = 'Delete Item'
    listItem.textContent = item
    container.appendChild(listItem)
    container.appendChild(del)
    list.appendChild(container)
    const places = document.querySelector('div#places')
    places.appendChild(list)
    return places
}

const handleClickEvent = (ev) => {
    ev.preventDefault()
    const form = ev.target
    const place = form.addList.value
    listArray.unshift(place)

    const list = renderListItem(listArray[0])


    form.reset()
    form.addList.focus()
}

form.addEventListener('submit', handleClickEvent)