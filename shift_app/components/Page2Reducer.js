import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import axios from 'axios'
import * as Progress from "react-native-progress"

const Page2Reducer = ({mykey,book,start,end,id}) => {
 const [Pressed, setPressed]= useState(false);
 var i;
 var arr= new Array();
 for(i=0;i<start.length;i++){
  arr.push({"start" :start[i] , "end" : end[i] , "book" : book[i] , "id": id[i] })
 }


  return ( <View>
    {arr?.map ( data =>  ( 
    <View className='flex-row justify-between items-center border-b-[0.75px] border-t-[0.75px] border-slate-300' >
        <View className='ml-5 py-5'>
          <Text className='text-[#4F6C92] text-xl  '> {data.start} - {data.end}</Text>
        </View> 
        <TouchableOpacity className='mr-8 h-10 w-24 rounded-3xl border border-[#55CB82]' onPress={() => {setPressed(data.id);  axios.post(`http://10.0.2.2:3000/shifts/${data.id}/book`,{id : data.id} ).then(response =>{console.log(response)})}}>
            <Text className='ml-7 mr-4 mt-1 text-[#16A64D] text-lg font-semibold' >     
            { data.id== Pressed ?
                  <Progress.Circle size={30} indeterminate={true} color="green" /> : data.book==false ?"Book" : "Booked" }
                  </Text>
    
          </TouchableOpacity>
</View>
))}
</View>
  )
}

export default Page2Reducer