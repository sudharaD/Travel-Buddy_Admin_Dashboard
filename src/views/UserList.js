import React, { useEffect, useState } from 'react'
import {getAllData, addData, updateData, deleteData} from '../http/api-requests'

import {  Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import InputComponent from 'components/InputComponent/InputComponent';
import SpaceBoxComponent from 'components/SpaceBox/SpaceBox';
import ModalComponent from 'components/modal/Modal';
import CardComponent from 'components/card/CardComponent';
import CircularIndeterminate from 'components/progress/CircularIndeterminate';
import ImageUpload from 'components/fileUpload/FileUpload';
import SearchComponent from 'components/search/SearchComponent';
import Switch from '@mui/material/Switch';


const UserList = () => {
    
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [user, setUser] = useState("")
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)

    const identifyUser = (index)=>{
      const specificUser = users.find((user)=> user.id === index)
      setUser((specificUser))
    }
  
    useEffect(() => {
      getUserData()
    }, [dataUpdateToggle])

    useEffect(()=>{
      if(search){
        const searchedUsers = allUsers.filter(user=> user?.name?.toLowerCase().includes(search.toLowerCase()))
        setUsers(()=>[...searchedUsers])
      }else{
        setUsers(allUsers)
      }
    }, [search])


    const getUserData = async()=>{
      setIsLoading(true)
      const response = await getAllData("users")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        console.log(data);
        setUsers(data)
        setAllUsers(data)
      }
    }

  if(isLoading){
    return <CircularIndeterminate  />
  }



  return (
    <Container fluid>
      {/* search  */}
      <SearchComponent search={search} setSearch={setSearch} />
      {/* new users */}
      <ModalComponent setItem={setUser} open={open} setOpen={setOpen} name="Add New User">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} user={user} setOpen={setOpen} setUser={setUser} />
      </ModalComponent>

      {/* list of users */}
      <ListSection users={users} setOpen={setOpen} identifyUser={identifyUser} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const {setUser, setOpen, user, dataUpdateToggle, setDataUpdateToggle} = props

    const [name, setTitle] = useState("")
    const [bio, setDescription] = useState("")
    const [userId, setUserId] = useState("")
    const [age, setAge] = useState("")
    const [lat, setLatitude] = useState("")
    const [lng, setLongitude] = useState("")
    const [pic, setUrl] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      if(user){
        
        const { name, bio, id, age, lat, lng, pic, admin} = user
        setTitle(name)
        setDescription(bio)
        setUserId(id)
        setAge(age)
        setLatitude(lat)
        setLongitude(lng)
        setUrl(pic)
        setIsAdmin(admin)
      }
    }, [user])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = { name, bio, userId, lat, lng, age, pic, admin : isAdmin }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!user){
      await addData("users", doc)
      }else{
        await updateData('users', user.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setUser(null)
    }


    const deleteUser = async()=>{
      if(user){
        setIsLoading(true)
        await deleteData('users', user.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setUser("")
    }

    console.log(isAdmin);

    return (
      <div>

       { isLoading && <CircularIndeterminate />}
      { user && <InputComponent disabled={true} label="User Id" value={userId} setValue={setUserId} />}

        <InputComponent label="Name" value={name} setValue={setTitle} />

        <InputComponent type="number" label="Age" value={age} setValue={setAge} />
        <InputComponent type="number" label="Latitude" value={lat} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={lng} setValue={setLongitude} />
        <ImageUpload url={pic} setUrl={setUrl} />
        <InputComponent label="Bio" value={bio} setValue={setDescription} rows={5}/>
        <label> Set As Admin </label>
        <Switch  checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)} />

        <SpaceBoxComponent>
          { !isLoading && user && <Button variant="contained" color="error" onClick={deleteUser}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button variant="contained" onClick={addOrUpdateUser}> { user ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const { users, setOpen, identifyUser } = props
    const editHandler = (index)=>{
      identifyUser(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { users.map((user, index)=> <CardComponent mainHeader={user.name} editHandler={editHandler} key={user.id} {...user} />
         ) }
      </div>
    )
}

export default UserList