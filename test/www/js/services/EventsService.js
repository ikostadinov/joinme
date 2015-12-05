app.factory('EventsService', function($http){
   
 // var events = [{
 //    id: 0,
 //    title: 'Football',
 //    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
 //    distance: '3',
 //    image: 'http://placehold.it/100x100'
 //  },{
  //   id: 1,
  //   title: 'Beerpong',
  //   description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
  //   distance: '0.6',
  //   image: 'http://placehold.it/100x100'
  // }];

// var events = [];


return {
    getAllEvents: function(){
     return $http.get('http://djangounchained-dechochernev.c9users.io/api/v1/events/');
    },
    // function(){
    //    $http.get('http://djangounchained-dechochernev.c9users.io/api/v1/events/')
    //     .success(function(data) {
    //       return data;
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });
    // },
    // function(success){
    //   $http({method: 'GET', url: 'http://djangounchained-dechochernev.c9users.io/api/v1/events/'})
    //   .success(function(data, status, headers, config){
    //     success(data);
    //     events = data;
    //   })
    //   .error(function(data, status, headers, config){
    //     $log.warn(data);
    //   })
    // },

  // return {
  //   all: function(){
  //     return events;
  //   },
    get: function(eventId, events){
      for (var i = 0; i < events.length; i++) {
         if(events[i].uuid === eventId){
          console.log(events[i]);
          return events[i];
         }
        }
        return null;
      }
  };
});