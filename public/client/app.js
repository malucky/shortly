window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.renderIndexView(); // default view

    Backbone.history.start({pushState: true});
    this.router = new Shortly.Router();
    this.router.on('renderIndex', this.renderIndexView, this);
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    console.log('rendering index');
    e && e.preventDefault();
    var links = new Shortly.Links();
    this.linksView = new Shortly.LinksView( {collection: links} );
    this.linksView.collection.on('renderClickView', this.renderClicksView, this);
    this.$el.find('#container').html( this.linksView.render().el );
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  renderClicksView: function(base_url, code, title){
    console.log('render me!');
    var url = base_url+'/clicks/'+code;
    var clicks = new Shortly.Clicks();
    clicks.url = url;
    var that = this;
    this.router.navigate("details/"+code);
    clicks.fetch({success: function(){
      var clicksView = new Shortly.ClicksView({collection: clicks});
      that.$el.find('#container').html( clicksView.render(title).el);
    }});
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});