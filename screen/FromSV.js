
import React from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import { Container, Content, Form, Item, Input, Label ,Button} from 'native-base';
import axios from 'axios';
import ActivityScreen from './Activityscreen';
import Mybutton from '../components/Mybutton';
class FromSV extends React.Component {
  static navigationOptions = {
    title: 'Sinh Viên Chi tiet',
  };  
  state={loading:true};


  componentDidMount(){
    const {navigation} = this.props;
    const id= navigation.getParam('idSV'); 
    const mssv= navigation.getParam('msSV');  
    const hten= navigation.getParam('htenSV');   
    this.get_data(id,mssv,hten);
  }  

  get_data(id,mssv,hten){
    this.setState({
      id:id,
      mssv:mssv,
      hten:hten
    })
  }

   handleSave(){
    const {mssv,hten}=this.state;
    if(mssv==""||hten==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.update(mssv,hten);
      this.props.navigation.state.params.refresh();
    }
    
    this.props.navigation.navigate("SinhVien");
  }

  update(mssv,hten){
    axios({
            method:'put',
            url:`/putSV/${mssv}`,
            data:{
              hten:hten
            }
          })
          .then(res=>{
            res.data;
            console.log(res);
            Alert.alert("INFO","Sinh viên đã được sửa thành công! ");
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
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>MSSV*</Label>
                <Input editable={false} onChangeText={(val)=>this.setState({mssv:val})} value={this.state.mssv} />
              </Item>
              <Item stackedLabel>
                <Label>Họ tên sinh viên*</Label>
                <Input onChangeText={(val)=>this.setState({hten:val})} value={this.state.hten}/>
              </Item>
              <Mybutton title="Cập nhật chỉnh sửa" onClick={()=>this.handleSave()} />
              <Label style={{color:'red'}}>*Bắt buộc</Label>
            </Form>
          </Content>
        </Container>
      );
    }
  }

  export default FromSV;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });