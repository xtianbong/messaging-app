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
    //original before rooms
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
        //dd($user);
        // $message = $user->messages()->create([
        //     'message' => $request->input('message'),
        //     'room_id' => $request->input('room_id')
        // ]);

        $message = new Message();
        $message->message = $request->input('message');
        //$message->message = "Test";
        $message->user_id = $user->id;
        $message->room_id = (int) $request->input('room_id'); // assign the room_id from the request
        $message->save();

        broadcast(new MessageSent($user, $message))->toOthers();

        return ['status' => 'Message Sent!'];
    }
}
