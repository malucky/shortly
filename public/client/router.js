Shortly.Router = Backbone.Router.extend({
  routes: {
    "": "renderIndex",
    "/details/:code": "renderClicksView"
  },

  renderIndex: function(){
    console.log('render index trigger from router');
    this.trigger('renderIndex');
  },

  renderClicksView: function() {
    console.log('rendering clicks view from router');
    this.trigger('renderClicks');
  }
});