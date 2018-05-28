import { types, destroy, flow } from 'mobx-state-tree'

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
    filterByName() {
      return self.users.filter(item => item.checked)
    },
    allUsers() {
      return self.users
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
    updateSearchText(string) {
      self.inputText = string
    },
    remove(location) {
      destroy(location)
    },
    fetchProjects: flow(function* fetchProjects() {
      self.users = []
      self.state = 'pending'
      try {
        const data = yield fetch('https://api.github.com/users')
        const json = yield data.json()
        self.users = json
        self.state = 'done'
      } catch (error) {
        console.error('Failed to fetch projects', error)
        self.state = 'error'
      }
    })
  }))
  .create({
    users: [],
    state: 'pending',
    inputText: ''
  })

UsersStore.fetchProjects().then(() => {
  console.log('done')
})

export default UsersStore
