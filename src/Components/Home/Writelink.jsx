import React, { useState ,useEffect} from 'react';
import axios from "axios";
import config from "../../config.jsx";
import AlertBox from '../AlertBox/AlertBox.jsx';
import { useDisclosure } from '@chakra-ui/react';
import Popnotification from '../PopNotification/Popnotification.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';

const Writelink = ({updateitem,status,getpageaction}) => {
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
    const [linkurl,setlinkurl]=useState('')
    const [photourl,setphotourl]=useState('')
  const[statusset,setstatusset]=useState('')

    const generateUniqueId = () => {
      // Generate a unique ID
      return '_' + Math.random().toString(36).substr(2, 9);
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
  e.preventDefault()
     
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
           color:'',

          content:linkurl,
          featuredPhoto: await responsess?.data?.image_url, // Assuming the server returns some identifier for the uploaded photo
          created: new Date(),
          category: 'write',
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
         let d={'id':'','case':1}
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
                content:linkurl,
                featuredPhoto: photourl, 
                created: new Date(),
                category: 'write',
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
                  let d={'id':'','case':1}
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
                content:linkurl,
                featuredPhoto: await responses2?.data?.image_url, // Assuming the server returns some identifier for the uploaded photo
                created: new Date(),
                category: 'write',
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
               let d={'id':'','case':1}
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
      console.log('status for update',status)
      setstatusset(status)
      if(status === true){
        console.log("updaye",updateitem)
        setTitle(updateitem?.title)
        setlinkurl(updateitem?.content)
        setDescription(updateitem?.description)
        setFeaturedPhoto('')
        setphotourl(updateitem?.image_url)
        setselected(updateitem?.selected)
        setid(updateitem?.postid)
  
        
      }else if (status === false){
        const iddd=generateUniqueId()
        setid(iddd)
        setTitle('')
        setlinkurl('')
        setDescription('')
        setFeaturedPhoto('')
        setselected(false)
        setid('')
      }
    }, [updateitem])
    
  
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
                `${photourl}` :
                ''
    }
    alt="Featured"
    className="featured-photo-preview"
/>
      
        </div>
        <form 
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
            <label>Url:</label>
            <input
              type="text"
              value={linkurl}
              onChange={(e)=>setlinkurl(e.target.value)}
              className="form-control"
            />
          </div>

        


        

          <button  className="submit-btn" 
        onClick={(e)=>ondecision(e)}
        >
            Submit
          </button>
        </form>
  
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

export default Writelink