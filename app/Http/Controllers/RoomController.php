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
        $user = $request->user();

        //testing createRoom
        //$room = $this->createRoom($request, "Example Room", [], []);
        return view('room', compact('currentRoom','filteredMessages', 'user','rooms', 'room_id','friends'));
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
    public function createRoom(Request $request,$name, $users,$owners){
        $user = $request->user();
        array_push($users, $user);//add current user to list of users for this room

        array_push($owners, $user);//add current user to list of owners for this room

        $userIds = [];
        foreach ($users as $user) {
            $userIds[] = $user->id;
        }

        $ownerIds = [];
        foreach ($owners as $owner) {
            $ownerIds[] = $owner->id;
        }

        $room = new Room();
        $room -> name = $name;
        $room ->user_ids = $userIds;
        $room -> owner_ids = $ownerIds;

        $room->save();
        return $room;
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

