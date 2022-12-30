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

const TravelEquipment = () => {
    
    const [equipments, setEquipments] = useState([])
    const [allEquipments, setAllEquipments] = useState([])
    const [equipment, setEquipment] = useState("")
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)
    const [search, setSearch] = useState("")


    const identifyEquipment = (id)=>{
      const specificEquipment = equipments.find((eqp)=> eqp.id === id)
      setEquipment(specificEquipment)
    }
  
    useEffect(() => {
      getEquipmentData()
    }, [dataUpdateToggle])

    useEffect(()=>{
      if(search){
        const searchedEquipments = allEquipments.filter(equ=> equ?.name?.toLowerCase().includes(search.toLowerCase()))
        setEquipments(()=>[...searchedEquipments])
      }else{
        setEquipments(allEquipments)
      }
    }, [search])

    const getEquipmentData = async()=>{
      setIsLoading(true)
      const response = await getAllData("equipments")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setEquipments(data)
        setAllEquipments(data)
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
      <ModalComponent setItem={setEquipment} open={open} setOpen={setOpen} name="Equipment Rent Shop Registration">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} equipment={equipment} setOpen={setOpen} setEquipment={setEquipment} />
      </ModalComponent>

      {/* list of users */}
      <ListSection equipments={equipments} setOpen={setOpen} identifyEquipment={identifyEquipment} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const { setEquipment, setOpen, equipment, dataUpdateToggle, setDataUpdateToggle} = props

    const [name, setEquipmentName] = useState("")
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
    const [isLoading, setIsLoading] = useState(false)
    const [pic, setUrl1] = useState("")
    const [pic1, setUrl2] = useState("")

    useEffect(()=>{
      if(equipment){
        const { name, dis, city, province, nearestTown, email, phone , district, address, lat, lng, pic, pic1 } = equipment
        setEquipmentName(name)
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
    }, [equipment])

    const addOrUpdateEquipmentShop = async()=>{
      setIsLoading(true)
      const doc = { name, dis, city, province, nearestTown, email, phone , district, address,  lat, lng,  pic,  pic1 }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!equipment){
      await addData("equipments", doc)
      }else{
        await updateData('equipments', equipment.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setEquipment(null)
    }


    const deleteEqipment = async()=>{
      if(equipment){
        setIsLoading(true)
        await deleteData('equipments', equipment.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setEquipment(null)

    }

    return (
      <div>
        {isLoading && <CircularIndeterminate /> }
        <InputComponent label="Equipment Name" value={name} setValue={setEquipmentName} />
        <InputComponent label="Address" value={address} setValue={setAddress} />
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
          { !isLoading && equipment && <Button color="error" variant="contained" onClick={deleteEqipment}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button variant="contained" onClick={addOrUpdateEquipmentShop}> { equipment ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const {  equipments, setOpen, identifyEquipment } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyEquipment(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { equipments.map((equipment, index)=> <CardComponent mainHeader={equipment.name} editHandler={editHandler} key={equipment.id} {...equipment} />
         ) }
      </div>
    )
}

export default TravelEquipment