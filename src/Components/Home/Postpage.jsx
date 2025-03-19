import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import JoditEditor from 'jodit-react'
import config from "../../config.jsx";
import axios from "axios";
const Postpage = () => {

  const { postId } = useParams(); // Extract the postId from URL params
  const [post, setPost] = useState(null);

  const getdata=async()=>{
      
    const response = await axios.get(`${config.apiUrl}/getdatax`,{
      params:{
        'userid':1
      }
    });
    console.log("showing ress hero",response?.data)
    const selectedPost = response?.data?.find((p) => p.postid === postId);
    setPost(selectedPost);
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      duration: 7000, 
       // Use smooth scrolling behavior
    });
    getdata()
   
  }, [postId]);


  
 
    return (
      <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',gap:'2rem'}}>
          
   
              <div style={{width:'100%' ,height:'25rem',display:'flex' ,alignItems:'flex-end',justifyContent:'center',backgroundColor:post?.color &&  post?.color || '#E6F2FA'}}>

                   <div style={{height:'75%',width:'70%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>

                    <div style={{flex:1,display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',height:'100%',width:'100%',gap:'.7rem',fontFamily:'Inter'}}>
                      <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',textAlign:'left',fontSize:'2.5rem',fontWeight:'700',color:'#000'}}>{post?.title}</span>
                      <span style={{display:'flex',justifyContent:'flex-start',alignItems:'center',textAlign:'left',fontSize:'1.4rem',fontWeight:'300',color:'#000'}}>{post?.description}</span>
                    </div>
                    <div style={{flex:1,display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column',height:'100%',width:'100%'}}>
                       <img src={ `${config.apiUrl}/${post?.image_url}`} style={{width:'100%' ,height:'100%' ,objectFit:'cover',border:'1px',borderRadius:'3px'}}/>

                    </div>
                 
                   </div>
  
                </div> 

                <div style={{width:'70%',height:"100%",textAlign:'justify' ,display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',background:''}}>
  
                  
  
  
  
                <div dangerouslySetInnerHTML={{ __html: post?.content }} style={{height:"100%"}} />
  
  
                </div> 

                <div style={{height:'4rem'}}></div>
                <div style={{height:'4rem'}}></div>
  
             <style jsx>
              {`
  
  body::-webkit-scrollbar {
    display: none;
  }
  html {
    scroll-behavior: smooth;
    transition:all 300ms;

  }
  
  body {
    -ms-overflow-style: none;
    font-family: Inter;
    transition:all 300ms;
  }
  
  /* Hide scrollbar for Firefox */
  body {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
  
              .marquee-w {
              position: relative;
              display: block;
              width: 100%;
              height: 140px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              overflow: hidden;
            }
  .marquee {
    position: absolute;
    display: block;
    margin: auto auto;
    white-space: nowrap;
    overflow: hidden;
    min-width: 100%;
    height: 100%;
  }
  .marquee span {
    display: inline-block;
    padding-left: 100%;
    font-family: 'poppinsbold';
    text-align: center;
    -webkit-text-stroke: 1px #0055bc;
    white-space: nowrap;
    min-width: 100%;
    height: 100%;
    line-height: 140px;
    font-size: 4rem;
    animation: marquee 9s linear infinite;
  }
  .box{
    transition:all 300ms;
  }
  .box:hover{
    transform:scale(1.05);
    transition:all 300ms;
  }
  .marquee2 span {
    animation-delay: 5s;
  }
  @keyframes marquee {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-100%, 0);
    }
  }`}
             </style>
         
      </div>
    )
  }

export default Postpage