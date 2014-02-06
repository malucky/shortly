Shortly.ClicksView = Backbone.View.extend({

  className: 'clicks',

  events: {
  },

  initialize: function(){
    // this.collection.on('change, sync', this.addAll, this);
    // this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    var that = this;
    window.that = this;
    console.log(this);
    console.log(this.collection.models);
    _.each(this.collection.models, function(click){
      console.log(click.get('created_at'));
      that.$el.append(click.get('created_at'));
      that.$el.append('<br>')
    });

    return this;
  },

  addAll: function(filteredLinks){
  },

  addOne: function(item){
  },

  sortBy: function(){
  }

});