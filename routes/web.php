<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/chat', [App\Http\Controllers\ChatsController::class, 'index']);
Route::get('/messages', [App\Http\Controllers\ChatsController::class, 'fetchMessages']);
//Route::post('/messages', [App\Http\Controllers\ChatsController::class, 'sendMessage']);
Route::get('/messages/{room_id}', [App\Http\Controllers\RoomController::class, 'fetchMessages']);
Route::post('/messages', [App\Http\Controllers\RoomController::class, 'sendMessage']);


//Jules' additions so we have different chat rooms

use App\Http\Controllers\RoomController;
Route::get('/room/{room_id}', [App\Http\Controllers\RoomController::class, 'index'])->name('room');
Route::get('/room/{room_id}/i', [App\Http\Controllers\RoomController::class, 'index2']);//for testing
Route::post('/room/{room_id}/j', [App\Http\Controllers\RoomController::class, 'fetchMessages']);//so can see the messages in json for troubleshooting
Route::post('/room/{room_id}/r', [App\Http\Controllers\RoomController::class, 'fetchMessagesR']);//let's the webpage check for new messages using js
Route::post('/room/create-room', [App\Http\Controllers\RoomController::class, 'createRoom']);//user can create new rooms
Route::post('/room/edit-room', [App\Http\Controllers\RoomController::class, 'editRoom']);//user can edit the current room
Route::post('/room/add-friend', [App\Http\Controllers\RoomController::class, 'addFriend']);//user can add friends
Route::post('/room/log-out', [App\Http\Controllers\RoomController::class, 'logOut']);//user can logout
Route::post('/room/email-query',[App\Http\Controllers\RoomController::class, 'emailQuery']);//user can get a user from their email
Route::post('/room/edit-user',[App\Http\Controllers\RoomController::class, 'editUser']);//user can change their user details and remove friends
Route::post('/room/user-from-id',[App\Http\Controllers\RoomController::class, 'userFromId']);//allows me to easily get a username from their id
//Route::get('/room/{room_id}', [RoomController::class, 'fetchMessages'])->middleware('auth');


//Route::get('/rooms/{room_id}/messages', 'RoomController@getMessages');//added for rooms to work -Jules
