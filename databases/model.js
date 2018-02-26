
 const Todo = {
    name: 'Todos',
    primarykey:'id',
    properties: {
      id:'int',
      name: {type: 'string', indexed: true},
    }
  };

  module.exports = Todo;