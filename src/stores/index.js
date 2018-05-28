import { types, destroy } from 'mobx-state-tree'

const Location = types
  .model('Location', {
    title: types.string,
    author: types.string,
    read: false
  })
  .actions(self => ({
    toggleRead() {
      self.read = !self.read
    }
  }))

const LocationStore = types
  .model('Location', {
    locations: types.array(Location)
  })
  .views(self => ({
    get readBooks() {
      return self.locations.filter(book => book.read)
    },
    booksByAuthor(author) {
      return self.locations.filter(book => book.author === author)
    }
  }))
  .actions(self => ({
    addLocation(location) {
      self.locations.push(location)
    },
    remove(location) {
      destroy(location)
    }
  }))
  .create({
    locations: [{ title: 'hello', author: ' test' }]
  })

export default LocationStore
