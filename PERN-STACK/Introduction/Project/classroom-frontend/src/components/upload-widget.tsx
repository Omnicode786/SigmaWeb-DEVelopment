import { div } from 'framer-motion/client';
import React, { useEffect, useRef, useState } from 'react'
import { classSchema } from './../lib/schema';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/constants';
import type { UploadWidgetValue } from '@/types';

const UploadWidget = ({value = null, onChange, disabled = false}) => {
  const [Preview, setPreview] = useState(value)
    
  // 
  // we will use this to persusts the widget acrooss renders yk
  const widgetRef = useRef<CloudinaryWidget | null>(null);
// to handle the changeto avoid stale colusures

  const onChangeRef = useRef(onChange);
const [DeleteToken, setDeleteToken] = useState<string | null>(null)
// the above is simply used for client side deletion
// const [isRemoving, setisRemoving] = useState(false);


useEffect(()=> {
setPreview(value);
if(!value) setDeleteToken(null)
}, [value])

useEffect(()=> {

onChangeRef.current = onChange;

}, [onChange])


useEffect(()=> {
if (typeof window === 'undefined') return;
    // @ts-ignore - cloudinary script loaded on the page

const initializeWidget = () => {
  if( !window.cloudinary || widgetRef.current) return false;
    // @ts-ignore - cloudinary types not declared here

  widgetRef.current = window.cloudinary.createUploadWidget({
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    multiple: false,
    folder: 'uploads',
    maxFileSize: 5000000,
    clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],

  }, 
(error: any, result: any) => {
        if (!error && result?.event === "success") {
          const payload: UploadWidgetValue = {
            url: result.info.secure_url,
            publicId: result.info.public_id,
          };
          setPreview(payload);
          setDeleteToken(result.info.delete_token ?? null);
          onChangeRef.current?.(payload);
        }
      }
    );

    return true;
  };
if (initializeWidget()) return;
// the above is a function that returns true or false but that depends 
// if it doesnt return anything then that means that we are good to go and there we dont return from above and come down below

const intervalId = window.setInterval(() => {
  if (initializeWidget()) {
    // if itsnt been initialized then we will keep trying until it is``
    window.clearInterval(intervalId);
  }
}, 500);


// the above is a cleaunup function 

return () => window.clearInterval(intervalId);

// so when the component unmounts we deal wiith the components

}, [])

// the above is our use effect that deals with the initialization of the widget




const openWidget = () => {
  if(!disabled){
    widgetRef.current?.open();
  }
}



  return (
    <div
     className='text-3xl text-white font-semibold p-2'
>
 {Preview?(
  <div className='upload-preview w-20'>
  
  <img className='w-auto h-auto object-cover' src={Preview.url} alt="Uploaded File" />
  </div>

 ):
 <div className='upload-dropzone' role='button' tabIndex={0} onClick={openWidget} onKeyDown={(event) => {
  if (event.key === 'Enter'){
    event.preventDefault();
    openWidget();
  }
 }}>


  <div className='upload-prompt'>
    <div className="icon"/>
 <div>
  <p>Click to upload photo.</p>
  <p>PNG, JPG upto 5 MBs</p>
 </div>

  </div>

 </div>
 }
    </div>
  )
}

export default UploadWidget