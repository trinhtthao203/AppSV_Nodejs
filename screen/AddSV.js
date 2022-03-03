import React from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import { Container, Form, Item, Input, Label ,Button} from 'native-base';
import axios from 'axios';
import ActivityScreen from './Activityscreen';

class AddSV extends React.Component {
  static navigationOptions = {
    title: 'Thêm sinh viên'
  };
  
  state={loading:true,mssv:'',hten:''};

  async handleSave(){
    const {mssv,hten}=this.state;
    if(mssv==""||hten==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.insert(mssv,hten);
      this.props.navigation.state.params.refresh();
    }

    this.props.navigation.navigate("SinhVien");
    
  }

  insert(mssv,hten){
    axios({
        method:'post',
        url:'/addSV',
        data:{
          mssv:mssv,
          hten:hten
        }
      })
      .then(res=>{
        res.data;
        console.log(res);
        Alert.alert("INFO","SV đã được thêm");        
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
         <Container>
            <Form>
              <Item stackedLabel>
                <Label>MSSV*</Label>
                <Input onChangeText={(val)=>this.setState({mssv:val})} value={this.state.mssv} />
              </Item>
              <Item stackedLabel>
                <Label>Họ tên sinh viên*</Label>
                <Input onChangeText={(val)=>this.setState({hten:val})} value={this.state.hten}/>
              </Item>
               <Button block style={{backgroundColor:'#40739e'}} onPress={()=>this.handleSave()}>
                <Text style={{ fontSize:20,color:'#dff9fb'}}>Thêm</Text>
              </Button>
              <Label style={{color:'red'}}>*Bắt buộc</Label>
            </Form>
        </Container>
      );
    }
  }

  export default AddSV;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });