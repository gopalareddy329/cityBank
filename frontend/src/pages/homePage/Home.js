import React, { useContext } from 'react'
import LineChart from '../../components/lineChart/LineChart'
import RadarPlot from '../../components/RadarChart/RadarChart';
import PieChart from '../../components/pieChart/PieChart';
import ColumnChart from '../../components/columnChart/ColumnChart';
import AreaChart from '../../components/areaChart/AreaChart'
import Treemap from '../../components/TreeMap/Treemap';
import AuthFetch from '../../hooks/authFetch'
import AuthContext from '../../context/AuthContext'
function ToTodaysDate() {
  const today = new Date();
  

// Get the start of the month (1st day)
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Create an array of dates from the start of the month to today
  const dateList = [];
  let currentDate = startOfMonth;

  while (currentDate <= today) {
  const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  dateList.push(formattedDate);
  
  // Increment the date by one day
  currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateList
}

const Home = () => {
  const {authToken}=useContext(AuthContext)

  const {data}=AuthFetch(authToken,'graphs/')
  console.log(data)

  

  const dateList=ToTodaysDate()
  return (
    <div className='max-w-[1600px] bg-gray-50 mx-auto p-10  flex flex-col w-full min-h-screen '>

        <div className='flex w-full h-fit gap-2 max-md:block justify-center items-center'>
          <div className='md:w-[60%] w-full h-fit p-5 shadow-sm '>
            {data?.advisor_report?.reports && (<AreaChart data={data.advisor_report}/>)}
          </div>
          <div className='md:w-[40%] '>
            {data?.tree_map?.reports && (<Treemap data={data?.tree_map?.reports}/>)}
            
          </div>
        </div>
      
        <div className='flex w-full max-md:block'>
            <div className='md:w-[60%] w-full h-fit p-5 shadow-sm bg-gray-50'>
              <LineChart x={dateList} title={"Predicted vs Actual"} y={[[30, 50, 25, 60, 32, 15, 90],[90, 40, 45, 50, 49, 60, 70]]}/>
            </div>
            <div className='md:w-[60%] w-full h-fit p-5 shadow-sm bg-gray-50'>
              <RadarPlot title={"Evaluator Report"} x={['Entertainment', 'Groceries', 'Dining Out', 'Utilities', 'Clothing', 'Miscellaneous', 'Education', 'Health', 'Travel']}  y={[[150, 300, 120, 250, 80, 50, 100, 200, 180],[90, 340, 45, 50, 49, 60, 70,0,0]]}/>
            </div>
        </div>

        <div className='flex w-full h-fit max-md:block'>
            <div className='md:w-[50%] flex justify-center w-full h-full p-5 shadow-sm bg-gray-50'>
              <ColumnChart />
            </div>
           <div className='md:w-[50%] flex justify-center items-center w-full h-fit p-5 shadow-sm bg-gray-50'>
              <PieChart labels={['January', 'February', 'March', 'April', 'May']} title={"Expenditure"} y={[44, 55, 41, 17, 15]}/>
            </div>
            
        </div>
      
    </div>
  )
}

export default Home