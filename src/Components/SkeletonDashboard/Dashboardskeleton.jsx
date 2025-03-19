import React,{useState,useEffect} from 'react'
import { global_css } from '../../GlobalCss/GlobalCSS'
import LineIcon from '../../assets/static/Line.svg'
import InventoryTable from '../InventoryTable/InventoryTable'
import { dataset } from './Skeletonlistitem'
import Nodatafound from '../NoDataFound/Nodatafound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faL } from '@fortawesome/free-solid-svg-icons'
import LoadingSoS from '../LoadingScreen/LoadingSoS'
import {useAuth} from "../../Context/AuthInfo.jsx";
import axios from "axios";
import config from "../../config.jsx";
import Writepost from '../Home/Writepost.jsx'
import Writelink from '../Home/Writelink.jsx'
import EditHome from '../Home/EditHome.jsx'
const Dashboardskeleton = () => {

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setselectedIndex] = useState(null);
    const[HoveredIndexInner,setHoveredIndexInner]= useState(null);
    const [selectedIndexOuter, setselectedIndexOuter] = useState(null);
    const [ordercount,setordercount]= useState('');
    const [showcomponent,setshowcomponent]=useState('')
    const [showcomponentouter,setshowcomponentouter]=useState('')
    const [pageview,setpageview]=useState(true)
    const [isPageChanging,setIsPageChanging]=useState(false)
    const [updateitem,seupdateitem]=useState('')
    const [updateitemstatus,seupdateitemstatus]=useState(false)
    const [itemid,setitemid]=useState('')

 

     const getpageaction=(e)=>{
      console.log("ssadaf",e)
      seupdateitem(e.id)

        if(e.case === 0){

          if(e.id !==''){
            seupdateitemstatus(true)
             setshowcomponent(3)

          }else{
            seupdateitemstatus(false)
            setshowcomponent(0)

          }

        } else if(e.case === 1){
  
            if(e.id !==''){
              seupdateitemstatus(true)
              setshowcomponent(4)

            }else{
              seupdateitemstatus(false)
               setshowcomponent(1)

            }
  
          }else{
            seupdateitemstatus(false)
            setshowcomponent(e.case)
          }
       
    
        

     }

