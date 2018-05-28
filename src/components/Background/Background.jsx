import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import BackgroundStore from './Background.store.js'
import styles from './Background.styles.js'

const { remove, updateSearchText, users, filterPeople } = BackgroundStore

const Background = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.searchBox}>
      <input
        type="text"
        className={classes.input}
        onChange={e => updateSearchText(e.target.value)}
      />
      <div className={classes.searchButton} onClick={filterPeople}>
        Filter Users
      </div>
    </div>

    {users.map(item => (
      <span key={item.id}>
        <p style={{ marginBottom: '10px' }}>{item.login}</p>
        <img
          src={item.avatar_url}
          style={{ width: '100px', height: '100px' }}
          onClick={item.toggleCheck}
        />
        <p>Checked Status: {item.checked ? 'Checked' : 'Not Checked'}</p>
        <div onClick={() => remove(item)}>Remove</div>
        <br />
      </span>
    ))}
  </div>
)

Background.propTypes = {
  classes: PropTypes.object,
  store: PropTypes.object
}

export default injectSheet(styles)(observer(Background))
