var vueApp = new Vue({
  el: '#vueApp',
  data: {
    todos: [],
    currTodo: "",
  },
  computed: {
    uniqueImportance:function(){
      importanceArray = [];
      for (var i = 0; i < this.todos.length; i++) {
        if(importanceArray.indexOf(this.todos[i].importance) === -1){
          importanceArray.push(this.todos[i].importance);
        }
      }
      return importanceArray;
    }
  },
  methods: {
    addTodo: function(){
      var tempImportance = this.newImportance
      if(this.newImportance === "" || !this.newImportance) {
        tempImportance = "low"
      }
      this.todos.push({name:this.currTodo,editing:false,complete:false,importance:tempImportance});
      this.currTodo = "";
      this.newImportance = "";
    },
    remove: function(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index,1);
    },
    edit: function(todo) {
      var index = this.todos.indexOf(todo);
      this.todos[index].editing = true;
    },
    save: function(todo) {
      var index = this.todos.indexOf(todo);
      this.todos[index].editing = false;
    },
    changeCheck: function(todo){
      if(todo.complete){
        todo.complete = false;
      } else {
        todo.complete = true;
      }
    },
    submit: function(){
      this.$http.post('/todos', this.todos).then(function(response) {
        console.log(response.body)
      }, function(response) {
        console.log("errors!")
      });
    }
  },
  created: function(){
    this.$http.get('/todos').then(function(response) {
      console.log(response.body);
      var data = JSON.parse(response.body);
      this.todos = data.todos;
    }, function(response) {
      console.log("errors!")
    });
  }
})
