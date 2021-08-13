import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap'

const Jumbotron = () => {
  return (
    <Jumbo fluid className='jumbo'>
      <div className='overlay'></div>
      <Container>
        <h1>Welcome</h1>
        <p>Create your blogs with Bloglist.io</p>
      </Container>
    </Jumbo>
  )
}

export default Jumbotron