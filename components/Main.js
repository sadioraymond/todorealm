import React from 'react';
import {
     StyleSheet, 
     Text, 
     View,
     TextInput,
     ScrollView,
     TouchableOpacity,
     Alert,
     FlatList,
     ListView,
     Button, 
     Modal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

} from 'react-native';
import realm from '../databases/todo';
import { insertNewTodoList,updateTodoList,queryAllTodoLists,deleteTodoList,reload} from '../databases/todo';
import Tache from './Tache';
export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state={
            todoLists:[],
            name:'',
            val: [],
            refreshing: false,
            modalVisible: false,
            id:0,
        };
        this.reloadData();
       realm.objects('Todos').addListener((puppies, changes) => {
        this.reloadData();
      });
    }
    reloadData=()=>{
        this.setState({todoLists:queryAllTodoLists});
        console.log('reload Data');
    }
    closeModal() {
        updateTodoList(this.state.id,this.state.name,this.state.val);
        console.log('id bini',this.state.id );
        this.setState({name:''});
        this.setState({id:0});
        this.setState({modalVisible:false});
       }
  render() {
    let taches = this.state.todoLists.map((val, key)=>{
        return <Tache key={key} keyval={key} val={val}
                deleteMethod={()=>this.deleteTache(key,val)} updateMethod={()=>this.updateTache(key,val)}/>
    });
    return (
        <View style={styles.container}>
        <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}
        >
          <View>
            <View>
              <Text>Modifier le Todo</Text>
              <TextInput 
              style={styles.textInput} placeholderTextColor='white'
               underlineColorAndroid='transparent' autoCorrect={false}
               onChangeText={(text) => this.setState({name:text})}
               value={this.state.name}>
          </TextInput>
              <Button
                  onPress={() => this.closeModal()}
                  title="Modifier todo"
              >
              </Button>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
            <Text style={styles.headerText}>- Liste Des Taches -</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
           {taches}
        </ScrollView>

        <View style={styles.footer}>
            <TextInput 
                style={styles.textInput}
                placeholder=''
                placeholderTextColor='white'
                underlineColorAndroid='transparent' autoCorrect={false}
                 onChangeText={(text) => this.setState({name:text})}
                value={this.state.name}>
            </TextInput>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={()=>{
             const name=this.state.name;
            const id=queryAllTodoLists.length+1;
            console.log('id0',id);
            console.log('nom0',name);
            console.log('taille', queryAllTodoLists.length);
            this.setState({name:''});
           insertNewTodoList(id,name);
        }}>
        <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
    </View>
    );
  }
  deleteTache(key,val){
    deleteTodoList(val);
    this.reloadData();
}

    updateTache = (key,val) => {
        this.setState({modalVisible:true});
        this.setState({id:val.id});
        this.setState({val:val});
        console.log('id bi',val.id);
        this.reloadData();
     }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
      },
      FlatList:{
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
      },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
      },
      innerContainer: {
        alignItems: 'center',
      },
});
