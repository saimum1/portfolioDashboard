import React, { useState ,useEffect} from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import config from "../../config.jsx";
import AlertBox from '../AlertBox/AlertBox.jsx';
import { useDisclosure } from '@chakra-ui/react';
import Popnotification from '../PopNotification/Popnotification.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';
import { ChromePicker } from 'react-color'; 
const Writepost = ({updateitem,status,getpageaction}) => {
  const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
  const [alertType, setAlertType] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertButtonText, setAlertButtonText] = useState('');
  const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
  const [loader, setLoader] = useState(false);
  const [showpopoup,setshowpopup]=useState(false)
  const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
  const [showpopoupmsg,setshowpopupmsg]=useState('')

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  const [selected,setselected] = useState('false');
  const [id,setid]=useState('')
  const [photourl,setphotourl]=useState('')
  const [colorcode,setcolorcode]=useState('')
  const[statusset,setstatusset]=useState('')
  const [color, setColor] = useState('#666'); // Initial color is black

  const handleChange = (newColor) => {
    setColor(newColor.hex); // Update color state with selected color
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFeaturedPhotoChange = (event) => {
    const file = event.target.files[0];
    setFeaturedPhoto(file)
  };

  const UpdateBulk = async () => {
    console.log("shoinwh")
    handleSubmit()
  }

  const ondecision=(e)=>{
// e.preventDefault()
   console.log("asdasdadac",statusset)
      if(statusset === true){
        onAlertOpen();
        setAlertType('warning');
        setAlertText('Are you sure you want to update the data?'); 
        setAlertButtonTextSecond('Cancel');
        setAlertButtonText('Yes, Update')
      }else if(statusset === false){
        onAlertOpen();
        setAlertType('success');
        setAlertText('Are you sure you want to save?'); 
        setAlertButtonTextSecond('Cancel');
        setAlertButtonText('Yes, Save')
      }
   
   
  }

  const handleSubmit =async() => {
    if(statusset === false){
    console.log("Featured photo in state:", featuredPhoto);
    // event.preventDefault();
    let formData = new FormData()
    formData.append("featuredPhoto", document.getElementById('featuredPhoto').files[0]);
    console.log("FormData:", formData)

    try {

      const responsess = await axios.post(`${config.apiUrl}/upload`,formData);

      console.log("sdasdasdasd",responsess)

      const newPost = {
        userid:1,
        id,
        title,
        description,
        content,
        color,
        featuredPhoto: await responsess?.data?.image_url, // Assuming the server returns some identifier for the uploaded photo
        created: new Date(),
        category: 'post',
        selected
      };

      const responses = await axios.post(`${config.apiUrl}/getdata`, newPost);
      console.log('Response:', responses);
      if(responses.data.status === 200){
        setshowpopupmsg('saved Successfully')
   setshowpopupstatus('success')
   setshowpopup(true)
   setTimeout(async() => {
       setshowpopup(false)
       let d={'id':'','case':0}
       await getpageaction(d)
   }, 1500);
}else if(responses.data.status === 500){
         setshowpopupmsg('could not save')
   setshowpopupstatus('failed')
   setshowpopup(true)
   setTimeout(() => {
       setshowpopup(false)

   }, 1500);

}else{
   setshowpopupmsg('no response from server')
   setshowpopupstatus('failed')
   setshowpopup(true)
   setTimeout(() => {
       setshowpopup(false)

   }, 1500);

}
await onAlertClose()

  } catch (error) {
      console.error('Error++++:', error);


      setshowpopupmsg('no response from server')
      setshowpopupstatus('failed')
      setshowpopup(true)
      setTimeout(() => {
          setshowpopup(false)
  
      }, 1500);
  
  
  await onAlertClose()
      throw error;
  }

}else if(statusset === true){
  try {

            if(featuredPhoto === ''){
                console.log("heree")
            const newPost = {
              userid:1,
              id,
              title,
              description,
              content,
              color,
              featuredPhoto: photourl, 
              created: new Date(),
              category: 'post',
              selected
            };

            const responses = await axios.post(`${config.apiUrl}/update_item`, newPost);
            console.log('Response:', responses);

             if(responses.data.status === 200){
                 setshowpopupmsg('update Successfully')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(async() => {
                setshowpopup(false)
                let d={'id':'','case':0}
                await getpageaction(d)

            }, 1500);
        }else if(responses.data.status === 500){
                  setshowpopupmsg('could not update')
            setshowpopupstatus('failed')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
  
        }else{
            setshowpopupmsg('no response from server')
            setshowpopupstatus('failed')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)

            }, 1500);
  
        }
        await onAlertClose()

          }else if(featuredPhoto !== ''){
            let formData = new FormData()
            formData.append("featuredPhoto", document.getElementById('featuredPhoto').files[0]);
            console.log("FormData:", formData)

            const responses2 = await axios.post(`${config.apiUrl}/upload`,formData);

            console.log("sdasdasdasd",responses2)
            const newPost = {
              userid:1,
              id,
              title,
              description,
              content,
              color,
              featuredPhoto: await responses2?.data?.image_url, // Assuming the server returns some identifier for the uploaded photo
              created: new Date(),
              category: 'post',
              selected
            };

            const responses = await axios.post(`${config.apiUrl}/update_item`, newPost);
            console.log('Response:', responses);

            if(responses.data.status === 200){
              setshowpopupmsg('update Successfully')
         setshowpopupstatus('success')
         setshowpopup(true)
         setTimeout(async() => {
             setshowpopup(false)
             let d={'id':1,'case':0}
             await getpageaction(d)
         }, 1500);
       
              }else if(responses.data.status === 500){
                        setshowpopupmsg('could not update')
                  setshowpopupstatus('failed')
                  setshowpopup(true)
                  setTimeout(() => {
                      setshowpopup(false)

                  }, 1500);

              }else{
                  setshowpopupmsg('no response from server')
                  setshowpopupstatus('failed')
                  setshowpopup(true)
                  setTimeout(() => {
                      setshowpopup(false)

                  }, 1500);

              }
              await onAlertClose()

                    }

} catch (error) {
    console.error('Error++++:', error);
    setshowpopupmsg('no response from server')
    setshowpopupstatus('failed')
    setshowpopup(true)
    setTimeout(() => {
        setshowpopup(false)

    }, 1500);


await onAlertClose()

    throw error;
}
}
  };



  useEffect(() => {
    console.log('status for update',status,updateitem)
    setstatusset(status)
    if(status === true){
      console.log("updaye",updateitem)
      setTitle(updateitem?.title)
      setContent(updateitem?.content)
      setDescription(updateitem?.description)
      setFeaturedPhoto('')
      setphotourl(updateitem?.image_url)
      setselected(updateitem?.selected)
      setid(updateitem?.postid)
      setColor(updateitem?.color !== null ? updateitem?.color:'#E6F2FA')
      
    }else if (status === false){
      setTitle('')
      setContent('')
      setDescription('')
      setFeaturedPhoto('')
      setselected(false)
      setid('')
      setColor('#E6F2FA')

    }
  }, [])
  

  return (
    <div className="post-blog-container">
         <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType}  text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={UpdateBulk}/>
         {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
      <div className="featured-photo-container">


<img
    style={{ objectFit: 'cover' }}
    src={(featuredPhoto instanceof Blob || featuredPhoto instanceof File) ? 
        URL.createObjectURL(featuredPhoto) :
        (featuredPhoto !== '' && photourl === '') ? 
            featuredPhoto :
            (featuredPhoto === '' && photourl !== '') ? 
                `${config.apiUrl}/${photourl}` :
                ''
    }
    alt="Featured"
    className="featured-photo-preview"
/>


                
   
       
      </div>
      <div 
      // onSubmit={()=>ondecision()}
       className="blog-form">
        <div className="form-group">
          <label htmlFor="featuredPhoto" className="featured-photo-label">
            Upload Featured Photo:
          </label>
          <input
            type="file"
            id="featuredPhoto"
            onChange={handleFeaturedPhotoChange}
       
          />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="form-control"
          />
        </div>


        <div className="form-group">
          <label>Color Picker:</label>
          <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:"5%"}}>
              <ChromePicker color={color && color} onChange={handleChange} />
              <div style={{ marginTop: '20px' }}>
                <label>Selected Color: {color && color || 'no color selected'}</label>
                <div style={{ width: '150px', height: '10rem', backgroundColor: color }}></div>
              </div>
          </div>
        </div>

        <div className="form-group">
          <label >Content:</label>
          <JoditEditor
            value={content}
            onChange={handleContentChange}
            className="content-editor"
          />
        </div>
        <button  className="submit-btn" 
      onClick={(e)=>ondecision(e)}
      >
          Submit
        </button>
      </div>

      <style jsx>
        {`
          .post-blog-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 80vh;
          }

          .featured-photo-container {
            width: 90%;
            height: 100%;
            border: 1px solid black;
          }

          .featured-photo-label {
            display: block;
            color:white;
            margin-bottom: 10px;
          }

          .featured-photo-preview {
            width: 100%;
            height: 25rem;
            object-fit: cover;
          }

          .blog-form {
            width: 90%;
            margin-top: 20px;
          }

          .form-group {
            margin-bottom: 20px;
       
          }

          .form-group label{
          color:white;
       
          }

          .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .content-editor {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .submit-btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .submit-btn:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default Writepost;
