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

const EventManagement = () => {
    
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState(null)
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdateToggle, setDataUpdateToggle] = useState(false)
    const [search, setSearch] = useState("")
    const [allEvents, setAllEvents] = useState([])


    const identifyEvent = (id)=>{
      const specificEvent = events.find((event)=> event.id === id)
      setEvent(specificEvent)
    }
  
    useEffect(() => {
      getEventsData()
    }, [dataUpdateToggle])

    useEffect(()=>{
      if(search){
        const searchedUsers = allEvents.filter(user=> user?.de?.toLowerCase().includes(search.toLowerCase()))
        setEvents(()=>[...searchedUsers])
      }else{
        setEvents(allEvents)
      }
    }, [search])

    const getEventsData = async()=>{
      setIsLoading(true)
      const response = await getAllData("events")
      setIsLoading(false)
      const {success, data} = response
      if(success){
        setEvents(data)
        setAllEvents(data)
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
      <ModalComponent setItem={setEvent} open={open} setOpen={setOpen} name="Event Registration">
        <CreateAndUpdateSection dataUpdateToggle={dataUpdateToggle} setDataUpdateToggle={setDataUpdateToggle} event={event} setOpen={setOpen} setEvent={setEvent} />
      </ModalComponent>

      {/* list of users */}
      <ListSection events={events} setOpen={setOpen} identifyEvent={identifyEvent} />
    </Container>

  )
}

const CreateAndUpdateSection = (props)=>{
  const { setEvent, setOpen, event, dataUpdateToggle, setDataUpdateToggle} = props

    const [m_count, setMemberCount] = useState("")
    const [budget, setBudget] = useState("")
    const [departureDate, setDepartureDate] = useState("")
    const [duration, setDuration] = useState("")
    const [de, setDescription] = useState("")
    const [lat, setLatitude] = useState("")
    const [lng, setLongitude] = useState("")
    const [lat1, setLatitude1] = useState("")
    const [lng1, setLongitude1] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [pic, setUrl1] = useState("")
    const [pic1, setUrl2] = useState("")

    useEffect(()=>{
      if(event){
        const { m_count, de, duration, budget,departureDate, lat, lat1, lng1, lng, pic, pic1 } = event
        
        setMemberCount(m_count)
        setDepartureDate(departureDate)
        setBudget(budget)
        setDuration(duration)
        setDescription(de)
        setLatitude(lat)
        setLongitude(lng)
        setLatitude1(lat1)
        setLongitude1(lng1)
        setUrl1(pic)
        setUrl2(pic1)
      }
    }, [event])

    const addOrUpdateEvent = async()=>{
      setIsLoading(true)
      const doc = {  m_count, budget,  de,  departureDate, duration,  lat, lng,lat1, lng1, pic, pic1 }
      Object.keys(doc).forEach((k) => doc[k] == null && delete doc[k]);

      if(!event){
      await addData("events", JSON.parse(JSON.stringify(doc)))
      }else{
        await updateData('events', event.id, doc)
      }
      setIsLoading(false)
      setDataUpdateToggle(!dataUpdateToggle)
      setOpen(false)
      setEvent(null)
    }


    const deleteHotel = async()=>{
      if(event){
        setIsLoading(true)
        await deleteData('events', event.id)
        setIsLoading(false)
        setDataUpdateToggle(!dataUpdateToggle)
     }
     setOpen(false)
     setEvent(null)

    }

    return (
      <div>
        {isLoading && <CircularIndeterminate />}
        <InputComponent label="Member count" value={m_count} setValue={setMemberCount} />
        <InputComponent label="Budget" value={budget} setValue={setBudget} />
        <InputComponent label="Departure Date" type="date" value={duration} setValue={setDuration} />
        <InputComponent type="number" label="Start Latitude" value={lat} setValue={setLatitude} />
        <InputComponent type="number" label="Start Longitude" value={lng} setValue={setLongitude} />
        <InputComponent type="number" label="Destination Latitude" value={lat1} setValue={setLatitude1} />
        <InputComponent type="number" label="Destination Longitude" value={lng1} setValue={setLongitude1} />
        <ImageUpload url={pic} setUrl={setUrl1} name="Select Image 1" />
        <ImageUpload url={pic1} setUrl={setUrl2} name="Select Image 2" />

        <InputComponent rows={5} label="Description" value={de} setValue={setDescription} />


        <SpaceBoxComponent>
          { !isLoading && event && <Button variant="contained" color="error" onClick={deleteHotel}>   Delete User </Button>}
          { isLoading ? <CircularIndeterminate/> : <Button variant="contained" onClick={addOrUpdateEvent}> { event ? 'Update Data' : 'Insert Data'} </Button>}
        </SpaceBoxComponent>
      </div>
    )
}

const ListSection = (props)=>{
  const {  events, setOpen, identifyEvent } = props

    useEffect(()=>{}, [])

    const editHandler = (index)=>{
      identifyEvent(index)
      setOpen(true)
    }

    return (
      <div style={{display:'flex', width:'100%', justifyContent:'flex-start', gap:'1rem', flexWrap:'wrap'}}>
        { events.map((event, index)=> <CardComponent editHandler={editHandler} key={event.id} {...event} />
         ) }
      </div>
    )
}

export default EventManagement