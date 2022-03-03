import React from 'react';
import { StyleSheet, View ,Text, Alert} from 'react-native';
import { FlatList,TouchableOpacity } from 'react-native-gesture-handler';
import {Item } from 'native-base';
import axios from 'axios';
import Mybutton from '../components/Mybutton';
import ActivityScreen from './Activityscreen';
import MyRefresh from '../components/MyRefresh';

class MonHoc extends React.Component {
  static navigationOptions = {
    title: 'Môn Học',
  };

  constructor(props){
      super(props);
      this.state={
          isLoading:true,
          dataMH:[]
      }
  }
  componentDidMount(){
    this.fetch();
 }  
 fetch(){
   axios({
       method:'get',
       url:'/monhoc'
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
  refresh=()=>{
      this.fetch();
  }

  handleDEL(id){
    try{
      this.delete(id);
      Alert.alert("INFO","Môn học đã được xóa !");
    }catch(err){
      console.log(err);
    }
    this.refresh();
  }
  
  delete(mamon){
      axios.delete(`/delMH/${mamon}`)
      .then((res)=>
      console.log(res)
      )
      .catch((err)=>{
        console.log(err);
      })
      this.refresh();
  }

  handleADD(){
    this.props.navigation.navigate('AddMH')
  }
  render() {  
  if(this.state.isLoading){
      return<ActivityScreen/>
    }
    const {navigation} = this.props;  
  return(
      <View >
        <View style={styles.TextHeader}>
              <Text style={styles.maMH}>Mã môn</Text>
              <Text style={styles.tenMH}>Tên môn</Text> 
              <Text style={styles.soTC}>Số TC</Text>  
              <Mybutton title="ADD" onClick={()=>this.handleADD()} />
              <MyRefresh  onClick={()=>this.refresh()}  /> 
        </View>
        <View style={styles.box}>
            <FlatList
              data={this.state.dataMH}
              renderItem={({item})=>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity 
                activeOpacity={0.5}
                onPress={()=>navigation.navigate('FromMH',{idMH:item.id,maMH:item.mamon,tenMH:item.tenmon,sotcMH:item.sotc,refresh:this.refresh})}
                >
                <Item style={{paddingBottom:5}}>
                  <Text style={styles.TextListItemMSSV}>{item.mamon}</Text>
                  <Text style={styles.TextListItem}>{item.tenmon}</Text>           
                  <Text style={{width:60,marginTop:20}}>{item.sotc}</Text>                         
                </Item>        
                </TouchableOpacity>
                <Mybutton title='DEL' onClick={()=>{this.handleDEL(item.mamon)}} />
              </View>
            }
            keyExtractor={(item)=>`${item.id}`}
          />          
        </View>       
      </View>
      
       
    );  
    }
  }
  export default MonHoc

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextHeader:{
    flexDirection:'row',
    backgroundColor:'#58B19F',
    fontSize:15,
    color:'#fff',
    paddingLeft:5
  },
  maMH:{
    fontSize:15,
    marginVertical:15 },
  tenMH:{
    fontSize:15,
    marginHorizontal:17,
    marginVertical:15
  },
  soTC:{
    fontSize:15,
    marginLeft:70,
    marginVertical:15,
    marginRight:12
  },
  TextListItem:{
        color:'#6F1E51',
        width:170,
        paddingTop:20,
        paddingLeft:15
   },
    TextListItemMSSV:{
        color:'#2C3A47',
        marginHorizontal:10,
        width:50,
        paddingTop:20

    }

});