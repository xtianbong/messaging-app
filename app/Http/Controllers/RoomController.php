<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Arr;


class RoomController extends Controller
{
    public function index(Request $request, $room_id)
    {
        //left side
        $rooms = Room::with('user')->get();
        $friends = User::with('messages')->get();
        //right side
        $currentRoom = Room::where('id',$room_id)->first();
        $filteredMessages = Message::where('room_id', $room_id)->with('user')->get();
        $currentUser = $request->user();

        //testing createRoom
        $users = [];
        $owners = [];
        //$exRoom = $this->createRoom($currentUser->id, "Example Room", $users, $owners);

        //testing addFriend
        $friendIdString="[1,2,3]";
        $currentUserId= $currentUser->id;
        //$this->addFriend($request,$currentUserId,$friendIdString);

        //testing logout
        //$this->logout($request);
        return view('room', compact('currentRoom','filteredMessages', 'currentUser','rooms', 'room_id','friends'));
    }

    public function left(Request $request)
    {
        $rooms = Room::with('user')->get();
    }

    public function __construct()
    {
        $this->middleware('auth');
    }



    public function fetchMessages($room_id)
    {
        $messages = Message::where('room_id', $room_id)->get();
        Log::debug('test log');
        Log::debug($messages);
        return $messages;
    }
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        // $message = $user->messages()->create([
        //     'message' => $request->input('message'),
        //     'room_id' => $request->input('room_id')
        // ]);

        $message = new Message();
        $message->message = $request->input('message');
        $message->user_id = $user->id;
        $message->room_id = (int) $request->input('room_id'); // assign the room_id from the request
        $message->save();

        broadcast(new MessageSent($user, $message))->toOthers();

        return ['status' => 'Message Sent!'];
    }

    //create new room
    public function createRoom($currentUserId, $name, $users, $owners){

        $userIds = [];
        $ownerIds = [];

        /*
        $usersArr = json_decode($_POST['users']);
        $ownersArr = json_decode($_POST['owner']);
        */

        $usersArr = json_decode($users);
        $ownersArr = json_decode($owners);

        array_push($userIds,$currentUserId);
        array_push($ownerIds,$currentUserId);// automatically put current user in both user and owner list

        foreach($usersArr as $u){
            array_push($userIds,$u);
        }

        foreach($ownersArr as $u){
            array_push($ownerIds,$u);
        }

        $room = new Room();
        $room -> name = $name;
        $room->user_ids = json_encode($userIds);
        $room->owner_ids = json_encode($ownerIds);
        $room->message_ids = json_encode([]);

        $room->save();
        return $room;
    }

    public function addFriend(Request $request,$currentUserId, $friendIdString){
        $currentUser = User::where('id',$currentUserId)->first();
        //dd($currentUser);
        $friends = json_decode($currentUser->friends);
        $newFriends = json_decode($friendIdString);

        //add new friends to list of old friends
        forEach($newFriends as $n){
            array_push($friends,$n);
        }
        $currentUser->friends =  json_encode($friends);
        $currentUser->save();
        //dd($currentUser);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }

    public function index2(Request $request, $room_id)//for testing
    {
        $messages = Message::where('room_id', $room_id)->with('user')->get();
        $user = $request->user();

        // Log the messages to the console
        Log::debug('test log');
        Log::debug($messages);

        $filteredMessages = $messages->filter(function ($message) use ($room_id) {
            return $message->room_id == $room_id;
        });
        //dd($filteredMessages);
        return view('room', compact('filteredMessages', 'user', 'room_id'));
    }
}

