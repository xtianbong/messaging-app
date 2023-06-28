<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use GuzzleHttp\Psr7\Header;
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
use Carbon\Carbon;

class RoomController extends Controller
{
    public function index(Request $request, $room_id)
    {
        //verify room_id
        $currentUser = $request->user();
        if(!in_array($room_id, json_decode(($currentUser->rooms)))){

        }

        $currentUser = $request->user();

        //left side
        //get rooms the user is in
        /*
        $allRooms = Room::with('user')->get();

        $rooms=[];
        foreach($roomsArr as $r){
            array_push($rooms,Room::where('id',$r)->first());
        }
        $rooms=json_encode($rooms);
        */
        $roomsArr = json_decode($currentUser -> rooms);//get array of room ids that this user is in
        $rooms = $this->fetchRooms($currentUser);
        $rooms = json_encode($rooms);
        $friendsArray = json_decode($currentUser -> friends);

        $friends = User::whereIn("id",$friendsArray) ->get();


        //right side
        //if the user is not in any rooms, they are directed to room 0 which is just a prompt to create a new room
        if(count($roomsArr)==0){
            $currentRoom=0;
        }
        else{
            $currentRoom = Room::where('id',$room_id)->first();
        }


        $roomUsers = User::whereIn("id",json_decode($currentRoom->user_ids))->get();
        $roomOwners = User::whereIn("id",json_decode($currentRoom->owner_ids))->get();
        //dd($roomOwners);


        return view('room', compact('currentRoom', 'currentUser','rooms', 'room_id','friends','roomUsers','roomOwners'));
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
    public function fetchMessagesR(Request $request)
    {
        $room_id = $request->input('room_id');
        $messages = Message::where('room_id', $room_id)->with('user')->get();
        return $messages;
    }
    public function sendMessage(Request $request)
    {
        if((int) $request->input('room_id')!=0){
            $user = $request->user();
            $roomId = (int) $request->input('room_id'); // assign the room_id from the request
            $message = new Message();
            $message->message = $request->input('message');
            //$message->message = "Test";
            $message->user_id = $user->id;
            $message->room_id = $roomId;
            $message->save();

            broadcast(new MessageSent($user, $message))->toOthers();

            //update the room's data with the new message
            $room = Room::where("id",$roomId)->first();
            $messagesArr = json_decode($room->message_ids);
            array_push($messagesArr,$message->id);
            $room->message_ids = json_encode($messagesArr);
            $room->updated_at = Carbon::now();
            $room->save();

            return ['status' => 'Message Sent!'];
        }
        else{ //do not send messages if the user is in the landing room
            return ['status' => 'Message was not sent, room not specified.'];
        }
    }

    //get rooms this user is a part of
    public function fetchRooms($user){
        $roomIds = json_decode($user->rooms);
        $rooms = [];
        foreach($roomIds as $id){
            $room = Room::where("id", $id)->first();
            if ($room) {
                array_push($rooms, $room);
            }
        }
        //dd($rooms);
        //sort rooms so that the most recently updated ones appear first
        usort($rooms, function ($a, $b) {
            if($a!=null and $b!=null){
                return $b->updated_at <=> $a->updated_at;
            }

        });
        //dd($rooms);
        return $rooms;
    }

    //create new room
    public function createRoom(Request $request){
        //get room info from the post request
        $currentUserId = $request->input('currentUserId');
        $name = $request->input('name');
        $users = $request->input('users');//json_decode($request->input('users'), true);
        $owners = $request->input('owners');//json_decode($request->input('owners'), true);

        //remove duplicates from user list and owner list
        $users = array_values(array_unique($users));//array_values reindexes the array automatically to ensure that the resulting json does not include numeric keys
        $owners = array_values(array_unique($owners));

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

        //make sure every User->rooms array is free of duplicates
        $allUsers = User::get();

        forEach($allUsers as $u){
            $aRooms = json_decode($u->rooms,false);

            $aRooms = array_unique($aRooms);
            //renumber the keys of the array elements so that the json_encode ommits the keys when it returns the string
            $aRooms = array_merge($aRooms,array());
            $u->rooms = json_encode($aRooms);

            $u->update();
        }

        return $room;
    }

    public function editRoom(Request $request){
        $roomId = $request->input("roomId");
        $roomName = $request->input("roomName");
        $newUsers = $request ->input("users");
        $newOwners = $request ->input("owners");

        //get room from database
        $room = Room::where('id',$roomId)->first();

        //save old user and owners list
        $oldUsers = json_decode($room -> user_ids);
        $oldOwners = json_decode($room -> owner_ids);

        //make changes to room
        $users = $newUsers;
        $owners = $newOwners;

        //remove duplicates from user list and owner list
        $users = array_unique($users);
        $owners = array_unique($owners);

        //save changes
        $room->user_ids = json_encode($users);
        $room->owner_ids = json_encode($owners);

        if($roomName!=""){
            $room->name = $roomName;
        }
        $room->save();

        //add room to the User->rooms array of every user that was added to the room
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

        //make sure every User->rooms array is free of duplicates
        $allUsers = User::get();

        forEach($allUsers as $u){
            $aRooms = json_decode($u->rooms,false);

            $aRooms = array_unique($aRooms);
            //renumber the keys of the array elements so that the json_encode ommits the keys when it returns the string
            $aRooms = array_merge($aRooms,array());
            $u->rooms = json_encode($aRooms);

            $u->update();
        }


        //remove this room from the User->rooms array of every user that was removed from a room
        forEach($oldUsers as $uid){
            if(!in_array($uid,$users)){
                $user = User::where('id',$uid)->first();
                $rooms = $user->rooms;
                $aRooms = json_decode($rooms,true); // Decode as associative array
                $i=array_search($roomId,$aRooms);
                if ($i !== false) {
                    unset($aRooms[$i]);
                    $aRooms = array_values($aRooms); // Reindex the array numerically
                    $uRooms = json_encode($aRooms);
                    User::where('id', $uid)->update(['rooms' => $uRooms]);
                }
            }
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

    public function logOut(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        //header("Location: login.html");
        return redirect('/login');
    }

    public function emailQuery(Request $request){
        $email = $request->input('email');
        $user = User::where('email',$email)->first();
        if($user==null){
            return "Not found";
        }
        return json_encode($user);
    }

    public function editUser(Request $request){
        $userId= $request->input('currentUserId');
        $username = $request->input('username');
        $friends = $request->input('friends');
        //get user from id
        $user = User::where('id',$userId)->first();

        //change user attributes
        if($username!=""){
            $user->name=$username;
        }

        if($friends!=null){
            $user->friends = json_encode($friends);
        }

        //save user
        $user->save();
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
