import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {}

const PageNotFound = (props: Props) => {
  return (
    <Container>
       <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'>Oops! Page Not Found</h2>
        <Link to='/' className="pnf-btn">
          Go Back</Link> 
      </div>
    </Container>
  )
}

export default PageNotFound