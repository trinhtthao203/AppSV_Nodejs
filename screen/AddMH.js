import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { Item, Input, Label } from 'native-base';
import axios from 'axios';
import ActivityScreen from './Activityscreen';
import Mybutton from '../components/Mybutton';

class AddMH extends React.Component {
  static navigationOptions = {
    title: 'Them Mon hoc',
  };

  state={loading:true};
 
  async handleSave(){
    const {mamon,tenmon,sotc}=this.state;
    if(mamon==""||tenmon==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.insert(mamon,tenmon,sotc);   
      this.props.navigation.state.params.refresh();
    }
    this.props.navigation.navigate("MonHoc");
  }

  insert(mamon,tenmon,sotc){
    axios({
        method:'post',
        url:'/addMH',
        data:{
          mamon:mamon,
          tenmon:tenmon,
          sotc,sotc
        }
      })
      .then(res=>{
        res.data;
        console.log(res);
        Alert.alert("INFO","MH đã được thêm");        
      })
      .catch(err=>{
        console.log(err);
      })
  }
    render() {
       if(this.state.isLoading){
        return<ActivityScreen/>
      }
      return (
        <View style={styles.container}>
              <Item stackedLabel>
                <Label>Mã môn học:*</Label>
                <Input onChangeText={(val)=>this.setState({mamon:val})} value={this.state.mamon} />
              </Item>
              <Item stackedLabel>
                <Label>Tên môn học:*</Label>
                <Input onChangeText={(val)=>this.setState({tenmon:val})} value={this.state.tenmon}/>
              </Item>
               <Item stackedLabel>
                <Label>Số tín chỉ:</Label>
                <Input onChangeText={(val)=>this.setState({sotc:val})} value={this.state.sotc}/>
              </Item>               
              <Mybutton title="Cập nhật chỉnh sửa" onClick={()=>this.handleSave()} />
              <Label style={{color:'red'}}>*Bắt buộc</Label>
        </View>
      );
    }
  }

  export default AddMH;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    }
  });