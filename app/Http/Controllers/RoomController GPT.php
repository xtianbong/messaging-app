<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class RoomController extends Controller
{
    public function index($room_id)
    {
        $messages = Message::where('room_id', $room_id)->get();
        return view('room', compact('messages', 'room_id'));
    }

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function fetchMessages($room_id)
    {
        $messages = Message::where('room_id', $room_id)->get();
        return view('room', [
            'roomId' => $room_id,
            'messages' => $messages->toArray(),
            'user' => Auth::user(),
        ]);
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

