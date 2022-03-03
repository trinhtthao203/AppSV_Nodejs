import React,{useState} from 'react';
import { StyleSheet, Text, View,Modal, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Label,Input,Button,Item} from 'native-base';
import {Picker} from'@react-native-picker/picker';
// import Mypicker from '../components/Mypicker';

const Addstudy =()=>{ 

 
  const [svModal,setSVModal]=useState(false);
  const [mhModal,setMHModal]=useState(false);
  
  const [sv,setSV]=useState('');
  const [mh,setMH]=useState('');
  const [diem,setDiem]=useState('');

  const getData=()=>{
    const [dataSV] =useState([]);
    axios({
        method:'get',
        url:'/sinhvien'
      })
      .then(res=>{
        this.setState({
          dataSV:res.data,
          isLoading:false
        })
      })
      .catch(err=>{
        console.log(err);
      })
      return dataSV;
  }
  const pickerData=(dataSV)=>{
    return(dataSV?.length>0)&&(
      dataSV.map((val,index)=><Picker.Item label={val} value={val} key={index}/>))    
  }
  return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.myPicker}
          onPress={()=> setSVModal(!svModal)}
        >
          <Text style={styles.textPicker}>MSSV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.myPicker}
          onPress={()=> setMH(!mhModal)}
        >
          <Text style={styles.textPicker}>Mon Hoc</Text>
        </TouchableOpacity>
        <Item style={styles.myPicker}>
            <Text style={styles.textPicker}>Điểm*</Text>
            <Input onChangeText={(val)=>this.setState({diem:val})} value={diem}/>
        </Item>
        <Button style={{backgroundColor:'#40739e'}} onPress={()=>this.handleSave()}>
            <Text style={{ fontSize:20,color:'#dff9fb'}}>Thêm</Text>
        </Button>
        <Label style={{color:'red'}}>*Bắt buộc</Label>
        <Modal
          animationType="slide"
          transparent={true}
          visible={svModal}
          onRequestClose={()=>{
            Alert.alert("Modal......");
          }}
        >
          <View style={styles.container}>
            <View style={styles.pickerContainer}>
            <Button style={styles.closeButton}
               onPress={()=>setModalOpen(modalOpen)}
            ><Text style={{color:'#000',fontSize:20}}>Close</Text></Button>
            <Picker
              selectedValue={sv}
              style={{height:50,width:'100%'}}
              onValueChange={(itemValue,itemIndex)=>
                setSV(itemValue)
              }>
                {pickerData(dataSV)}
            </Picker>
            </View>
          </View>
        </Modal>
      </View>
    );  
}

export default Addstudy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textPicker:{
    marginVertical:20,
    fontSize:17,
    color:'#34495e'
  },
  pickerContainer:{
    backgroundColor:'#fff',
    width:'100%',
    height:'40%',
    position:'absolute',
    bottom:0
  },
  closeButton:{
    justifyContent:'center',
    alignContent:'center',
    width:'100%',height:'15%',
    backgroundColor:'#dff9fb'
  }
});