import React from 'react'

const SpaceBoxComponent = (props) => {
  return (
    <div style={{margin:'1rem auto', width:'100%', display:'flex', gap:'1rem', justifyContent:'flex-end'}}> {props.children} </div>
  )
}

export default SpaceBoxComponent