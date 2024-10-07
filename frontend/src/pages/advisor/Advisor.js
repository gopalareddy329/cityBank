import React, { useContext, useState } from 'react'
import Dropdown from '../../components/dropDown/DropDown'
import {ApiBase} from '../../utlis/base_api'
import AuthContext from '../../context/AuthContext'
import Loader from '../../loading.png'
const Advisor = () => {


    const {authToken} = useContext(AuthContext)
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(false)

    const handelSubmit = async(e) =>{
      e.preventDefault();
      try{
          setLoading(true)
          console.log(e.target.category.value)
          const res = await fetch(ApiBase+'advisor/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer `+String(authToken.access),
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              "amount":e.target.amount.value,
              "reason":e.target.category.value
            })
          })
          const response=await res.json()
          
         
            setData(response)
      
         

          console.log(data)
          
      }catch(err){
          alert("Somthing went to wrong....")
  
          console.log("Error",(err))
      }
      finally{
          setLoading(false)
      }
      
  }
  return (
    <section className=" pt-5  mt-[10rem] w-full ">
      <div className="flex flex-col  items-center justify-center w-full h-full px-6 py-8 mx-auto  :h-fit lg:py-0">
        
          <div className="w-full bg-gray-50 rounded-lg shadow   md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Advisor
                  </h1>
                  <form onSubmit={handelSubmit} className="space-y-4 md:space-y-6" >
                      <div>
                        <Dropdown />
                      </div>
                      <div>
                          <input type="number"  name="amount" id="amount" placeholder="Amount want to spent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     " required={true}/>
                      </div>
                     
                      {!loading ?(
                        <button type="submit" className="w-full text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700">Check</button>
                      ):(
                        <button type="submit" className="w-full text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 "><img className='mx-auto animate-spin' src={Loader} width={20}/></button>
                      )}
                     
                  </form>
                  {(data) && (
                    
                      ((data.spent) ?(
                        <p className="text-sm font-medium   text-green-500 ">
                          You are eligible to proceed with the expenditure.
                    </p>
                      ):(
                        <p className="text-sm font-medium   text-red-500 ">
                          You are currently not eligible to proceed with the expenditure.
                        </p>
                      ))
                    
                  )}
                  
                  
              </div>
          </div>
      </div>
    </section>
  )
}

export default Advisor