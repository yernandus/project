angular.module('starter.services')
  .constant('serviceUrls',
  {
    api_url: 'http://lifehacks.kz/index.php/api/',
    signup : 'user_controller/user',
    login : 'user_controller/userlogin',
    life_hacks : 'lifehack_controller/lifehacks/user_id/2',
    category_list : 'category_controller/categories',
    profile_details : 'user_controller/user/id/2',
    json_cb: '?callback=JSON_CALLBACK'
  });