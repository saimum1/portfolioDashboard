import React, { useState ,useEffect} from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import config from "../../config.jsx";
import AlertBox from '../AlertBox/AlertBox.jsx';
import { useDisclosure } from '@chakra-ui/react';
import Popnotification from '../PopNotification/Popnotification.jsx';
import LoadingSoS from '../LoadingScreen/LoadingSoS.jsx';

const EditHome = ({getpageaction}) => {
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')
  
    const [titlefirst, settitlefirst] = useState('');
    const [titlesecond, settitlesecond] = useState('');
    const [linkurlcv,setlinkurlcv]=useState('')
    const [status,setstatus]=useState(false)
  
    const [items, setItems] = useState([]);
    const [logophoto, setlogophoto] = useState('');
    const [logourl, setlogourl] = useState('');

    const addItem = () => {
      const newItem = {
        imageprevurl:'',
        imageUrl: "", // Initialize with empty string for image upload
        linkUrl: ""   // Initialize with empty string for URL link
      };
      setItems([...items, newItem]);
    };


    const removeItem = (indexToRemove) => {
      setItems(items.filter((_, index) => index !== indexToRemove));
    };
  
    const handleFileChange = (index, file) => {
      // Create a copy of the items array
      const updatedItems = [...items];
      // Update the imageUrl property of the item at the specified index
      updatedItems[index] = { ...updatedItems[index], imageUrl: file };
      // Update the state with the new items array
      setItems(updatedItems);
    };
  
    const handleLinkUrlChange = (index, linkUrl) => {
      // Create a copy of the items array
      const updatedItems = [...items];
      // Update the linkUrl property of the item at the specified index
      updatedItems[index] = { ...updatedItems[index], linkUrl: linkUrl };
      // Update the state with the new items array
      setItems(updatedItems);
    };



    const UpdateBulk = async () => {
      console.log("shoinwh")
      handleSubmit()
    }
  
    const ondecision=()=>{

     
        if(status === true){
          onAlertOpen();
          setAlertType('warning');
          setAlertText('Are you sure you want to update the data?'); 
          setAlertButtonTextSecond('Cancel');
          setAlertButtonText('Yes, Update')
        }else if(status === false){
          onAlertOpen();
          setAlertType('success');
          setAlertText('Are you sure you want to save?'); 
          setAlertButtonTextSecond('Cancel');
          setAlertButtonText('Yes, Save')
        }
     
     
    }
  
    const handleSubmit =async() => {
      console.log("called")
   
     

      // console.log("safcc",updatedItems)
  
      try {


        const updatedItems = [...items];

        for(let  i=0; i<updatedItems.length;i++){
          if(updatedItems[i]['imageUrl'] !==''){
            let formData = new FormData()
            formData.append("featuredPhoto", updatedItems[i]['imageUrl']);
            const response = await axios.post(`${config.apiUrl}/upload`,formData);
  
            updatedItems[i]['imageprevurl'] = await response?.data?.image_url ;
            // await responsess?.data?.image_url
  
        console.log("safcc",updatedItems[i])
  
           
          }
        }
        
        let logourlsave =logourl
       

         console.log("first")

        let newPost = {
          
          titlefirst,
          titlesecond,
          linkurlcv,
          logourl:logourl,
          featuredPhoto: updatedItems
        };


        if(logophoto !== ''){

        
          let formData2 = new FormData()
              formData2.append("featuredPhoto", logophoto);
              const response2 = await axios.post(`${config.apiUrl}/upload`,formData2);
              newPost.logourl=await response2?.data?.image_url
              console.log("asdafsfaf",await response2?.data?.image_url)
              
           }


  
        const responses = await axios.post(`${config.apiUrl}/posthomedata`, newPost);
        console.log('Response:', newPost);
            if(responses.data.status === 200){
              setshowpopupmsg('saved Success')
              setshowpopupstatus('success')
              setshowpopup(true)
              setTimeout(async() => {
                  setshowpopup(false)
                  let d={'id':'','case':5}
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
    };
  
  
    const getdata=async()=>{
      // const responses = await axios.get(`${config.apiUrl}//userdata/${1}`);
      //   console.log("showin dataa",responses)



      try {
        const response = await axios.get(`${config.apiUrl}/userdata/${1}`);
       
        const data = await response.data;
        console.log("ssdafa",data?.id)
        // Check if data is found
        if (data.id) {
            settitlefirst(data.titlefirst);
            settitlesecond(data.titlesecond);
            setlinkurlcv(data.linkurlcv);
            setlogourl(data.logourl)
            setlogophoto('')
            setItems(data.images.map(image => ({
                imageprevurl: image.image_url,
                imageUrl:'' ,
                linkUrl: image.linkurlmedia
            })));
            setstatus(true)
        } else {
            // Handle case when xxdata is not found
            settitlefirst('');
            settitlesecond('');
            setlinkurlcv('');
            setlogourl('')
            setlogophoto('')

            setItems([]);
            setstatus(false)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
    }
    }
    useEffect(() => {
        getdata()
    }, [])
    
  
    return (
      <div className="post-blog-container">
           <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType}  text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={UpdateBulk}/>
           {loader &&  <LoadingSoS  /> }
              {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
       
        <div 
        // onSubmit={()=>ondecision()}
         className="blog-form">
          <div className="form-group">
            <label>First title (top-left):</label>
            <input
              type="text"
              value={titlefirst}
              onChange={(e)=>settitlefirst(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
          <label>Second title (top-right):</label>

            <input
              type="text"
              value={titlesecond}
              onChange={(e)=>settitlesecond(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Url for cv:</label>
            <input
              type="text"
              value={linkurlcv}
              onChange={(e)=>setlinkurlcv(e.target.value)}
              className="form-control"
            />
          </div>



          <div className="form-group">
             <div  style={{border:'1px solid yellow',padding:'1rem',margin:'1rem 0rem'}}>
                <div className="form-group" style={{display:"flex",flexDirection:'column',gap:"1rem"}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'1rem 0'}}>
                  <label>Logo Image Upload:</label>
                  <label
                  onMouseEnter={(e)=>{(e.currentTarget.style.color='orangered');}}
                onMouseLeave={(e)=>{(e.currentTarget.style.color='white');}}
                  style={{cursor:'pointer'}}>X</label>


                    
                  </div>

                    <img
                        style={{ objectFit: 'cover', width: '50px', height: '50px' }}
                        src={(logophoto instanceof Blob || logophoto instanceof File) ? 
                            URL.createObjectURL(logophoto) :
                            (logophoto !== '' && logourl === '') ? 
                               logophoto :
                                (logophoto === '' && logourl !== '') ? 
                                    `${config.apiUrl}/${logourl}` :
                                    ''
                        }
                        alt="image"
                    />
                  
                    <input
                    type="file"
                    onChange={(e) => setlogophoto(e.target.files[0])}
                    className="form-control"
                    />
                </div>
                </div>
       
            </div>




          <div className="form-group">
            <button 

                onMouseDown={(e)=>{(e.currentTarget.style.color='red');}}
                onMouseUp={(e)=>(e.currentTarget.style.color='white')}
                onMouseEnter={(e)=>{(e.currentTarget.style.color='orangered');}}
                onMouseLeave={(e)=>{(e.currentTarget.style.color='white');}}
            onClick={addItem} style={{color:'white',cursor:'pointer',margin:'2rem 0rem'}}>Add + (social media)</button>
            {items.map((item, index) => (
                <div key={index} style={{border:'1px solid white',padding:'1rem',margin:'1rem 0rem'}}>
                <div className="form-group" style={{display:"flex",flexDirection:'column',gap:"1rem"}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'1rem 0'}}>
                  <label>Image Upload:</label>
                  <label
                  onClick={() => removeItem(index)}
                  onMouseEnter={(e)=>{(e.currentTarget.style.color='orangered');}}
                onMouseLeave={(e)=>{(e.currentTarget.style.color='white');}}
                  style={{cursor:'pointer'}}>X</label>


                    
                  </div>


                  {/* <img
                          style={{ objectFit: 'cover' ,width:'50px',height:'50px'}}
                          src={(item.imageUrl !=='' && item.imageprevurl === '')? URL.createObjectURL(item.imageUrl)
                          :(item.imageUrl === '' && item.imageprevurl !== '') ? `${config.apiUrl}/${item.imageprevurl}`:''}
                          alt="Featured"
                        /> */}

                    <img
                        style={{ objectFit: 'cover', width: '50px', height: '50px' }}
                        src={(item.imageUrl instanceof Blob || item.imageUrl instanceof File) ? 
                            URL.createObjectURL(item.imageUrl) :
                            (item.imageUrl !== '' && item.imageprevurl === '') ? 
                                item.imageUrl :
                                (item.imageUrl === '' && item.imageprevurl !== '') ? 
                                    `${config.apiUrl}/${item.imageprevurl}` :
                                    ''
                        }
                        alt="Featured"
                    />
                  
                    <input
                    type="file"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>URL:</label>
                    <input
                    type="text"
                    value={item.linkUrl}
                    onChange={(e) => handleLinkUrlChange(index, e.target.value)}
                    className="form-control"
                    />
                </div>
                </div>
            ))}
            </div>





        


        

          <button  className="submit-btn" 
        onClick={()=>ondecision()}
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


export default EditHome