import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const PageNotFound = (props: Props) => {
  const navigate = useNavigate()
  return (
    <Container>
       <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'>Oops! Page Not Found</h2>
        <div onClick={()=>navigate(-1)} className="pnf-btn">
          Go Back</div> 
      </div>
    </Container>
  )
}

export default PageNotFound