import { types, destroy } from 'mobx-state-tree'

const User = types
  .model('User', {
    avatar_url: types.string,
    id: types.number,
    login: types.string,
    checked: false
  })
  .actions(self => ({
    toggleCheck() {
      self.checked = !self.checked
    }
  }))

const UsersStore = types
  .model('Users', {
    users: types.array(User),
    state: types.enumeration('State', ['pending', 'done', 'error']),
    inputText: types.string
  })
  .views(self => ({
    get filterByName() {
      return self.users.filter(item => item.id > 5)
    }
  }))
  .actions(self => ({
    filterPeople() {
      const filter = JSON.parse(
        JSON.stringify(
          self.users.filter(item => item.login.includes(self.inputText))
        )
      )
      self.users = []
      self.fetchProjectsSuccess(filter)
    },
    addLocation() {
      self.users.push({ title: self.inputText, author: 'testFace' })
    },
    updateSearchText(string) {
      self.inputText = string
    },
    remove(location) {
      destroy(location)
    },
    fetchProjects() {
      self.users = []
      self.state = 'pending'
      fetch('https://api.github.com/users')
        .then(json => json.json())
        .then(data => {
          self.fetchProjectsSuccess(data)
        })
        .catch(err => {
          self.fetchProjectsError(err)
        })
    },
    fetchProjectsSuccess(projects) {
      self.state = 'done'
      projects.forEach(item => {
        self.users.push({
          avatar_url: item.avatar_url,
          id: item.id + Math.random(),
          login: item.login
        })
      })
    },
    fetchProjectsError(error) {
      console.error('Failed to fetch projects', error)
      self.state = 'error'
    }
  }))
  .create({
    users: [],
    state: 'pending',
    inputText: ''
  })

UsersStore.fetchProjects()

export default UsersStore
