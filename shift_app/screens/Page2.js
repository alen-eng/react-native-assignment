import { View, Text ,TouchableOpacity, ScrollView , SafeAreaView , LogBox} from 'react-native'
import React , {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import _ from 'lodash';
import moment from 'moment/moment';

import Page2Component from '../components/Page2Component';
const URL= 'http://10.0.2.2:8080/shifts';
const Page2 = () => {
  const navigation= useNavigation();
 const [firstPressed , setfirstPressed]= useState(true);
 const [secondPressed , setsecondPressed] = useState(false);
 const [thirdPressed , setthirdPressed] = useState(false);
 
 const [myshifts , setmyshifts] = useState([]);
  useEffect( () => {
    fetch(URL).then((response) =>  response.json()).then( result => {
      var i;
 
      for(i=0; i< result.length ;i++){
        var t = new Date(result[i].startTime);
        var hours = t.getHours();
        var minutes = t.getMinutes();
        
        
         hours = hours % 12;  
       
         hours = hours ? hours : 12;  
         minutes = minutes < 10 ? '0' + minutes : minutes; 
         var date=('0' + t.getDate()).slice(-2)  + '/' + ('0' + (t.getMonth() + 1) ).slice(-2) + '/' + (t.getFullYear());
         var s=new Date();
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
      var newformat1 = e.getHours() >= 12 ? 'PM' : 'AM';  
      
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
      
      
      }
       const people = _.groupBy(result, 'area')
       console.log(people);

       var obj = { arrayOne : [],};
 _.forEach(people, function(value, key) {

  var k=0;
  var arrs=[];
 var arre=[];
 var arrb=[];
 var arri=[];
 var arrd=[];
  var arr = new Array(); 
   
  for(k=0;k<value.length;k++){
    arrb[k] = value[k].booked;
    arre[k] = value[k].endTime;
    arrs[k] = value[k].startTime;
    arrd[k] = value[k].date
    arri[k] = value[k].id;

    
  }
 
   arr.push(value.length);
   arr.push(value[1].area);
   arr.push(arrs,arre,arrb,arrd,arri)
  // arr.push(value[1].booked)
   obj.arrayOne.push([arr]);
   //console.log(arr)
   })
   setmyshifts(obj);

  })
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    });
},[]);
    

  return( 
      <SafeAreaView className='bg-[#F7F8FB] mt-6 mb-16'>
       
      { Object.entries(myshifts)?.map( shifts => (
     <View className='flex-row items-center justify-evenly border-b-[0.75px] border-slate-300 w-full h-20'>
          <TouchableOpacity>
            <Text onPress={() => {
              if(firstPressed==true) setfirstPressed(firstPressed);
               else setfirstPressed(!firstPressed);
              if(secondPressed==true)setsecondPressed(!secondPressed); if(thirdPressed==true)setthirdPressed(!thirdPressed);
                 } } className={` text-[#CBD2E1] text-xl font-medium  ${firstPressed && ' text-[#004FB4]'}`}>Helsinki ({shifts[1][0][0][0]})</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text onPress={() => {
              if(secondPressed==true)setsecondPressed(secondPressed);
              else setsecondPressed(!secondPressed);
              if(thirdPressed==true)setthirdPressed(!thirdPressed); if(firstPressed==true)setfirstPressed(!firstPressed); }} className={`text-[#CBD2E1] text-xl font-medium ${secondPressed && 'text-[#004FB4]'}`}>Tampere ({shifts[1][1][0][0]})</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => {
              if(thirdPressed==true)setthirdPressed(thirdPressed);
               else setthirdPressed(!thirdPressed);
               if(firstPressed==true)setfirstPressed(!firstPressed); if(secondPressed==true)setsecondPressed(!secondPressed);}} className={`text-[#CBD2E2] text-xl font-medium ${thirdPressed && 'text-[#004FB5]'}`}>Turku ({shifts[1][2][0][0]})</Text>
          </TouchableOpacity>
        </View>  ))}
         
          {  Object.entries(myshifts)?.map( shifts => (
            <ScrollView className='mb-20'>
              { firstPressed ?
            <Page2Component
              key={Math.random()}
              id={shifts[1][0][0][6]}
              startTime={shifts[1][0][0][2]}
              endTime={shifts[1][0][0][3]}
              date={shifts[1][0][0][5]}
              booked={shifts[1][0][0][4]} /> : secondPressed ? <Page2Component
              key={Math.random()}
              id={shifts[1][1][0][6]}
              startTime={shifts[1][1][0][2]}
              endTime={shifts[1][1][0][3]}
              date={shifts[1][1][0][5]}
              booked={shifts[1][1][0][4]} /> :  <Page2Component
              key={Math.random()}
              id={shifts[1][2][0][6]}
              startTime={shifts[1][2][0][2]}
              endTime={shifts[1][2][0][3]}
              date={shifts[1][2][0][5]}
              booked={shifts[1][2][0][4]} /> }
              </ScrollView> 
          ))}  
  
          <View className=' h-16 w-full fixed bottom-20 border-t-[0.75px] border-[#CBD2E1]'>
            <View className=' items-center flex-row  mt-4 justify-evenly'>
              <Text className='text-gray-400 text-xl font-medium '>My shifts</Text>
              <TouchableOpacity onPress={navigation.goBack}>
                <Text className=' text-[#3080FF] text-xl font-medium'>Available shifts</Text>
              </TouchableOpacity>
            </View>
          </View>
          
</SafeAreaView>
  )
}

export default Page2