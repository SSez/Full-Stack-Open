import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const target = event.target.value
    props.setFilter(target)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter
  }
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter