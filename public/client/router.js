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

    var that = this;
    this.getTitle(code, function(title){
      var clicks = new Shortly.Clicks();
      clicks.url = clickDataUrl;
      clicks.fetch({success: function(){
        var clicksView = new Shortly.ClicksView({collection: clicks});
        that.$el.html(clicksView.render(title).el);
      }});
    });
  },

  getTitle: function(code, cb) {
    $.get( "/title"+code, function( title ) {
      cb(title);
    });
  }
});