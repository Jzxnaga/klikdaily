import React, { useState , useEffect} from 'react';
import 'react-dropdown/style.css';

import Icon, { FontAwesome, Feather } from 'react-web-vector-icons';

import { useAlert } from 'react-alert'
import Select from 'react-select';

import Modal from 'react-modal';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import DatePicker from "react-datepicker";
require('react-datepicker/dist/react-datepicker.css')

const axios = require('axios');



function CreateOrder() {

    const [OptionName,setOptionName] = useState([]);
    const [OptionLocation,setOptionLocation] = useState([
        {key:1,distributionCenterName:'DC Tangerang'},
        {key:2,distributionCenterName:'DC Cikarang'}
    ]);
    const [OptionPayment,setOptionPayment] = useState([
        {key:1,paymentTypeName:'Cash H + 1'},
        {key:2,paymentTypeName:'Cash H + 2'},
        {key:3,paymentTypeName:'Cash H + 3'},
        {key:4,paymentTypeName:'Transfer H + 1'},
        {key:5,paymentTypeName:'Transfer H + 2'},
        {key:6,paymentTypeName:'Transfer H + 3'}
    ]);

    const [OptionLocationStatus,setOptionLocationStatus] = useState(false)

    const [startDate, setStartDate] = useState(new Date());

    const [ErrorApi,setErrorApi] = useState(false)

    const [MultiState,setMultiState] = useState({calendarDate:new Date()})

    const  onChangeMultiState = (async(target,e)=>{

        // console.log(target)
        // console.log(e,'console.log e nih')
        if ([target] == 'employee_name'){
            setOptionLocationStatus(true)
            checkNameAndLocation()
        }

        if([target] == 'distributionCenterName'){
            checkNameAndLocation()
        }

        if([target] == 'calendarDate'){
            await setMultiState({...MultiState, [target]: e})
        }else if([target] == 'textNotes'){
            await setMultiState({...MultiState, [target]: e.target.value})
        }else{
            await setMultiState({...MultiState, [target]: e[target]})
        }
        


        checkingData()
    })

    useEffect(() => {
        getAPIname()
        },[]
    );

//getAPI
    const getAPIname = async(UserId) =>{

        setErrorApi(false)

        const url= 'http://dummy.restapiexample.com/api/v1/employees';
        await axios({
        url:url,
        method: 'get',
        })
        .then((data)=> {
            console.log(data.data.status)
            const employee = data.data.data

            setOptionName(employee)

            setErrorApi(false)

        })
        .catch((err)=>{
            console.log(err,'------masuk error')
            setErrorApi(true)
        })
    }
//getAPI

    //const [StatusConfirm , setStatusConfirm] = useState(true)

//refresh and check
    const refreshingNameFromAPI = (e) =>{
        e.preventDefault();
        if(OptionName.length<=0){
                setErrorApi(true)
            }
        getAPIname()
    }


    const checkNameAndLocation = () =>{
        let status = false

        if(MultiState.distributionCenterName !== '' && MultiState.employee_name !== ''
            && MultiState.distributionCenterName !== undefined && MultiState.employee_name !== undefined ){
            status = true
        }else if (
            MultiState.distributionCenterName == '' && MultiState.employee_name == '' 
            && MultiState.distributionCenterName == undefined && MultiState.employee_name == undefined 
            ){
            status = false
        }

        return status
    }

    const checkingData = () =>{

        let status = true

        if(MultiState.distributionCenterName !== '' && MultiState.employee_name !== '' && MultiState.paymentTypeName !== ''
            && MultiState.distributionCenterName !== undefined && MultiState.employee_name !== undefined && MultiState.paymentTypeName !== undefined ){
            status = false
        }else if (
            MultiState.distributionCenterName == '' && MultiState.employee_name == '' && MultiState.paymentTypeName == ''
            && MultiState.distributionCenterName == undefined && MultiState.employee_name == undefined && MultiState.paymentTypeName == undefined 
            ){
            status = true
        }

        for(var i in MultiStateProduct){
            if(MultiStateProduct[i].totalPrice == 0 || MultiStateProduct[i].productName == '' || MultiStateProduct[i].productName == undefined
                || MultiStateProduct[i].productUnitName == '' || MultiStateProduct[i].productUnitName == undefined
                ){
                return true
            }else{

                status = false
            }
        }



        return status
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    const confirmData = (e) =>{

        setIsOpen(true)

        e.preventDefault()
        console.log(checkingData())
        console.log(MultiState)
        console.log(MultiStateProduct)


        // console.log(MultiState)
        // console.log(StatusConfirm,'jikatruesudahbenar')
    }


    function closeModal() {
        setIsOpen(false);
    }
//refresh and check

//costum select
    const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "white",
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        borderColor: state.isFocused ? "yellow" : "green",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
        borderColor: state.isFocused ? "red" : "blue"
        }
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        hyphens: "auto",
        marginTop: 0,
        textAlign: "left",
        wordWrap: "break-word"
    }),
    menuList: base => ({
        ...base,
        padding: 0
    })
  };
