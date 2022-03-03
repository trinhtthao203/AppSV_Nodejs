import React from 'react';
import { StyleSheet, View ,Text, Alert} from 'react-native';
import { FlatList,TouchableOpacity} from 'react-native-gesture-handler';
import { Header, Right,Item} from 'native-base';
import axios from 'axios';
import Mybutton from '../components/Mybutton';
import ActivityScreen from './Activityscreen';
import MyRefresh from '../components/MyRefresh';


class Hoc extends React.Component {
  static navigationOptions = {
    title: 'Học',
  };

  constructor(props){
      super(props);
      this.state={
          isLoading:true,
          dataHOC:[],
      }
  }
  componentDidMount(){
    this.fetch();
  }  

  fetch(){
    axios({
        method:'get',
        url:'/hoc'
      })
      .then(res=>{
        this.setState({
          dataHOC:res.data,
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
      Alert.alert("INFO","Xóa thành công!");
    }catch(err){
      console.log(err);
    }
  }
  
  handleADD(){    
    this.props.navigation.navigate('AddHOC',{refresh:this.refresh});
  }
  delete(id){
      axios.delete(`/delHOC/${id}`)
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
            <View style={styles.Myheader}>
              <Text style={styles.TextHeader}>MSSV</Text>
            </View>
            <View style={styles.Myheader}>
              <Text style={styles.TextHeader}>Mã môn</Text>
            </View>
            <View style={styles.Myheader}>
              <Text style={styles.TextHeader}>Điểm</Text>
            </View>
            <Right>
              <Mybutton title="ADD" onClick={()=>this.handleADD()}/> 
              <MyRefresh onClick={()=>this.refresh()}/>             
            </Right>
          </Header>
        </View>
        <View style={styles.box}>
            <FlatList
              data={this.state.dataHOC}
              renderItem={({item})=>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity 
                activeOpacity={0.5}
                onPress={()=>navigation.navigate('FromHOC',
                  { idHOC:item.id,
                    msSV:item.mssv,
                    maMH:item.mamon,
                    diemHOC:item.diem,
                    refresh:this.refresh}
                )}
                >
                <Item style={{paddingBottom:5}}>
                  <Text style={styles.TextListItemMSSV}>{item.mssv}</Text>
                  <Text style={styles.TextListItem}>{item.mamon}</Text>  
                  <Text style={styles.TextListItem}>{item.diem}</Text>                    
                </Item>        
                </TouchableOpacity>
                <Mybutton title='DEL' onClick={()=>{this.handleDEL(item.id)}} />
              </View>
             
            }
            keyExtractor={(item)=>`${item.id}`}
          />          
        </View>       
      </View>       
    );  
    }
  }
  export default Hoc;

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
        width:110,
        paddingTop:20
   },
  TextListItemMSSV:{
    color:'#2C3A47',
    marginHorizontal:10,
    width:70,
    paddingTop:20
  },
  Myheader:{
    marginLeft:0,
    marginRight:25,
    marginTop:10
  }
});