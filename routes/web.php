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
Route::get('/room/{room_id}/j', [App\Http\Controllers\RoomController::class, 'fetchMessages']);//so can see the messages in json for troubleshooting
Route::post('/room/create-room', [App\Http\Controllers\RoomController::class, 'createRoom']);//user can create new rooms
//Route::get('/room/{room_id}', [RoomController::class, 'fetchMessages'])->middleware('auth');


//Route::get('/rooms/{room_id}/messages', 'RoomController@getMessages');//added for rooms to work -Jules