//costum select


    const [testLoop,setTestLoop] = useState([1,2,3])


    const [MultiStateProduct,setMultiStateProduct] = useState([
        {key:0,productName:'',productUnitName:'',quantity:'',price:'',totalPrice:0},])
    const [OptionProductUnitName,setOptionProductUnitName] = useState([
        {productUnitName:'Karton',isDisabled:false,selected:false},
        {productUnitName:'Pak',isDisabled:false,selected:false},
        {productUnitName:'Pcs',isDisabled:false,selected:false}])

    const rowUnitModal = MultiStateProduct.map((item,n) =>{
        return(
            <div style={{padding:5,height:'13.5vh',backgroundColor: 'rgba(232, 236, 241, 1)', marginTop: '2.5vh' ,marginLeft:'1vw',display:'flex',flexDirection: "column"}}key={n}>
                <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                    <div style={{width:'25vw'}}>
                    <p>Product Name</p>
                    </div>
                    <p>{MultiStateProduct[n].productName}</p>
                </div>

                <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                    <div style={{width:'25vw'}}>
                    <p>Product Unit Name</p>
                    </div>
                    <p>{MultiStateProduct[n].productUnitName}</p>
                </div>

                <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                    <div style={{width:'25vw'}}>
                    <p>Product Unit quantity</p>
                    </div>
                    <p>{MultiStateProduct[n].quantity}</p>
                </div>

                <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                    <div style={{width:'25vw'}}>
                    <p>Product Unit price</p>
                    </div>
                    <p>{MultiStateProduct[n].price}</p>
                </div>

                <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                    <div style={{width:'25vw'}}>
                    <p>Product Unit Total</p>
                    </div>
                    <p>{MultiStateProduct[n].totalPrice}</p>
                </div>
            </div>
            )
    })

    
    const rowUnit = MultiStateProduct.map((item,n) =>{
            //console.log(item,'---------------------all list item here')
            return(
                <div key={n}>
                <div className='BodyForm'>
                    <h5> Product No {n+1}</h5>
                        <div style={{border: ``,display:"flex", flexDirection: "row" , marginTop:"1vw" , marginLeft:"1vw",justifyContent:'space-between'}}>
                            <div style={{flexDirection: "column"}}>
                                <label>
                                    Products
                                </label>
                                <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>
                                    <input 
                                    style={{paddingLeft:'0.5vw',width:'25vw',borderRadius:'5px',height:'3.7vh',borderColor: 'gray', borderWidth: 1,placeholderTextColor: 'gray',}}
                                    onChange={(e)=>onChangeMultiStateProduct('productName',e,item.key)}
                                    placeholder={"Product Name"}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div style={{flexDirection: "column"}}>
                                <label>
                                    Unit
                                </label>
                                <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>

                                    <div style={{width: "10vw"}}>
                                        <Select 
                                        getOptionLabel={(OptionProductUnitName)=>OptionProductUnitName.productUnitName}
                                        styles={customStyles}
                                        onChange={(e)=>onChangeMultiStateProduct('productUnitName',e,item.key)}
                                        isOptionDisabled={(OptionProductUnitName) => OptionProductUnitName.isDisabled}
                                        options={OptionProductUnitName}
                                        placeholder={"Unit"}
                                        >
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{border: ``,display:"flex", flexDirection: "row" , marginTop:"1vw" , marginLeft:"1vw",justifyContent:'space-between'}}>
                            <div style={{flexDirection: "column"}}>
                                <label>
                                    Quantity
                                </label>
                                <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>
                                    <input 
                                    type="number"
                                    style={{paddingLeft:'0.5vw',width:'7.5vw',borderRadius:'5px',height:'3.7vh',borderColor: 'gray', borderWidth: 1,placeholderTextColor: 'gray',}}
                                    onChange={(e)=>onChangeMultiStateProduct('quantity',e,item.key)}
                                    placeholder={"Quantity"}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div style={{flexDirection: "column"}}>
                                <label>
                                    Price
                                </label>
                                <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>
                                    <input 
                                    type="number"
                                    style={{paddingLeft:'0.5vw',width:'11.5vw',borderRadius:'5px',height:'3.7vh',borderColor: 'gray', borderWidth: 1,placeholderTextColor: 'gray',}}
                                    onChange={(e)=>onChangeMultiStateProduct('price',e,item.key)}
                                    placeholder={"Price"}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div style={{flexDirection: "column"}}>
                                <label>
                                    Total Price
                                </label>
                                <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>
                                    <input 
                                    type="number"
                                    disabled = {'disabled'}
                                    style={{paddingLeft:'0.5vw',width:'14vw',borderRadius:'5px',height:'3.7vh',borderColor: 'gray', borderWidth: 1,placeholderTextColor: 'gray',}}
                                    onChange={(e)=>onChangeMultiStateProduct('totalPrice',e,item.key)}
                                    placeholder={"Total Price"}
                                    value={MultiStateProduct[item.key].totalPrice}
                                    >
                                    </input>
                                </div>
                            </div>

                        </div>

                        <div style={{display:'flex',justifyContent:'flex-end'}}>
                            <div style={{width:'14.5vw', border: ``,display:"flex", flexDirection: "row" , marginTop:"1vw" , marginLeft:"1vw",justifyContent:'space-between'}}>
                                <h5>
                                    Total Price
                                </h5>

                                <h5>
                                    {MultiStateProduct[item.key].totalPrice}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            )
    })

    const checkValue = (e)=>{
        e.preventDefault()
        console.log(OptionProductUnitName)
    }


    function onChangeMultiStateProduct(target,e,key){
        //copy multistate
        let newArr = [...MultiStateProduct]
        //copy multistate

        //targeting array in multistate
        if(target=='productUnitName'){
            newArr[key] = {...newArr[key], [target]:e[target]}

            console.log('masuk sini',newArr)

            let newData = [...OptionProductUnitName]

            for(var i in newData){
                console.log(newData[i].productUnitName)
                for(var l in newArr){
                    if(newData[i].productUnitName==newArr[l].productUnitName){
                        newData[i].isDisabled=true
                        break;
                    }else{
                        newData[i].isDisabled=false
                    }
                }
            }
            
            // let newData = 
            // [
            // {productUnitName:'Karton',isDisabled:false,selected:false},
            // {productUnitName:'Pak',isDisabled:false,selected:false},
            // {productUnitName:'Pcs',isDisabled:false,selected:false}
            // ]

            // let oldData = OptionProductUnitName
            // for(var i in newData)
            // {
            //     if(newData[i].productUnitName == e[target]){
            //         newData[i].isDisabled=true
            //     }else if(newData[i].productUnitName !== e[target]){
            //         newData[i].isDisabled=oldData[i].isDisabled
            //     }
                
            // }     

            //console.log(newData)

            //setOptionProductUnitName(newData)





        }else if(target=='quantity'||target=='price'){
            newArr[key] = {...newArr[key], [target]:e.target.value}
            newArr[key] = {...newArr[key], totalPrice:newArr[key].quantity*newArr[key].price}
            //console.log(newArr[key])
        }else{
            //console.log('--key id nya=',key,'--targetnya=',target, '--e untuk objectnya d=',e.target.value)
            newArr[key] = {...newArr[key], [target]:e.target.value}
        }   
        
        //targeting array in multistate

        setMultiStateProduct(newArr)
    }

    const addProduct = (e) =>{
        let newArr = [...MultiStateProduct]
        let pushNewProduct = {key:MultiStateProduct.length,productName:'',productUnitName:'',quantity:'',price:'',totalPrice:''}
        newArr.push(pushNewProduct)
        setMultiStateProduct(newArr)
    }

    const removeProduct = (e) =>{
        let newArr = [...MultiStateProduct]

        if(newArr.length<=1){
            alert('cannot removeeeee')
        }else{
            let popped = newArr.pop();
            setMultiStateProduct(newArr)
        }
    }

    const totalPrice = () =>{
        let TotalPriceSum = 0

        for(var i in MultiStateProduct){
            TotalPriceSum = TotalPriceSum + MultiStateProduct[i].totalPrice
        }

        return(
            <h5>
                {TotalPriceSum}
            </h5>

        )
    }

    const customStylesModal = {
    content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            width:'40vw',
            transform: 'translate(-50%, -50%)',
        },
    };



    return (
        <div className='BodyContainer'>
            <div className='Component'> 
                <div className='HeadComponent'>
                    <h4 style={{ marginLeft: '0.5vw'}}>
                        Detail
                    </h4>
                </div>
                <div className='BodyComponent'>
                    <div className='BodyForm'>

                        <div style={{border: ``,display:"flex", flexDirection: "column" , marginTop:"1vw" , marginLeft:"1vw"}}>
                            <label>
                                Name:
                            </label>

                            <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>

                                <div style={{width: "25vw"}}>
                                    <Select 
                                    getOptionLabel={(OptionName)=>OptionName.employee_name}
                                    styles={customStyles}
                                    onChange={(e)=>onChangeMultiState('employee_name',e)}
                                    options={OptionName}
                                    placeholder={"Name"}
                                    >
                                    </Select>
                                </div>

                                
                                { ErrorApi === true &&
                                <div style={{marginLeft:'1vw'}}>
                                    <button onClick={(e)=>refreshingNameFromAPI(e)}>Refresh</button>
                                </div>
                                }

                            </div>
                        </div>

                        <div style={{border: ``,display:"flex", flexDirection: "column" , marginTop:"1vw" , marginLeft:"1vw"}}>
                            <label>
                                Location:
                            </label>

                            <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>

                                <div style={{width: "25vw"}}>
                                    <Select 
                                    getOptionLabel={(OptionLocation)=>OptionLocation.distributionCenterName}
                                    style={{width: "30vw"}}
                                    onChange={(e)=>onChangeMultiState('distributionCenterName',e)}
                                    options={OptionLocation}
                                    placeholder={OptionLocationStatus===false? "No Data Available" : "Select Location"}
                                    isDisabled={OptionLocationStatus===false? true : false}
                                    >
                                    </Select>
                                </div>

                            </div>
                        </div>


                        { checkNameAndLocation() == false &&
                        <div>
                        <div style={{border: ``,display:"flex", flexDirection: "row" , marginTop:"1vw" , marginLeft:"1vw"}}>
                            <div style={{flexDirection: "column"}}>
                                <label>
                                    Payment Type:
                                </label>

                                <div style={{display:"flex", flexDirection: "row", marginTop:"0.5vw"}}>

                                    <div style={{width: "15vw"}}>
                                        <Select 
                                        getOptionLabel={(OptionPayment)=>OptionPayment.paymentTypeName}
                                        style={{width: "30vw"}}
                                        onChange={(e)=>onChangeMultiState('paymentTypeName',e)}
                                        options={OptionPayment}
                                        placeholder={"Select Payment Type"}
                                        >
                                      </Select>
                                    </div>

                                </div>
                            </div>

                            <div style={{flexDirection: "column",marginLeft:'2vw'}}>
                                <label>
                                    Expired Date:
                                </label>
                                
                                <div style={{width: "15vw"}}>
                                <DatePicker
                                    onChange={(e)=>onChangeMultiState('calendarDate',e)}
                                    selected={MultiState.calendarDate}

                                />
                                </div>
                            </div>
                        </div>


                        <div style={{border: ``,display:"flex", flexDirection: "column" , marginTop:"1vw" , marginLeft:"1vw"}}>
                            <label>
                                Notes
                            </label>

                            <textarea
                                style={{width: "25vw",height:"20vh"}}
                                onChange={(e)=>onChangeMultiState('textNotes',e)}
                                value={MultiState.textNotes}
                            />
                        </div>
                        </div>
                        }

                    </div>
                </div>
            </div>


            { checkNameAndLocation() == false &&
            <div className='Component'> 
                <div className='HeadComponent'>
                    <h4 style={{ marginLeft: '0.5vw'}}>
                        Products
                    </h4>
                </div>
                <div className='BodyComponent'>
                    
                    {rowUnit}

                    <div style={{marginLeft:'1vw',display:'flex',width:'16vw',flexDirection:'row',justifyContent:'space-between'}}>
                    <button
                    style={{width:'7vw'}}
                    onClick={(e)=>addProduct(e)}
                    >New Item</button>

                    <button
                    style={{width:'7vw'}}
                    onClick={(e)=>removeProduct(e)}
                    >Remove Item</button>
                    </div>

                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <div style={{marginLeft:'1vw',marginRight:'3vw',display:'flex',width:'15vw',flexDirection:'row',justifyContent:'space-between'}}>
                            <h3>
                                Total
                            </h3>
                            {totalPrice()}
                            

                        </div>
                    </div>

                </div>

            </div>
            }



            <div className='Component' style = {{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginBottom:'1vw',marginRight:'1vw'}}> 
                <div  style = {{marginRight:'1vw'}}>
                    <button
                    style={{width:'10vw',height:'6vh'}}
                    >Cancel</button>
                </div>
                <div>
                    <button 
                    style={{width:'10vw',height:'6vh'}}
                    disabled={checkingData() == true ? true : false}
                    onClick={(e)=>confirmData(e)}>Confirm</button>
                </div>

            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStylesModal}
                contentLabel="Example Modal"
                >

                <div>
                    <div style={{height:'2vh'}}>
                        <h1>Detail</h1>
                    </div>

                    <div style={{padding:5,height:'10vh',backgroundColor: 'rgba(232, 236, 241, 1)', marginTop: '2.5vh' ,marginLeft:'1vw',display:'flex',flexDirection: "column"}}>

                    <div>
                        <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                            <div style={{width:'25vw'}}>
                                <p>Employee Name</p>
                            </div>
                                <p>{MultiState.employee_name}</p>
                        </div>
                        <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                            <div style={{width:'25vw'}}>
                                <p>Distributin Center Name</p>
                            </div>
                                <p>{MultiState.distributionCenterName}</p>
                        </div>
                        <div style={{display:"flex", flexDirection: "row", marginTop:"0vw",height:'2vh'}}>
                            <div style={{width:'25vw'}}>
                                <p>Payment Type Name</p>
                            </div>
                                <p>{MultiState.paymentTypeName}</p>
                        </div>

                    </div>

                    </div>




                    <div style={{height:'2vh'}}>
                        <h1>Products</h1>
                    </div>
                    {rowUnitModal}
                    <div style={{marginTop:'1vw',marginLeft:'1vw',marginRight:'3vw',display:'flex',width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
                        <h3>
                            Total 
                        </h3>
                        {totalPrice()}
                    </div>

                </div>

                <button onClick={closeModal}>close</button>
            </Modal>

        </div>
  );
}

export default CreateOrder;