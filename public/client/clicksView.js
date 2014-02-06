Shortly.ClicksView = Backbone.View.extend({

  className: 'clicks',

  events: {
  },

  initialize: function(){
    // this.collection.on('change, sync', this.addAll, this);
    // this.collection.fetch();
  },

  render: function(title) {
    var timeHash = this.createTimeIntervals(this.collection.pluck('created_at'));

    this.$el.empty();
    this.$el.append("<h2>"+title+"</h2>")

    for(var timestamp in timeHash) {
      this.$el.append('<ol class="timestamp">'+timestamp+'</ol>');
      for(var i = 0; i < timeHash[timestamp].length; i++) {
        this.$el.find('ol').last().append('<li>'+timeHash[timestamp][i]+'</li>');
      }
    }

    return this;
  },

  createTimeIntervals: function(timestamps){
    if(timestamps.length === 0) return;

    var fiveMin = 5*60*1000;
    var endTime = new Date(timestamps[timestamps.length-1]);
    var startTime = new Date(endTime - fiveMin);
    var timeHash = {};
    timeHash[startTime+'  -  '+endTime] = [endTime];

    for (var i = timestamps.length - 2; i >= 0; i--) {
      var timestamp = new Date(timestamps[i]);
      if (timestamp < startTime) {
        endTime = timestamp;
        startTime = new Date(endTime - fiveMin);
        timeHash[startTime+'  -  '+endTime] = [timestamp];
      } else {
        timeHash[startTime+'  -  '+endTime].push(timestamp);
      }
    }

    return timeHash;
  },

  addAll: function(filteredLinks){
  },

  addOne: function(item){
  },

  sortBy: function(){
  }

});