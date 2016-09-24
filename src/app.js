var vueApp = new Vue({
  el: '#vueApp',
  data: {
    todos: [],
    currTodo: "",
  },
  methods: {
    addTodo: function(){
      this.todos.push({name:this.currTodo,editing:false,complete:false});
      this.currTodo = "";
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
