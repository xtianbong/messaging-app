<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show chats
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('chat');
    }

    /**
     * Fetch all messages
     *
     * @return Message
     */
    public function fetchMessages()
    {
        return Message::with('user')->get();
    }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $room_id = $request->input('room_id');//room id

        $message = $user->messages()->create([
            'message' => $request->input('message'),
            //'room_id' => $room_id
        ]);

        // Associate the message with the room
        //$room = Room::find($room_id);
        //$room->messages()->attach($message->id);

        // Update the room's messages column. EDIT: not necessary actually
        /*
        $room->messages = $room->messages . ',' . $message->id;
        $room->save();
        */
        broadcast(new MessageSent($user, $message))->toOthers();

        return ['status' => 'Message Sent!'];
    }
}
