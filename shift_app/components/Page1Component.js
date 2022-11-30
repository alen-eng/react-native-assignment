import { View, Text } from 'react-native'

import Page1Reducer from './Page1Reducer';

const Page1Component = ({mykey,date,duration,number,area,startTime,endTime,disable}) => {
 
 var i;
var arr= new Array();

 for(i=0;i<area.length;i++){
  
  arr.push({ "start" :startTime[i] , "end" : endTime[i] , "area" : area[i] , "disable" : disable[i] })
  
 }
 


  return (
    
        <View className='border-b-[0.75px] border-slate-100'>
   
        <View className='pl-8 py-3 flex-row bg-[#F1F4F8]  border-b-[0.75px] border-slate-300'>
          <Text className='text-[#4F6C92] font-bold text-xl '>{date}</Text>
          <Text className='text-[#CBD2E1] text-xl pl-5 '>{number} shifts , {duration} </Text>
        </View> 
 { arr?.map( detail => (
        <Page1Reducer
        key={ Math.random()}
         area={detail.area}
          startTime={detail.start}
         endTime={detail.end}
         disable={detail.disable}
        />
))}
   </View>


  )
}

export default Page1Component