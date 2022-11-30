import { View, Text , ScrollView , TouchableOpacity} from 'react-native'
import React from 'react'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'
import Page2Reducer from './Page2Reducer'
const Page2Component = ({mykey,id, startTime, endTime , date, booked}) => {
 
  var i;
  var arr = new Array();
   for(i=0;i<startTime.length;i++){
    
    arr.push({ "start" :startTime[i] , "end" : endTime[i] , "date" :date[i] ,"book" : booked[i] , "id":id[i] })
    
   }
   const people = _.groupBy(arr, 'date')
   arr = new Array(); 
   _.forEach(people, function(value, key) {
    var k=0;
    var arrs=[];
    var arre=[];
    var arrb=[];
   var arri=[];

     
   for(k=0;k<value.length;k++){
     arrb[k] = value[k].book;
     arre[k] = value[k].end;
    arri[k] = value[k].id;
     arrs[k] = value[k].start;
   }
   arr.push({"day":value[0].date , "booked":arrb,"endTime":arre,"startTime":arrs ,"id":arri});
   })

  return (
   
      <View className='border-b-[0.75px] border-slate-100'>
        {arr?.map(elements => (
          <><View className='pl-8 py-3 bg-[#F1F4F8]  border-b-[0.75px]  border-slate-500'>
            <Text className='text-[#4F6C92] font-bold text-xl '>{elements.day}</Text>
          </View>
            <Page2Reducer
              key={Math.random()}
              book={elements.booked}
              start={elements.startTime}
              end={elements.endTime} 
              id={elements.id} />
          </>))}
      </View>
   
  )
}

export default Page2Component