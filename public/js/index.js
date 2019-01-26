// var socket= io();
// socket.on('connect', function (){
//   console.log('connected to server');
//
//
// });
// socket.on('disconnect',function (){
//   console.log('Disconnected from server');
// });
// socket.on('newMessage', function(message){
//   console.log('New message',message);
// });
var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime= moment(message.createdAt).format('h:mm a');
  var template= jQuery('#message-template').html();
  var html=Mustache.render(template,{
    from: message.from,
    createdAt: formattedTime,
    text: message.text
  });

  jQuery('#messages').append(html);
});
socket.on('newLocationMessage', function(locationmessage){
    var formatTime= moment(locationmessage.createdAt).format('h:mm a');


var template= jQuery('#location-message-template').html();
var html= Mustache.render(template,{
  from: locationmessage.from,
  createdAt: formatTime,
  url:locationmessage.url
});

    jQuery('#messages').append(html);
});
socket.emit('createMessage', {
  from: 'Frank',
  text: 'hey ross'
}, function(data){
  console.log('got it', data);
});
var messageTextBox= jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('');

  });
});
var llocation= jQuery('#send-location');
llocation.on('click', function(){
  if(!navigator.geolocation)
  {
  return  alert('geolocation not supported by your browser');
  }
  llocation.attr('disabled','disabled').text('Sending Location... ');
  navigator.geolocation.getCurrentPosition(function (position){
    llocation.removeAttr('disabled').text('Send Location');
     socket.emit('createLocationMessage', {latitude: position.coords.latitude,
longitude: position.coords.longitude
     }
     );

  }, function (){
      llocation.removeAttr('disabled').text('Send Location');
    alert('unable to fetch location');
  });
});
