Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  events: {
    'change .filterLinks': 'sortBy'
  },

  initialize: function(){
    // this.collection.on('sync', this.addAll, this);
    this.collection.on('change, sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    this.$el.append('<label>Filter by: </label>\
                      <form class="filterLinks">\
                      <input type="radio" name="sortBy" value="visits" checked>Visits</input>\
                      <input type="radio" name="sortBy" value="created_at">Time</input>\
                      </form>\
                      <div class="linksDisplay"></div>');
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    this.$el.find('.linksDisplay').append(view.render().el);
  },

  sortBy: function(){
    var comparator = $('input[name=sortBy]:checked', '.filterLinks').val();
    this.collection.setComparator(comparator);
    this.collection.sort();

    this.$el.find('.linksDisplay').html('');
    this.addAll();
  }

});