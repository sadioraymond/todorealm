import { resolve } from 'url';
import Todo from './model';
const Realm = require('realm');



let realm = new Realm({
    schema: [Todo],
    schemaVersion: 11,
    // migration: function(oldRealm, newRealm) {
    //   newRealm.deleteAll();    
    // }
   });
   
  //Add todolist
 
    export function insertNewTodoList(id,name){ 
      try {
        realm.write(() => {
          realm.create('Todos',
          { 
            id:id,
            name:name,        
          }
        );
        console.log('nombd',name);
      });
      } catch (e) {
        console.log("Error on creation",e);
      }
   };

    //update todolist
    export function updateTodoList(id,name,val){
      realm.write(() => {
      realm.create('Todos', {
        id: id,
        name: name
      }, true
    );
  });
  //ici on supprime l'ancien enregistrement parce que on a que le name et l'id dans 
  //la table, avec un attribut en plus on aurait pu l'éviter
  deleteTodoList(val);
    }
    //delete todolist
    export function deleteTodoList(val){
      realm.write(() => {
      realm.delete(val);
    });
    }

   export function reload(){
    realm.objects('Todos').addListener((puppies, changes) => {
      queryAllTodoLists();
    });
   }
    //list todolist
  export let queryAllTodoLists=realm.objects('Todos');
 
  export default new Realm(realm);