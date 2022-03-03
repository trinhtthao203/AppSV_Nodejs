import React from 'react';
import { StyleSheet, View ,Text, Alert} from 'react-native';
import { FlatList,TouchableOpacity} from 'react-native-gesture-handler';
import { Header, Left, Body, Right,Item} from 'native-base';
import axios from 'axios';
import Mybutton from '../components/Mybutton';
import ActivityScreen from './Activityscreen';
import MyRefresh from '../components/MyRefresh';

class SinhVien extends React.Component {
  static navigationOptions = {
    title: 'Sinh Viên',
  };

  constructor(props){
      super(props);
      this.state={
          isLoading:true,
          dataSV:[]
      }
  }
  componentDidMount(){
     this.fetch();
  }  

  fetch(){
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
  }
  refresh=()=>{
    this.fetch();
  }

  handleDEL(mssv){
    try{
      this.delete(mssv);
      Alert.alert("INFO","Sinh viên đã được xóa !");
    }catch(err){
      console.log(err);
    }
  }
  
  handleADD(){    
    this.props.navigation.navigate('AddSV',{refresh:this.refresh});
  }
  delete(mssv){
      axios.delete(`/delSV/${mssv}`)
      .then((res)=>
      console.log(res)
      )
      .catch((err)=>{
        console.log(err);
      })
      this.refresh();
  }
  render() {  
    if(this.state.isLoading){
      return<ActivityScreen/>
    }
    const {navigation} = this.props;  
    return(
      <View >
        <View>
          <Header style={{backgroundColor:'#58B19F'}}>
            <Left style={{marginRight:10}}>
              <Text style={styles.TextHeader}>MSSV</Text>
            </Left>
            <Body>
              <Text style={styles.TextHeader}>Họ tên</Text>
            </Body>
            <Right>             
              <Mybutton title="ADD" onClick={()=>this.handleADD()}/>  
              <MyRefresh  onClick={()=>this.refresh()}  />
            </Right>
          </Header>
        </View>
        <View style={styles.box}>
            <FlatList
              data={this.state.dataSV}
              renderItem={({item})=>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity 
                activeOpacity={0.5}
                onPress={()=>navigation.navigate('FromSV',{idSV:item.id,msSV:item.mssv,htenSV:item.hten,refresh:this.refresh})}
                >
                <Item style={{paddingBottom:5}}>
                  <Text style={styles.TextListItemMSSV}>{item.mssv}</Text>
                  <Text style={styles.TextListItem}>{item.hten}</Text>                  
                </Item>        
                </TouchableOpacity>
                <Mybutton title='DEL' onClick={()=>{this.handleDEL(item.mssv)}} />
              </View>
             
            }
            keyExtractor={(item)=>`${item.id}`}
          />          
        </View>       
      </View>       
    );  
    }
  }
  export default SinhVien

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextHeader:{
    fontSize:20,
    color:'#fff'
  },
  box:{
    marginBottom:120
  },
  TextListItem:{
        color:'#6F1E51',
        width:220,
        paddingTop:20
   },
    TextListItemMSSV:{
        color:'#2C3A47',
        marginHorizontal:10,
        width:70,
        paddingTop:20
    }
});