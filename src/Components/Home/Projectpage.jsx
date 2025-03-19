import React,{useState,useEffect} from 'react'
import axios from "axios";
import config from "../../config.jsx";
import { Link } from 'react-router-dom';

const Projectpage = () => { 
  const [post, setPost] = useState(null);
    const itemlist=['About' ,'Projects' ,'Blog' ,'Resume']


    const getdata=async()=>{
      
      const response = await axios.get(`${config.apiUrl}/getdatax`,{     params:{
        'userid':1
      }});
      console.log("showing ress hero",response?.data)
      setPost(response?.data);
    }
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        duration: 7000, 
         // Use smooth scrolling behavior
      });
      getdata()
     
    }, []);
  
    const openpost=(e)=>{
      console.log("eeee",e)
      window.location.href = `/postpage/${e}`
    }
    return (
      <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column'}}>
             
  
              <div style={{width:'70%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',marginTop:'4.5rem',background:''}}>
  
                  
  
                  {/* <div style={{height:'4rem'}}></div> */}
  
                    <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',gap:'2rem'}}>
                          <div style={{width:'100%' ,flex:'1',display:'flex',justifyContent:'flex-start',flexDirection:'column',gap:'1rem'}}>
                            
                            {/* <span style={{fontSize:'2rem' ,fontWeight:'500'}}> All Projects</span> */}
                       
                            </div>
  
  
  
  
                            
                          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem',transition:'all 300ms'}}>
                            {post?.filter((value)=> {return  value?.category === 'post'})?.map((value, index) => (

                                    <Link to={`/postpage/${value?.postid}`}>
                                    <div
                                      key={index} style={{ background: '', height: '25rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', gap: '0.6rem' ,cursor:'pointer'}}>
                                        
                                        <div className='boxparent'  style={{ flex: 4, backgroundColor: '', height: '100%', width: '100%' }}>
                                        
                                            <div  className='box' style={{ flex: 4, backgroundColor: '', height: '100%', width: '100%',borderRadius:'5px',border:'1px solid #999999' }}>
                                                <img className='boximage'  src={`${config.apiUrl}/${value?.image_url}`} style={{ height: '17rem', width: '100%'}} alt="Featured" />
                                            </div>
                                        </div>

                                        <span style={{ fontFamily:'ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',flex: 1, backgroundColor: '', height: '100%', display: 'flex', width: '100%', color: '#000', fontFamily: 'Inter', fontSize: '2rem', fontWeight: '700' }}>{value?.title}</span>
                                        <span style={{ fontFamily:'ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',flex: 2, backgroundColor: '', height: '100%', width: '100%', color: '#000', fontSize: '1rem', fontWeight: '400' ,textAlign:'justify'}}>{value?.description}</span>
                                    </div>
                                    </Link>
                            ))}
                          </div>
                    </div>
  
                  
                    <div style={{height:'4rem'}}></div>
                    <div style={{height:'4rem'}}></div>
  
  
  
                
  
                </div> 
  
  
  
  
  
               
  
             <style jsx>
              {`
  
 

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar width */
  }
  
  /* Optional: Customize scrollbar track appearance */
  ::-webkit-scrollbar-track {
    background: transparent; /* Make scrollbar track transparent */
  }
  
  /* Optional: Customize scrollbar thumb appearance */
  ::-webkit-scrollbar-thumb {
    background: transparent; /* Make scrollbar thumb transparent */
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
  

export default Projectpage