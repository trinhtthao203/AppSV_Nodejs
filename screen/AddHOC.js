import React from 'react';
import { StyleSheet, Text, View,Modal, Alert ,textInput} from 'react-native';
import {Picker} from'@react-native-picker/picker';
import axios from 'axios';
import Mybutton from '../components/Mybutton';
import { Item, Input, Label} from 'native-base';


class AddHOC extends React.Component {
  static navigationOptions = {
    title: 'Thêm học',
  };
  constructor(props){
      super(props);
      this.state={
          isLoading:true,
          dataHOC:[],diem:0.0,
          mssv:'',dataSV:[],
          mamon:'',dataMH:[]
      }
  }
  UNSAFE_componentWillMount(){
    this.fetchSV();
    this.fetchMH();
  }  

  fetchSV(){
    axios({
        method:'get',
        url:'/sinhvien/mssv'
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
  }
 
  fetchMH(){
    axios({
        method:'get',
        url:'/monhoc/mamon'
      })
      .then(res=>{
        this.setState({
          dataMH:res.data,
          isLoading:false
        })
      })
      .catch(err=>{
        console.log(err);
      })
  }
  handleADD(){
    const {mssv,mamon,diem}=this.state;
    if(mssv==""||mamon==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.insert(mssv,mamon,diem);
    }
  }

  insert(mssv,mamon,diem){
    axios({
        method:'post',
        url:'/addHOC',
        data:{
          mssv:mssv,
          mamon:mamon,
          diem:diem
    }
      })
      .then(res=>{
        console.log(res);
        Alert.alert("INFO","Hoc đã được thêm");        
      })
      .catch(err=>{
        console.log(err);
      })
  }
    
  render() {
    return (
      <View style={styles.container}>
              <Text style={styles.textTitle}>MSSV *:</Text>
              <Picker
                selectedValue={this.state.mssv}
                style={styles.myPicker}
                onValueChange={(itemValue,itemIndex)=>
                this.setState({mssv:itemValue})
              }>
                {
                this.state.dataSV.map((val,index)=>
                <Picker.Item label={val.mssv} value={val.mssv} key={index}/>)
                }
              </Picker>
               <Text style={styles.textTitle}>Môn học *:</Text>
              <Picker              selectedValue={this.state.mamon}
                style={styles.myPicker}
                onValueChange={(itemValue,itemIndex)=>
                this.setState({mamon:itemValue})
              }>
                {
                this.state.dataMH.map((val,index)=>
                <Picker.Item label={val.mamon} value={val.mamon} key={index}/>)
                }
              </Picker>
              <View style={styles.containerInput}>
              <Text style={styles.textTitle}>Điểm *</Text>
              <Input 
                  placeholder='0.0'
                  keyboardType = 'numeric'
                  onChangeText={(val)=>this.setState({diem:parseFloat(val)})}
                  value={this.state.diem}
                /> 
              </View>
              <Mybutton title='ADD' onClick={()=>{this.handleADD()}}/>
            </View>
      );
    }
  }
export default AddHOC;

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
    height:'20%',
    position:'absolute',
    top:10
  },
  myPicker:{
    height:50,
    width:'100%',
    marginVertical:10
  },
  textTitle:{
    fontSize:20,
    paddingLeft:10,
    paddingVertical:15,
    height:60,
    color:'#000',
    backgroundColor:'#f1f2f6'
  },
  containerInput:{
    height:110
  }
});