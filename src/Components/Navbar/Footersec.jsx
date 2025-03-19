import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import logo from '../../../src/assets/static/logox.svg'
const Footersec = () => {
  return (
    <div style={{width:'100%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column'}}>

    <div style={{width:'70%' ,height:'100%',display:'flex' ,alignItems:'center',justifyContent:'center' ,flexDirection:'column',background:''}}>


      <div style={{
        width: '100%',
        height: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Arial, sans-serif',
      }}>
   
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'flex-start',
          color: '#6C757D',
          gap:'.75rem'
        }}>
         
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
          <p style={{
            fontSize: '.875rem',
            lineHeight: '1.25rem',
            fontWeight: '400',
            opacity: '0.9', 
          }}>
            © 2024 Saimum. All rights reserved.
          </p>
          <p style={{
            fontSize: '.875rem',
            lineHeight: '1.25rem',
            fontWeight: '400',
            opacity: '0.9',
          }}>
            Open to Explore Opportunities and Collaborations in Development and Beyond.
          </p>
        </div>


        {/* Right Section: Image */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          gap:'1rem'
          
          
        }}>

       


            <a href='https://www.linkedin.com/in/rakibul-hassan-saimum-2452a8147/' target='blank'> <i class="fa-brands fa-linkedin"></i></a> 
            <a href='https://x.com/XSaimumX' target='blank' >  <i class="fa-brands fa-square-x-twitter" ></i></a>
            <a href='https://medium.com/@gsaimum' target='blank' > <i class="fa-solid fa-m" ></i></a>
            <a href='https://github.com/saimum1?tab=repositories' target='blank' >  <i class="fa-brands fa-github" ></i></a>
        
        </div>
      </div>
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

export default Footersec


