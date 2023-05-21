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
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Contracts\Queue\OnQueue;

class RoomController extends Controller
{
    public function index(Request $request, $room_id)
    {


        $currentUser = $request->user();

        //left side
        //get rooms the user is in
        $allRooms = Room::with('user')->get();
        $roomsArr = json_decode($currentUser -> rooms);//get array of room ids that this user is in
        $rooms=[];
        foreach($roomsArr as $r){
            array_push($rooms,Room::where('id',$r)->first());
        }
        $rooms=json_encode($rooms);
        //dd($rooms);
        $friends = User::with('messages')->get();
        //right side
        //if the user is not in any rooms, they are directed to room 0 which is just a prompt to create a new room
        if(count($roomsArr)==0){
            $currentRoom=0;
        }
        else{
            $currentRoom = Room::where('id',$room_id)->first();
        }
        //dd($currentRoom);
        //$filteredMessages = Message::where('room_id', $room_id)->with('user')->get();
        //dd($filteredMessages);



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
        return view('room', compact('currentRoom', 'currentUser','rooms', 'room_id','friends'));
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
        $messages = Message::where('room_id', $room_id)->with('user')->get();
        return $messages;
    }
    public function sendMessage(Request $request)
    {
        if((int) $request->input('room_id')!=0){
            $user = $request->user();
            $message = new Message();
            $message->message = $request->input('message');
            //$message->message = "Test";
            $message->user_id = $user->id;
            $message->room_id = (int) $request->input('room_id'); // assign the room_id from the request
            $message->save();


            broadcast(new MessageSent($user, $message))->toOthers();

            return ['status' => 'Message Sent!'];
        }
        else{ //do not send messages if the user is in the landing room
            return ['status' => 'Message was not sent, room not specified.'];
        }
    }

    //create new room
    public function createRoom(Request $request){
        //get room info from the post request
        $currentUserId = $request->input('currentUserId');
        $name = $request->input('name');
        $users = $request->input('users');//json_decode($request->input('users'), true);
        $owners = $request->input('owners');//json_decode($request->input('owners'), true);

        //remove duplicates from user list and owner list
        $users = array_unique($users);
        $owners = array_unique($owners);

        //save that room to the database
        $room = new Room();
        $room -> name = $name;
        $room->user_ids = json_encode($users);
        $room->owner_ids = json_encode($owners);
        $room->message_ids = json_encode([]);

        $room->save();

        //add room to the rooms array of every user involved

        forEach($users as $uid){
            $user = User::where('id',$uid)->first();
            $rooms = $user->rooms;
            //update rooms with the one we just created
            $aRooms = json_decode($rooms);
            $uRooms = "";
            array_push($aRooms,$room->id);
            $uRooms = json_encode($aRooms);
            User::where('id',$uid)->update(['rooms'=>$uRooms]);
        };
        return $room;
    }

    public function addFriend(Request $request){
        //get current user id from js
        $currentUserId = $request->input('currentUserId');
        $currentUser = User::where('id',$currentUserId)->first();
        $friends = json_decode($currentUser->friends);

        //get email from js
        $email=$request->input('email');
        $newFriend = User::where('email',$email)->first();
        $newFriendId = $newFriend -> id;

        //add new friend to list of friends
        array_push($friends,$newFriendId);

        //make sure there are no duplicates in the friends list
        $friends = array_unique($friends);

        $currentUser->friends =  json_encode($friends);
        $currentUser->save();
        //dd($currentUser);
        return ['status' => 'Friend Added'];
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

