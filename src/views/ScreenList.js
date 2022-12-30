import React, { useEffect, useState } from 'react'
import {getAllData, addData, updateData, deleteData} from '../http/api-requests'

import {  Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import {provinceList} from '../utils/province'
import {districtsList} from '../utils/districts'
import InputComponent from 'components/InputComponent/InputComponent';
import SpaceBoxComponent from 'components/SpaceBox/SpaceBox';
import ModalComponent from 'components/modal/Modal';
import CardComponent from 'components/card/CardComponent';
import CircularIndeterminate from 'components/progress/CircularIndeterminate';
import ImageUpload from 'components/fileUpload/FileUpload';
import SearchComponent from 'components/search/SearchComponent';
import DropDown from 'components/dropdown/DropDown';

const ScreenList = () => {
    
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
      const response = await getAllData("main")
      setIsLoading(false)
      const {success, data} = response
      if(success){
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
      <ModalComponent setItem={setUser} open={open} setOpen={setOpen} name="Add New Screen">
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
    const [dis, setDescription] = useState("")
    const [province, setProvice] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [nearestTown, setNearestTown] = useState("")
    const [lat, setLatitude] = useState("")
    const [lng, setLongitude] = useState("")
    const [pic, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      if(user){
        
        const { name, dis, city, district, nearestTown, lat, lng, pic, province} = user
        setTitle(name)
        setDescription(dis)
        setCity(city)
        setDistrict(district)
        setNearestTown(nearestTown)
        setProvice(province)
        setLatitude(lat)
        setLongitude(lng)
        setUrl(pic)
      }
    }, [user])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = { name, dis, city, district, lat, lng, nearestTown, pic, province }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!user){
      await addData("main", doc)
      }else{
        await updateData('main', user.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setUser(null)
    }


    const deleteUser = async()=>{
      if(user){
        setIsLoading(true)
        await deleteData('main', user.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setUser("")
    }

    console.log(province, district);


    return (
      <div>

       { isLoading && <CircularIndeterminate />}

        <InputComponent label="Title" value={name} setValue={setTitle} />
        <DropDown label="Province" select={province} setSelect={setProvice} items={provinceList} />
        <DropDown label="District" select={district} setSelect={setDistrict} items={districtsList} />

        <InputComponent label="City" value={city} setValue={setCity} />
        <InputComponent label="Nearest Town" value={nearestTown} setValue={setNearestTown} />
        <InputComponent type="number" label="Latitude" value={lat} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={lng} setValue={setLongitude} />
        <ImageUpload url={pic} setUrl={setUrl} />
        <InputComponent label="Description" value={dis} setValue={setDescription} rows={5}/>

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

export default ScreenList