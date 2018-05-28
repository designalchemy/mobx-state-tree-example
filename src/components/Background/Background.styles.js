const styles = theme => ({
  container: {
    color: theme.colors.grey,
    fontSize: '18px',
    padding: '50px'
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px'
  },
  input: {
    padding: '10px 20px',
    marginRight: '20px',
    color: theme.colors.grey,
    fontSize: '18px'
  },
  searchButton: {
    border: `1px solid ${theme.colors.grey}`,
    padding: '10px 20px',
    fontSize: '18px'
  }
})

export default styles