const renderComponent = () => {
  console.log(":operatorr",showcomponentouter)
    switch (showcomponent) {
        case 0:
        return <InventoryTable getpageaction={getpageaction} caseid={showcomponent}/>
        case 1:
         
        return <InventoryTable getpageaction={getpageaction} caseid={showcomponent}/>

           
        
        case 2:
        return <Nodatafound btn_text={'Add Order Item'}  tittle_head={'No Order List Found'} title_des={'Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam'}/>
        case 3:
          return <Writepost updateitem={updateitem} status={updateitemstatus} getpageaction={getpageaction}/> ;
        case 4:
          return <Writelink updateitem={updateitem} status={updateitemstatus} getpageaction={getpageaction} />;

          case 5:
            return <EditHome updateitem={updateitem} status={updateitemstatus} getpageaction={getpageaction} />;  
     

      default:
        return null;
    }
  }

  
  const settransition=()=>{
      setpageview(false)
      setIsPageChanging(true);
     
      setTimeout(() => {
          setIsPageChanging(false);
          setpageview(true)
        }, 200);
  }
  useEffect(() => {
    seupdateitemstatus(false)

  }, [showcomponent])
  
  
  return (
    <div   style={{height : '100vh', width:'100%', backgroundColor:global_css.primary_bg,display:'flex' ,justifyContent:'center',alignItems:'flex-start',paddingTop:'2px',overflow:'hidden'}}>
        
            <div style={{flex:'12%' ,backgroundColor:global_css.primary_card_bg,height:'98.5%',width:'100%',display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column',paddingTop:'4.5rem'}}>

                <div style={{flex:'55%',height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',paddingTop:'1rem',transition:'all 300ms',gap:'2px'}}>

                        {dataset &&  dataset?.map((n,index)=>{
                            console.log("index",index)
                            return(<div style={{display:'flex',flexDirection:'column',width:'85%'}}
                            >
                                     <div  
                                        key={index} style={{width:'100%',height:'2.4rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'1rem',backgroundColor: (hoveredIndex === index || selectedIndex === index) ? 'rgba(39, 207, 122, 0.10)' : '',paddingLeft: (hoveredIndex === index || selectedIndex === index) ?'1.2rem':'0.7rem',borderRadius:'6px',cursor:"pointer",transition:'all 300ms',margin:'4px 0px'}}
                                        onMouseEnter={() => {setHoveredIndex(index)}}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={()=>{setshowcomponent(n.code);setselectedIndex(selectedIndex=== index?'':index);setshowcomponentouter('');setselectedIndexOuter('');settransition()}}
                                        >
                                          <span><img src={ (hoveredIndex === index || selectedIndex === index) ? n.imgsec : n.img}  style={{width:'100%',height:'100%'}}/></span>                         
                                        <span style={{color: (hoveredIndex === index || selectedIndex === index) ? '#27CF7A':global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'100%',lineHeight:'24px'}}>{n.name}</span>
                                      </div>

                                
                                      {
                                      (n?.menu?.length>0)? 
                                      n?.menu?.map((i,innderindex)=>{
                                        return(
                                              <div  key={innderindex}
                                              style={{margin:(selectedIndex === index)? '2px 0px':'',width:'100%',height:(selectedIndex === index) ?'2.4rem':'0rem',display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'10px',backgroundColor: (HoveredIndexInner === innderindex || selectedIndexOuter === innderindex) ? 'rgba(39, 207, 122, 0.10)' : '',paddingLeft:'30%',borderRadius:'6px',cursor:"pointer",transition:'all 300ms'}}
                                              onMouseEnter={() => {setHoveredIndexInner(innderindex)}}
                                              onMouseLeave={() => setHoveredIndexInner(null)}
                                              onClick={()=>{setshowcomponentouter(i);setselectedIndexOuter(innderindex);settransition()}}
                                              >
                                                                
                                            {(selectedIndex === index)? <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center' ,gap:'4px',width:'100%'}}> <span  style={{color: (HoveredIndexInner === innderindex || selectedIndexOuter === innderindex) ? '#27CF7A':global_css.primary_txt_color ,fontFamily:'Lexend',fontWeight:'400',fontSize:'16px',lineHeight:'24px'}}>  {i} </span>  <span >  {i === 'Sim request'? <span style={{width:'auto',height:'auto', borderRadius:'12px',padding:"1px 8px" ,color:'#FFFFFF' ,backgroundColor:"#29CC79",display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'500',fontStyle:'normal',fontSize:'12px'}}> {ordercount}  </span>:''} </span>  </div>:''} 

                                            </div>
                                        )
                                      })
                                      :''
                                      }
                                 
                                      </div>
                            )
                        })}
                            

                            
                </div>

                <div style={{flex:'1%',height:'100%',width:'100%',display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                          <img src={LineIcon} style={{width:'85%'}}/>
                </div>

                <div style={{flex:'44%',height:'100%',width:'100%'}}>

                </div>
            </div>
          
          
          
            <div style={{flex:'84%',height:'100%',width:'100%',backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'flex-start',transition:'all 300ms',paddingTop:'4.5rem',overflow:'scroll'}} >
                <div className={`page-transition ${isPageChanging ? 'changing' : ''}`} id='showcomp' style={{height:'100%',width:'99%',display:'flex',justifyContent:'center',alignItems:'center' ,transition:'all 300ms',borderRadius:global_css.card_border_radius}}>
                     { pageview && renderComponent()}
                </div>
            </div>
            <style jsx>
    {`
   .page-transition {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
  
  .page-transition.changing {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }
    `}
</style>
         
    </div>
  )
}

export default Dashboardskeleton