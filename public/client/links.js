Shortly.Links = Backbone.Collection.extend({

  model: Shortly.Link,
  url: '/links',

  setComparator: function(name) {
    this.comparator = function(a, b) {
      if(Number(a.get(name)) > Number(b.get(name))){
        return false;
      } else {
        return true;
      }
    };
  }

});