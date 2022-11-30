import { TouchableOpacity , SafeAreaView, View, Text, ScrollView } from 'react-native'
import React , { useState, useEffect, useLayoutEffect } from 'react'
import Page1Component from '../components/Page1Component'
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import moment from 'moment/moment';
const URL= 'http://10.0.2.2:3000/shifts';

const Page1 = () => {
  const navigation= useNavigation();
  const [availableshifts , setavailableshifts] = useState([]);
 
  useLayoutEffect (()=>{
    navigation.setOptions({
      headerShown:false,
    });
 },[]);

useEffect( () => {
fetch(URL).then((response) =>  response.json()).then( result => {
   var i;
 
for(i=0; i< result.length ;i++){
  var t = new Date(result[i].startTime);
  var hours = t.getHours();
  var minutes = t.getMinutes();
    
  var startHour=('0' + t.getHours()).slice(-2);
   hours = hours % 12;  
 
   hours = hours ? hours : 12;  
   minutes = minutes < 10 ? '0' + minutes : minutes; 
   var date=('0' + t.getDate()).slice(-2)  + '/' + ('0' + (t.getMonth() + 1) ).slice(-2) + '/' + (t.getFullYear());
   var s=new Date();
   var currentHour=('0' + s.getHours()).slice(-2)
   var today= ('0' + s.getDate()).slice(-2)  + '/' + ('0' + (s.getMonth() + 1) ).slice(-2) + '/' + (s.getFullYear());
   var tommorow=  new Date().getDate(); 
    var date1=t.getDate();
    var date2= (t.getFullYear()) + '-' + ('0' + (t.getMonth() + 1) ).slice(-2) + '-' + ('0' + t.getDate()).slice(-2);
   
   var formatted = 
     ('0' + t.getHours()).slice(-2)
     + ':' + ('0' + t.getMinutes()).slice(-2);

var e= new Date(result[i].endTime);
var hours1 = e.getHours();
var minutes1 = e.getMinutes();
  

hours1 = hours1 % 12;  

hours1 = hours1 ? hours1 : 12;  
minutes1 = minutes1 < 10 ? '0' + minutes1 : minutes1; 
var eformatted = 
  ('0' + e.getHours()).slice(-2)
  + ':' + ('0' + e.getMinutes()).slice(-2);

 result[i].endTime = eformatted;
 result[i].startTime = formatted; 
 
 if(date == today){  { 
  result[i].date  = "Today" ;
  
 } }
 else if(date1 == tommorow + 1){ {
  result[i].date = "Tomorrow";
  
}}
 else{ var formatdate=moment(date2).format('MMMM DD '); result[i].date = formatdate  }
 if(startHour < currentHour){
  result[i].disable=true;
 }
 else result[i].disable=false;

}
 const people = _.groupBy(result, 'date')

   var obj = { arrayOne : [],};
 _.forEach(people, function(value, key) {
  var durationdayhr=0;
  var durationdaymin=0;
  var k=0;
  var arrs=[];
 var arre=[];
 var arra=[];
 var arrd=[];
  var arr = new Array(); 
   
 for(k=0;k<value.length;k++){
   arrs[k] = value[k].startTime;
   arre[k] = value[k].endTime;
   arra[k] = value[k].area;
   arrd[k] = value[k].disable;
  let hourstart = value[k].startTime.slice(0, 2);
  let minutestart = value[k].startTime.slice(3);
  let hourend = value[k].endTime.slice(0, 2);
  let minuteend = value[k].endTime.slice(3);
  durationdayhr += hourend - hourstart;
  durationdaymin += minuteend - minutestart;
 } 
 
 if(durationdaymin >= 60){
    durationdayhr +=durationdaymin / 60;
    
 }
  const dayDuration = durationdayhr +" " + "hr" ; 
   arr.push(value.length);
   arr.push( dayDuration);
   arr.push(value[1].date);
   arr.push(arrs,arre,arra,arrd)
  
   obj.arrayOne.push([arr]);
  
   })
   setavailableshifts(obj)

  
  })
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    });
},[]);

  return (
    <SafeAreaView className='bg-[#F7F8FB] mt-6 '>
   <ScrollView className='mb-16'>
{Object.entries(availableshifts)?.map( shifts => (
    <Page1Component
    key={shifts[1][0][0][2]}
    date={shifts[1][0][0][2]}
    duration = {shifts[1][0][0][1]} 
    number={shifts[1][0][0][0]} 
    area= {shifts[1][0][0][5]}
    startTime= {shifts[1][0][0][3]}
    endTime= {shifts[1][0][0][4]}
    disable= {shifts[1][0][0][6]}
    />
  ))} 
   {Object.entries(availableshifts)?.map( shifts => (
    <Page1Component
    key={shifts[1][1][0][2]}
    date={shifts[1][1][0][2]}
    duration = {shifts[1][1][0][1]} 
    number={shifts[1][1][0][0]} 
    area= {shifts[1][1][0][5]}
    startTime= {shifts[1][1][0][3]}
    endTime= {shifts[1][1][0][4]}
    disable= {shifts[1][1][0][6]}
    />
  ))} 

{Object.entries(availableshifts)?.map( shifts => (
    <Page1Component
    key={shifts[1][2][0][2]}
    date={shifts[1][2][0][2]}
    duration = {shifts[1][2][0][1]} 
    number={shifts[1][2][0][0]} 
    area= {shifts[1][2][0][5]}
    startTime= {shifts[1][2][0][3]}
    endTime= {shifts[1][2][0][4]}
    disable= {shifts[1][2][0][6]}
    />
  ))} 
  {Object.entries(availableshifts)?.map( shifts => (
    <Page1Component
    key={shifts[1][3][0][2]}
    date={shifts[1][3][0][2]}
    duration = {shifts[1][3][0][1]} 
    number={shifts[1][3][0][0]} 
    area= {shifts[1][3][0][5]}
    startTime= {shifts[1][3][0][3]}
    endTime= {shifts[1][3][0][4]}
    disable= {shifts[1][3][0][6]}
    />
  ))}  
 
</ScrollView>
<View className=' absolute h-16 w-full bottom-0 border-t-[0.75px] border-[#CBD2E1] '>
<View className=' items-center flex-row  mt-4 justify-evenly'>
  <TouchableOpacity onPress={() =>{ navigation.navigate('Page2')}}>
    <Text className='text-[#3080FF] text-xl font-medium '>My shifts</Text>
     </TouchableOpacity>
    <Text className='text-gray-400 text-xl font-medium'>Available shifts</Text>
   </View>
   </View>


    </SafeAreaView>


  )
}

export default Page1