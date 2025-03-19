import React,{useState,useEffect} from 'react'
import behanceicon from '../../assets/static/Behance.svg'
import linkedinicon from '../../assets/static/Linkedin.svg'
import boxicon from '../../assets/static/linked.svg'
import sicon from '../../assets/static/s.svg'
import giticon from '../../assets/static/github.png'
import image1 from '../../assets/static/Image1.png'
import image2 from '../../assets/static/Image2.png'
import image3 from '../../assets/static/Image3.png'
import image4 from '../../assets/static/s.svg'
import darkpr from '../../assets/static/darkpr.png'

import axios from "axios";
import { StatusOnlineIcon, SearchIcon } from "@heroicons/react/outline";
import {
    Badge,
    Card, Icon, Select, SelectItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text, TextInput,
    Title,


} from "@tremor/react";
import {Button} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useDisclosure} from "@chakra-ui/react";
import {global_css} from "../../GlobalCss/GlobalCSS.js";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import Editopstions from "../EditFunctionality/Editopstions.jsx";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import AlertBox from "../AlertBox/AlertBox.jsx";
import Nodatafound from "../NoDataFound/Nodatafound.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
const Hero = () => {

  const navigate = useNavigate();
  const [data,setdata]=useState([])
  const [titlefirst, settitlefirst] = useState('');
  const [titlesecond, settitlesecond] = useState('');
  const [items, setItems] = useState([]);



  const getdata=async()=>{
    const response = await axios.get(`${config.apiUrl}/getdatax`,{
      params:{
        'userid':1
      }
    });
    console.log("showing ress hero",response?.data)
    setdata(response?.data)
  }



  const gethomedata=async()=>{
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
          setItems([]);
          setstatus(false)
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
  }
  }

  useEffect(() => {
   
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      duration: 7000, 
       // Use smooth scrolling behavior
    });
    getdata()
    gethomedata()









    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "D") {
          navigate("/dashboard");
      }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
      document.removeEventListener("keydown", handleKeyDown);
  };
  }, [navigate])




  
  return (
    <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column'}}>

              <div style={{width:'70%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',marginTop:'4.5rem',background:''}}>


                <div style={{
                  width: '100%',
                  height: '100%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif',
                  borderRadius: '20px', 
                  paddingTop:'5rem'
                }}>
             
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'flex-start',
                    color: '#6C757D',
                  }}>
                    <p style={{
                      fontSize: '24px', 
                      margin: '0 0 10px 0', 
                      fontWeight: '300',
                    }}>
                      I'm
                    </p>
                    <p style={{
                      fontSize: '48px', 
                      margin: '0 0 10px 0',
                      fontWeight: '700',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}>
                      Rakibul Hassan Saimum
                    </p>
                    <p style={{
                      fontSize: '24px', // Job title size
                      margin: '0 0 20px 0',
                      fontWeight: '400',
                      opacity: '0.9', // Slightly faded for hierarchy
                    }}>
                      Software Engineer
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '15px', // Gap between buttons
                    }}>
                      <span style={{
                        backgroundColor: '#fff', // White button background like in the image
                        color: '#ff4d4d', // Red text to match the theme
                        padding: '10px 20px',
                        borderRadius: '25px', // Rounded buttons
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for buttons
                        transition: 'transform 0.2s', // Smooth hover effect
                      }}>
                        Hire Me
                      </span>
                      <span style={{
                        backgroundColor: '#fff',
                        color: '#ff4d4d',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s',
                      }}>
                        Contact Me
                      </span>
                    </div>
                  </div>


                  {/* Right Section: Image */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    
                  }}>


   
     
                    <img
                      src={darkpr}
                      alt="Profile"
                      style={{
                        width: '75%', 
                        height: 'auto',
                        borderTopLeftRadius: '50%', 
                        objectFit: 'cover',
                      }}
                    />
                  </div>

               

                </div>

                <div style={{height:'4rem'}}></div>
                <div style={{height:'4rem'}}></div>

                  <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',gap:'2rem',marginTop:'5%'}}>
                        <div style={{width:'100%' ,flex:'1',display:'flex',justifyContent:'flex-start',flexDirection:'column',gap:'1rem'}}>
                            <span style={{color:'#6C757D',letterSpacing:'.035rem',fontWeight:'700',fontSize:'2.5rem'}}> SELECTED WORK</span>
                            <span style={{backgroundColor:'#6C757D',width:'100%',height:'1.5px'}}> </span>
                          </div>

                        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem',transition:'all 300ms',cursor:'pointer'}}>
                         {data?.filter((value)=> {return value?.selected === 'true' && value?.category === 'post'})?.map((value, index) => (
                               
                               <Link to={`/postpage/${value?.postid}`}>
                               <div
                                  key={index} style={{ height: '28rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', gap: '0rem',padding:'1rem',borderRadius:'.5rem' }}>
                                   
                                   <div className='boxparent'  style={{ flex: 4, backgroundColor: '', height: '100%', width: '100%' }}>
                                   
                                        <div  className='box' style={{ flex: 4, backgroundColor: '', height: '100%', width: '100%',borderRadius:'5px',border:'1px solid #999999' }}>
                                            <img className='boximage'  src={`${config.apiUrl}/${value?.image_url}`} style={{ height: '17rem', width: '100%'}} alt="Featured" />
                                        </div>
                                    </div>

                                    <span style={{ flex: 1, backgroundColor: '', height: '100%', display: 'flex', width: '100%',color:global_css.third_txt_color, fontSize:'1.6rem', fontWeight: '600',fontFamily:'ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji' }}>{value?.title}</span>
                                    <span style={{ flex: 2, backgroundColor: '', height: '100%', width: '100%', color: '#000', fontSize: '1rem', fontWeight: '400',textAlign:'justify',fontFamily:'ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji' }}>{value?.description}</span>
                                </div>
                                </Link>
                            ))}
                        </div>
                  </div>

                <div style={{height:'4rem'}}></div>
                <div style={{height:'4rem'}}></div>



                <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',gap:'2rem'}}>
                        <div style={{width:'100%' ,flex:'1',display:'flex',justifyContent:'flex-start',flexDirection:'column',gap:'1rem'}}>
                          
                          <span style={{  color:'#6C757D',letterSpacing:'.035rem',fontWeight:'700',fontSize:'2.5rem'}}> WRITING</span>
                          <span style={{backgroundColor:'#6C757D',width:'100%',height:'1.5px'}}> </span>
                          </div>




                          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem',transition:'all 300ms'}}>
                         {data?.filter((value)=> {return value?.selected === 'true' && value?.category === 'write'})?.map((value, index) => (
                              <a href={value?.content} target='blank'>
                                <div 
                                 key={index} style={{  height: '20rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', gap: '0.6rem',cursor:'pointer',padding:'1rem',borderRadius:'.5rem' }}>

                              <div className='boxparent'  style={{ flex: 4, backgroundColor: '', height: '100%', width: '100%' }}>
                                   
                                   <div  className='box' style={{ flex: 4, backgroundColor: '', height: '100%', width: '100%',borderRadius:'5px',border:'1px solid #999999' }}>
                                       <img className='boximage'  src={`${config.apiUrl}/${value?.image_url}`} style={{ height: '12rem', width: '100%'}} alt="Featured" />
                                   </div>
                               </div>
                                    <span style={{ flex: 1, height: '100%', display: 'flex', width: '100%',color:global_css.third_txt_color,fontSize:'1.6rem', fontWeight: '600',fontFamily:'ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji' }}>{value?.title}</span>
                                    <span style={{ flex: 2,  height: '100%', width: '100%', color: '#000', fontSize: '1rem', fontWeight: '400' ,fontFamily:'ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji'}}>{value?.description}</span>
                                </div>

                                </a>
                            ))}
                        </div>
                </div>




                <div style={{height:'4rem'}}></div>
                <div style={{height:'4rem'}}></div>

              </div>





             

           <style jsx>
            {`


body::-webkit-scrollbar {
  display: none;
}


body {
  -ms-overflow-style: none;
  font-family: Inter;
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
  animation: marquee 12s linear infinite;
}


.boxparent{
  transition:all 300ms;
}

.boxparent:hover{
  box-shadow:2px 2px 15px  #0055bc;
  transition:all 300ms;
}
.box{
  transition:all 300ms;
  overflow:hidden;

}

.box:hover{
  box-shadow:1px 1px 10px solid  #999990;
  transition:all 300ms;
  

}


.imaghover{
  transition:all 300ms;
}

.imaghover:hover{
  transform:scale(1.2);
  transition:all 300ms;
}

.boximage{
  transition:all 500ms;

  

}
.boximage:hover{
  transform:scale(1.3);
  transition:all 300ms;
  box-shadow:1px 1px 15px #999990;
  transition:all 500ms;
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
}






`}
           </style>
       
    </div>
  )
}

export default Hero