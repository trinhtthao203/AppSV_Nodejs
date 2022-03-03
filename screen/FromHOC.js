
import React from 'react';
import { StyleSheet, Alert} from 'react-native';
import { Container, Content, Form, Item, Input, Label ,Button} from 'native-base';
import axios from 'axios';
import ActivityScreen from './Activityscreen';
import Mybutton from '../components/Mybutton';
class FromHOC extends React.Component {
  static navigationOptions = {
    title: 'Học Chi Tiết',
  };  

  state={loading:true};


  componentDidMount(){
    const {navigation} = this.props;
    const id= navigation.getParam('idHOC'); 
    const mssv= navigation.getParam('msSV');  
    const mamon= navigation.getParam('maMH');   
    const diem= navigation.getParam('diemHOC');   
    this.get_data(id,mssv,mamon,diem);
  }  

  get_data(id,mssv,mamon,diem){
    this.setState({
      id:id,
      mssv:mssv,
      mamon:mamon,
      diem:diem.toString()
    })
  }

   handleSave(){
    const {id,diem}=this.state;
    if(diem==""){
      Alert.alert("WARNING!!!","Lỗi nhập liệu vui lòng kiểm tra các dữ liệu bắt buộc đã được điền");
    }else{
      this.update(id,diem);
      this.props.navigation.state.params.refresh();
    }
    
    this.props.navigation.navigate("Hoc");
  }

  update(id,diem){
    axios({
            method:'put',
            url:`/putHOC/${id}`,
            data:{
              diem:diem
            }
          })
          .then(res=>{
            res.data;
            console.log(res);
            Alert.alert("INFO","Học đã được sửa");
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
                <Label>Tên môn học*</Label>
                <Input editable={false} onChangeText={(val)=>this.setState({hten:val})} value={this.state.mamon}/>
              </Item>
              <Item stackedLabel>
                <Label>Điểm *</Label>
                <Input 
                  keyboardType = 'numeric'
                  onChangeText={(val)=>this.setState({diem:parseFloat(val)})}
                  value={this.state.diem}
                /> 
              </Item>              
              <Mybutton title="Cập nhật chỉnh sửa" onClick={()=>this.handleSave()} />
              <Label style={{color:'red'}}>*Bắt buộc</Label>
            </Form>
          </Content>
        </Container>
      );
    }
  }

  export default FromHOC;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });