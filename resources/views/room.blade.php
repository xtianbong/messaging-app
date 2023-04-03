@extends('layouts.app')

@section('content')
<div class="container" id="demo">

    <div class="card room" :id="roomId">
        <div class="card-body">
            <room-messages :messages="{{$filteredMessages}}" :current-user="{{$user}}" :room-id="{{$room_id}}" :rooms="{{$rooms}}" :current-room="{{$currentRoom}}" :friends="{{$friends}}"></room-messages>
        </div>
        <div class="card-footer">
            <chat-form v-on:messagesent="addMessage" :user="{{ Auth::user() }}"></chat-form>
        </div>
    </div>
</div>

@endsection
