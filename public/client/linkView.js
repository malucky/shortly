Shortly.LinkView = Backbone.View.extend({

  className: 'link',

  initialize: function(){
  },

  events: {
    'click a.title': 'triggerClickViewRender'
  },

  template: _.template(' \
      <img src="/redirect_icon.png"/> \
      <div class="info"> \
        <div class="visits"><span class="count"><%= visits %></span>Visits</div> \
        <a class="title" href=""><%= title %></a> \
        <div class="original"><%= url %></div> \
        <div class="lastVisited"><% \
        if (lastclicked){ \
          var date = new Date(Number(lastclicked) * 1000) \
        } else { \
          var date = "not visited" \
        } %><%= date %></div> \
        <a href="<%= base_url %>/<%= code %>"><%= base_url %>/<%= code %></a> \
      </div>'
  ),

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    return this;
  },

  triggerClickViewRender: function(e){
    e.preventDefault();
    this.model.trigger('renderClickView', this.model.get('code'), this.model.get('title'));
  }

});