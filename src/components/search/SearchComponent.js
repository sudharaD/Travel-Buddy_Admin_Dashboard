import { TextField } from '@mui/material'
import React from 'react'

const SearchComponent = (props) => {
  const {search, setSearch} = props
  return (
    <TextField 
        type="search" 
        fullWidth 
        placeholder='Search' 
        id="outlined-basic"
        value={search} 
        onChange={(e)=>setSearch(e.target.value)}
      />

  )
}

export default SearchComponent