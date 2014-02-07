Shortly.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    "": "renderIndex",
    "create": "createLink",
    "details/:code": "renderClicksView"
  },

  renderIndex: function(){
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: links} );
    var that = this;
    linksView.collection.on('renderClickView', function(code){
      that.navigate("details/"+code, {trigger: true});
    });
    this.$el.html( linksView.render().el );
  },

  createLink: function(){
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.html( linkCreateView.render().el );
  },

  renderClicksView: function() {
    var pathname = window.location.pathname;
    var code = pathname.slice(pathname.lastIndexOf('/'));
    var origin = window.location.origin;
    var clickDataUrl = origin+'/clicks'+code;

    var clicks = new Shortly.Clicks();
    clicks.url = clickDataUrl;
    var that = this;
    clicks.fetch({success: function(){
      // console.log(clicks.model[0]);
      // console.log(clicks.model[0].get('title'));
      var clicksView = new Shortly.ClicksView({collection: clicks});
      that.$el.html(clicksView.render('TITLE').el);
    }});
  }
});