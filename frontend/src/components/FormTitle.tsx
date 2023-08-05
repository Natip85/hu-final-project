interface Props  {
  mainText: string
  subText?: string
}

const FormTitle = ({mainText, subText}: Props) => {
  return (
    <h2 style={{textAlign: 'center', fontSize:'3rem'}}>
      { mainText }<br/>
      {subText &&
      <small className='text-muted fs-3'>
        {subText}
        </small>
      }
      </h2>
  )
}

export default FormTitle