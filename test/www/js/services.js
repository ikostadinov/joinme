angular.module('starter.services', [])

.factory('Events', function($http){
   
 var events = [{
    id: 0,
    title: 'Football',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
    distance: '3',
    image: 'http://placehold.it/100x100'
  },{
    id: 1,
    title: 'Beerpong',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
    distance: '0.6',
    image: 'http://placehold.it/100x100'
  }];

  return {
    all: function(){
      return events;
    },
    get: function(eventId){
      for (var i = 0; i < events.length; i++) {
         if(events[i].id === parseInt(eventId)){
          return events[i];
         }
        }
        return null;
      }
  };
});