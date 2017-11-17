
  
  

  module.exports = { 
        // this.state.posts[i].likes=this.state.posts[i].likes + 1;
        // this.state.posts[i].likes=addLikeTest(this.state.posts[i].likes)    
     addLikeTest: function(a) {
    return a + 1;
  },
    minusLikeTest: function(a){
      return a-1;
    },

    checkCommentLengthTest: function(a){
      if (a > 0){
        return true
      }
      else return false
    },

    checkPostTypeTest: function(a){
      if (a==='complete'){
      return true
    }
    else return false
    },

    checkUserIdTest: function(a, b){
      if(a===b){
        return true
      }
      else return false
    }
}