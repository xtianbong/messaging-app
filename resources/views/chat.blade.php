<!-- resources/views/chat.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container" id="demo"> <!-- id and onload added by jules--> <!-- Pass the roomId as the id attribute -->
    <div class="card room" id="roomId"> <!-- Pass the roomId as the id attribute -->
        <!--<div class="card-header">Chats</div>-->
        <div class="card-body ">
            <chat-messages :messages="messages" ></chat-messages> <!-- Pass the roomId as a prop -->
        </div>
        <div class="card-footer" id="2">
            <chat-form v-on:messagesent="addMessage" :user="{{ Auth::user() }}" ></chat-form>
        </div>
    </div>
</div>

@endsection
