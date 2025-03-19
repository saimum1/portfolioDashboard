import React, { useState,useEffect } from 'react';
import logo from '../../assets/static/logox.svg'
import {useAuth} from "../../Context/AuthInfo.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { global_css } from '../../GlobalCss/GlobalCSS.js';
import axios from "axios";
import config from "../../config.jsx";
const Navabar = () => {
    const { userId , logout} = useAuth();
  const[clicked,setclicked]=useState(false)
  const[resumelink,setresumelink]=useState('')
  const[logourl,setlogourl]=useState('')
  const navigate = useNavigate();

  const redirectToPage = (e) => {
    navigate(`${e}`);
  };

   
  const itemlist=[
  {'item':'Projects','route':'/projects'} ,
  {'item':'Blog','route':'/'} ,
  {'item':'Resume','route':'/'}]

  const getdata=async()=>{
    try {
      const response = await axios.get(`${config.apiUrl}/userdata/${1}`);
      const data = await response.data;
      console.log("sssasadafa",data)
      if (data.id) {
          setresumelink(data?.linkurlcv);
          setlogourl(data?.logourl)
      } else {
          setresumelink('')
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  }

    const [hasShadow, setHasShadow] = useState(false);

    useEffect(() => {
      getdata()
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0) {
          setHasShadow(true);
        } else {
          setHasShadow(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return (
        
        <div
        className={`navbar ${hasShadow ? 'shadow' : ''}`}
        
        style={{display:"flex",transition:'all 400ms',
        width:'100%',justifyContent:'center',alignItems:'center',position:'fixed' ,zIndex:'999'}} >
            <div style={{display:"flex",height:"100%" ,
        width:'70%',justifyContent:'space-between',alignItems:'center'}}>
          
               <div style={{flex:1,display:'flex',justifyContent:'flex-start',alignItems:'center',cursor:'pointer'}}
               
     
               >
                  <Link to={`/`}>
                     <p style={{
                                fontSize: '1.5rem',
                                lineHeight: '1.25rem',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                width:"8rem"
                              }}>
                              
                                    <img src={logo}/>
                                 
                              </p>
                  </Link>

               </div>
            <div style={{flex:1,display : 'flex', gap : '8%', alignItems : 'center' ,justifyContent:'flex-end'}}>
                {itemlist?.map((i)=>{
                              return (

                                <>
                                  {i.item !== 'Resume'?
                            
                              
                                <span  
                                style={{cursor:'pointer',color:global_css.third_txt_color,fontWeight:'500'}}
                                // className={style.texteffect}
                                onMouseDown={(e)=>{(e.currentTarget.style.color='red');}}
                                onMouseUp={(e)=>(e.currentTarget.style.color='#000')}
                                onMouseEnter={(e)=>{(e.currentTarget.style.color='orangered');}}
                                onMouseLeave={(e)=>{(e.currentTarget.style.color='#000');}}
                                 onClick={()=>redirectToPage(i.route)}
                                >{i.item}</span>

                                : <a href={resumelink} target='blank'> <span  
                                style={{cursor:'pointer',color:global_css.third_txt_color,fontWeight:'500'}}
                                onMouseDown={(e)=>{(e.currentTarget.style.color='red');}}
                                onMouseUp={(e)=>(e.currentTarget.style.color='#000')}
                                onMouseEnter={(e)=>{(e.currentTarget.style.color='orangered');}}
                                onMouseLeave={(e)=>{(e.currentTarget.style.color='#000');}}
                                >{i.item}</span> </a>}
                                 </>
                              )
                            })}
            </div>
               


            </div>

         <style>
            {`
            .navbar {
                transition: box-shadow 400ms ease;
                background-color:transparent;
                height:5rem;
                transition: all 400ms ;


              }
              
              .shadow {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                // background-color:white;
                height:3.5rem;
                transition: all 400ms ;
                --tw-backdrop-blur: blur(8px);
               backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);


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

            


              `}
         </style>
        </div>

       
    );
};

export default Navabar;