import React from 'react'

const Printout = () => {
  return (
    <div className='add-img-upload flex-col'>
        <p>Upload Image</p>
        <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
        </label>
        <input onChange={(e=>setImage(e.target.files[0]))} type='file' id='image' hidden required/>
    </div>
  )
}

export default Printout
