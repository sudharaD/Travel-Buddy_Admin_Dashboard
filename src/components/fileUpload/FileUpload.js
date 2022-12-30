import { Button } from "@mui/material";
import CircularIndeterminate from "components/progress/CircularIndeterminate";
import React, { useEffect, useRef, useState } from "react";
import { storage } from '../../firebase'
let classes = "";

const ImageUpload = (props) => {
  const {url, setUrl, name = 'Select Image'} = props
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const storageRef = storage.ref()

  useEffect(()=>{
    if(url){
      setImageUrl(url)
    }
  }, [url])

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => setImageUrl(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const inputHandler = () => {
    imageRef.current.click();
  };


  const pickedImage = (event) => {
    setError(false)
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0]
      setFile((_) => pickedFile);
    }
  };

  const uploadFile = ()=>{
    setError(false)
    if(!file){
      setError(true)
      return;
    }
    setIsLoading(true)
    const fileName = file.name.split(" ").join("-").toLowerCase()
    storageRef.child(fileName).put(file).then((snapshot) => {
        storageRef.child(fileName).getDownloadURL().then((dataUrl)=>{
          setIsLoading(false)
          setUrl(dataUrl)
        })
      }).catch(error=>{
        console.error(error);
      });
  }


  return (
    <div className={classes.image__upload}>
      <input
        accept=".jpg,.png,.jpeg"
        onChange={pickedImage}
        ref={imageRef}
        type="file"
        style={{visibility:'hidden'}}
        multiple
      />

      <div>
        {imageUrl ? (
          <img  style={{ width:'100px', height:'100px', objectFit: 'cover' }} src={imageUrl} alt="preview" />
        ) : null}
      </div>
      { error && <p style={{color:'red'}}> *Select a image </p> }
      <Button onClick={inputHandler}> {name} </Button>
      <Button onClick={uploadFile}> { isLoading ? <CircularIndeterminate /> : 'Upload' }</Button>

    </div>
  );
};

export default ImageUpload;