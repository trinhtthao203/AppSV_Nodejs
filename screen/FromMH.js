import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {  Item, Input, Label } from 'native-base';
import axios from 'axios';
import ActivityScreen from './Activityscreen';
import Mybutton from '../components/Mybutton';

class FromMH extends React.Component {
  static navigationOptions = {
    title: 'Môn học chi tiết',
  };  
  state={loading:true};


  componentDidMount(){
    const {navigation} = this.props;
    const id= navigation.getParam('idMH'); 
    const mamon= navigation.getParam('maMH');  
    const tenmon= navigation.getParam('tenMH');
    const sotc= navigation.getParam('sotcMH');        
    this.get_data(id,mamon,tenmon,sotc);
  }  

  get_data(id,mamon,tenmon,sotc){
    this.setState({
      id:id,
      mamon:mamon,
      tenmon:tenmon,
      sotc:sotc.toString()
    })
  }

   handleSave(){
    const {id,mamon,tenmon,sotc}=this.state;
    if(mamon==""||tenmon==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      // this.delete(id);
      this.update(mamon,tenmon,sotc);
      this.props.navigation.state.params.refresh();
    }
    this.props.navigation.navigate("MonHoc");
  }

  update(mamon,tenmon,sotc){
     axios({
            method:'put',
            url:`/putMH/${mamon}`,
            data:{
              tenmon:tenmon,
              sotc:sotc
            }
          })
          .then(res=>{
            res.data;
            console.log(res);
            Alert.alert("INFO","Môn học đã được sửa !");
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
        <View>
              <Item stackedLabel>
                <Label>Ma mon hoc:*</Label>
                <Input editable={false} onChangeText={(val)=>this.setState({mamon:val})} value={this.state.mamon} />
              </Item>
              <Item stackedLabel>
                <Label>Tên mon hoc:*</Label>
                <Input onChangeText={(val)=>this.setState({tenmon:val})} value={this.state.tenmon}/>
              </Item>
               <Item stackedLabel>
                <Label>So tin chi</Label>
                <Input onChangeText={(val)=>this.setState({sotc:val})} value={this.state.sotc}/>
              </Item>               
              <Mybutton title="Cập nhật chỉnh sửa" onClick={()=>this.handleSave()} />
              <Label style={{color:'red'}}>*Bắt buộc</Label>
      </View>         
      );
    }
  }

  export default FromMH;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });