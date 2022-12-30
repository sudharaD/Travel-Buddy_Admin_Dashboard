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
import DropDown from 'components/dropdown/DropDown';
import { provinceList } from 'utils/province';
import { districtsList } from 'utils/districts';

const HotelManagement = () => {
    
    const [hotels, setHotels] = useState([])
    const [allHotels, setAllHotels] = useState([])
    const [hotel, setHotel] = useState(null)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)
    const [search, setSearch] = useState("")


    const identifyHotel = (id)=>{
      const specificUser = hotels.find((hotel)=> hotel.id === id)
      setHotel(specificUser)
    }
  
    useEffect(() => {
      getHotelData()
    }, [dataUpdateToggle])

    useEffect(()=>{
      if(search){
        const searchedHotels = allHotels.filter(hotel=> hotel?.name?.toLowerCase().includes(search.toLowerCase()))
        setHotels(()=>[...searchedHotels])
      }else{
        setHotels(allHotels)
      }
    }, [search])

    const getHotelData = async()=>{
      setIsLoading(true)
      const response = await getAllData("hotels")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setHotels(data)
        setAllHotels(data)
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
      <ModalComponent setItem={setHotel} open={open} setOpen={setOpen} name="Hotel Registration">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} hotel={hotel} setOpen={setOpen} setHotel={setHotel} />
      </ModalComponent>

      {/* list of users */}
      <ListSection hotels={hotels} setOpen={setOpen} identifyHotel={identifyHotel} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const { setHotel, setOpen, hotel, dataUpdateToggle, setDataUpdateToggle} = props

    const [name, setname] = useState("")
    const [address, setAddress] = useState("")
    const [dis, setDescription] = useState("")
    const [province, setProvice] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [nearestTown, setNearestTown] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhoneNumber] = useState("")
    const [lat, setLatitude] = useState("")
    const [lng, setLongitude] = useState("")
    const [pic, setUrl1] = useState("")
    const [pic1, setUrl2] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{
      if(hotel){
        const { name, dis, city, province, nearestTown, email, phone , district, address, lat, lng, pic, pic1 } = hotel
        setname(name)
        setDescription(dis)
        setAddress(address)
        setProvice(province)
        setCity(city)
        setDistrict(district)
        setNearestTown(nearestTown)
        setEmail(email)
        setPhoneNumber(phone)
        setLatitude(lat)
        setLongitude(lng)
        setUrl1(pic)
        setUrl2(pic1)
      }
    }, [hotel])

    const addOrUpdateUser = async()=>{
      setIsLoading(true)
      const doc = { name, address, city, nearestTown, email, phone, dis, province, district,  lat, lng, pic, pic1 }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!hotel){
      await addData("hotels", doc)
      }else{
        await updateData('hotels', hotel.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setHotel(null)
    }


    const deleteHotel = async()=>{
      if(hotel){
        setIsLoading(true)
        await deleteData('hotels', hotel.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setHotel(null)
    }

    

    return (
      <div>
        {isLoading && <CircularIndeterminate />}
        <InputComponent label="Hotel Name" value={name} setValue={setname} />
        <InputComponent label="Hotel Address" value={address} setValue={setAddress} />
        <DropDown label="Province" select={province} setSelect={setProvice} items={provinceList} />
        <DropDown label="District" select={district} setSelect={setDistrict} items={districtsList} />
        <InputComponent label="City" value={city} setValue={setCity} />
        <InputComponent label="Nearest Town" value={nearestTown} setValue={setNearestTown} />
        <InputComponent label="Email" value={email} setValue={setEmail} />
        <InputComponent label="Phone Number" value={phone} setValue={setPhoneNumber} />
        <InputComponent type="number" label="Latitude" value={lat} setValue={setLatitude} />
        <InputComponent type="number" label="Longitude" value={lng} setValue={setLongitude} />
        <ImageUpload url={pic} setUrl={setUrl1} name="Select Image 1" />
        <ImageUpload url={pic1} setUrl={setUrl2} name="Select Image 2" />

        <InputComponent rows={5} label="Description" value={dis} setValue={setDescription} />


        <SpaceBoxComponent>
          { !isLoading && hotel && <Button color="error" variant="contained" onClick={deleteHotel}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button variant="contained" onClick={addOrUpdateUser}> { hotel ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const {  hotels, setOpen, identifyHotel } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyHotel(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { hotels.map((hotel, index)=> <CardComponent mainHeader={hotel.name} editHandler={editHandler} key={hotel.id} {...hotel} />
         ) }
      </div>
    )
}

export default HotelManagement