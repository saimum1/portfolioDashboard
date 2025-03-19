import React, {useEffect, useState} from 'react';
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
import axios from "axios";
import config from "../../config.jsx";
import toast from "react-hot-toast";
import Editopstions from "../EditFunctionality/Editopstions.jsx";
import SearchDialouge from "../SearchComponent/SearchDialouge.jsx";
import AlertBox from "../AlertBox/AlertBox.jsx";
import LoadingSoS from "../LoadingScreen/LoadingSoS.jsx";
import Popnotification from "../PopNotification/Popnotification.jsx";
const InventoryTable = ({getpageaction,caseid}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ tableData, setTableData ] = useState([])
    const [ bulkIds, setBulkIds ] = useState([])
    const [showedit,setshowedit]=useState(false)
    const [showeditindex,setshoweditindex]=useState(null)
    const [selecteditem,setselecteditem]=useState(null)
    const [actiontype,setactiontype]=useState(false)
    const [status, setStatus]=useState('')
    const [isOpenD, setIsOpenD] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [operatorForEdit, setOperatorForEdit] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const { isOpen : isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [alertButtonText, setAlertButtonText] = useState('');
    const [alertButtonTextSecond, setAlertButtonTextSecond] = useState('');
    const [nodata, setNodata] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showpopoup,setshowpopup]=useState(false)
    const [showpopoupstatus,setshowpopupstatus]=useState('sucess')
    const [showpopoupmsg,setshowpopupmsg]=useState('')




    const [data,setdata]=useState([])
    const [settleList,setSettleList]=useState([])
    const [unsettleList,setUnSettleList]=useState([])



    console.log("ssssssssssss", status)
    const handleSelect = (value) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });

        setIsAllSelected(selected.length === tableData.length);
    };

    const handleSelectAll = () => {
        setSettleList(isAllSelected ? [] : data?.map((option) => option.postid));
        setIsAllSelected(!isAllSelected);
    };
    const getaction=(e)=>{

        if(e.type === 'edit'){
           let d={
            'id':selecteditem,
            'case':caseid
           }

           getpageaction(d)
        }else if(e.type === 'delete'){
            onAlertOpen();
            setAlertType('delete')
            setAlertText('Are you sure you want to delete this data?');
            setAlertButtonText('Yes, Delete')
            setAlertButtonTextSecond('Cancel')
            setactiontype(false)
        }

    }

    const callbox =()=>{
        setactiontype(false)
        onOpen()
    }


    const getdata=async()=>{
        setLoader(true)
        const response = await axios.get(`${config.apiUrl}/getdatax`,{
            params:{
              'userid':1
            }
          });
        console.log("showing ress",response?.data)
        setdata(response?.data)
         const slectedtrueiitem=response?.data?.filter((n)=>n.selected === 'true')
          console.log("filtered",slectedtrueiitem)
          let dd=[]
          for(const i of slectedtrueiitem){
            console.log("sss",i)
            dd.push(i.postid)
          }
          setSettleList(dd)
          if(response?.data?.length >0){
            setLoader(false) 
          }else if(response?.data?.length === 0){
            setLoader(false) 

          }
    
      }

      const deleteitem=async(e)=>{
        console.log("deleted itemdd",e)
        const responses = await axios.post(`${config.apiUrl}/delete_item`,{'id':e,'userid':1});
    
          console.log("ad",responses)
          if(responses.data.status === 200){
            setshowpopupmsg('delete successfully')
       setshowpopupstatus('delete')
       setshowpopup(true)
       setTimeout(() => {
           setshowpopup(false)

       }, 1500);
     getdata()
   }else if(responses.data.status === 500){
             setshowpopupmsg('could not delete')
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
       }

  


    useEffect(() => {
        getdata()
    }, []);





    const UpdateBulk = async () => {
        console.log("asdasdasdas",settleList)
        if(alertType === 'delete'){
                console.log("postid",selecteditem?.postid)
            deleteitem(selecteditem?.postid)
        }else{
        const responses = await axios.post(`${config.apiUrl}/update_selected`,{'settleList':settleList,'userid':1});
        console.log("ad",responses)
        if(responses.data.status === 200){
                 setshowpopupmsg('saved Successfully')
            setshowpopupstatus('success')
            setshowpopup(true)
            setTimeout(() => {
                setshowpopup(false)
            }, 1500);
          getdata()
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
    }
        await onAlertClose()
    };

  


    return (
        <div   className="border-none w-full h-full" >
            {/* <AddOperator isOpen={isOpen} onClose={onClose} actionType={actiontype} GetOperators={GetOperators} operatorForEdit={operatorForEdit} /> */}
            <AlertBox isOpen={isAlertOpen} onOpen={onAlertOpen} onClose={onAlertClose} type={alertType} deleteId={selecteditem} text={alertText} buttonText={alertButtonText} seconDbuttonText={alertButtonTextSecond} exFunc={UpdateBulk}/>
            {loader &&  <LoadingSoS  /> }
            {showpopoup &&  <Popnotification  msg={showpopoupmsg} showpopoup={showpopoup} status={showpopoupstatus} /> }
          <div  className="w-full h-full text-white" style={{borderRadius : global_css.card_border_radius,  boxShadow : 'none',display:'flex',justifyContent:"center",alignItems:'center',flexDirection:'column'}}>
                <div className="flex justify-between items-center mb-14 ">
                <Title className="text-4xl">{caseid === 0?'Posts':'Writings'}</Title>
                    <div  className="flex justify-end  items-center gap-3 w-4/12">
                     {/* <input /> */}
       
                    </div>
                </div>
                <Table onClick={() =>setFilterOpen(false)} className="mt-8">
                    <div style={{height:'60vh',overflow:"auto"}}>
                    <TableHead>
                        <TableRow className="!bg-[#444444] !rounded !rounded-1xl">
                            <TableHeaderCell style={{borderTopLeftRadius:'5px',borderBottomLeftRadius:'5px',borderRight:'2px solid #303038'}}><input checked={isAllSelected}
                                                                                                                                                     onChange={handleSelectAll} type="checkbox"/> Serial</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Featured Photo</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Title</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Description</TableHeaderCell>
                            <TableHeaderCell style={{borderRight:'2px solid #303038'}}>Created</TableHeaderCell>
                            <TableHeaderCell style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{minHeight : '300px' , overflow : 'auto',width:'100%'}}>
                        {data?.filter((item)=>{ if(caseid === 0){return item?.category === 'post'}else if(caseid === 1){return item?.category === 'write'}} )?.map((item, index) => (
                            <TableRow key={index} style={{borderColor:'#595959'}}>
                                <TableCell>
                                    <input 
                                    checked={ settleList.includes(item.postid)?true :false}  
                                    onChange={(e) => {
                                        const itemId = item.postid;
                                        if (e.target.checked) {
                                          setSettleList(prevList => [...prevList, itemId]); // Add itemId to settleList
                                        } else {
                                          unsettleList.push(item.postid)
                                          setSettleList(prevList => prevList.filter(id => id !== itemId)); // Remove itemId from settleList
                                        }
                                      }}
                                           type="checkbox"
                                           id={`my-checkbox-${index}`}/>
                                    <span className="ml-5">{index + 1}</span>
                                </TableCell>
                                <TableCell style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                    <Text className="flex gap-3"><img style={{height : '74px', width : '7rem'}} src={`${config.apiUrl}/${item?.image_url}`} alt=""/>  </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item?.title}</Text>
                                </TableCell>

                                <TableCell>
                                       <Text style={{width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center',overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                        <span style={{width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'flex-start',alignItems:'center',overflow: 'hidden',textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item?.description?.slice(0, 30)}...</span></Text>
                                </TableCell>

                                <TableCell>
                                       <Text >{item?.created}</Text>
                                </TableCell>

                                <TableCell>
                                    <div style={{position:'relative',width:"100%" ,backgroundColor:'',cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} onClick={()=>{setshowedit(index !== showeditindex);setshoweditindex(index === showeditindex ? null :index);setselecteditem(item)}}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showedit &&  <div style={{position:'absolute',width:'8rem',right:'50%',top:'1%',zIndex:'9999999' ,height:'4rem',display:( index === showeditindex) ?'flex':'none'}}>
                                            <Editopstions
                                                getdata={getaction} edittext={'Edit'}/>

                                        </div>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    </div>
                </Table>
                <div className="max-w-sm mt-5  flex items-center">
                   
                    <Button onClick={()=>{onAlertOpen(); setAlertType('warning'); setAlertText('Are you sure you want to change the status?'); setAlertButtonTextSecond('Cancel'); setAlertButtonText('Yes, Update')}} variant='outline'  style={{border: "1px solid #27CF7A", color: '#27CF7A', marginTop : '-0.1%'}} ml={3}>
                        Apply
                    </Button>

                </div>
            </div>
            <style jsx>
            {
              ` input[type="checkbox"] {
                appearance: none;
                width: 15px;
                height: 15px;
                border: 2px solid #ddd;
                border-radius: 3px;
                background-color: transparent;
              }

              input[type="checkbox"]:checked {
                background-color: #4CAF50; /* Green background when checked */
              }

              .checkbox-box {
                display: none; /* Not needed anymore */
              }

           

              body {
                -ms-overflow-style: none;
              }
            
            
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
              

              `
            }
            </style>
        </div>
    );
};

export default InventoryTable;