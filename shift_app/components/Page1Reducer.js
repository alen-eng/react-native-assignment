import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'

const Page1Reducer = ({mykey1,area,startTime,endTime,disable}) => {
  return (


    <View className='flex-row justify-between items-center border-b-[0.75px] border-slate-300'>
    <View className='ml-5 py-3'>
      <Text className='text-[#4F6C92] text-xl  '>{startTime} - {endTime}</Text>
      <Text className='text-[#CBD2E1] text-lg'> {area}</Text>
    </View>{ disable ? <View className='mr-8 rounded-3xl border border-gray-400'>
     <Text className='px-6 py-2  text-gray-400 text-lg font-semibold'>Cancel</Text>
    </View> :
     <TouchableOpacity className='mr-8 rounded-3xl border border-[#E2006A]'>
     <Text className='px-6 py-2  text-[#E2006A] text-lg font-semibold'>Cancel</Text>
    </TouchableOpacity> }
  </View>
  
  )
}

export default Page1Reducer