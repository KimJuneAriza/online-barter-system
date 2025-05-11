<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/signup', 'UsersController@userSignup');
$router->post('/signin', 'UsersController@userSignin');

$router->post('/add-item', 'AddItemController@upload');

$router->post('/profile', 'UsersController@completeProfile');

$router->post('/profile/fetch', 'UsersController@fetchProfile');

$router->get('/items', 'AddItemController@getItems');

