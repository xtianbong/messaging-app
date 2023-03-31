<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class RoomController extends Controller
{
    public function index(Request $request, $room_id)
    {
        $filteredMessages = Message::where('room_id', $room_id)->get();
        $user = $request->user();
        return view('room', compact('filteredMessages', 'user', 'room_id'));
    }

    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index2(Request $request, $room_id)//for testing
    {
        $messages = Message::where('room_id', $room_id)->get();
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
}

