<!-- resources/views/room.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container" id="demo"> <!-- id and onload added by jules--> <!-- Pass the roomId as the id attribute -->
    <div class="card room" id="roomId"> <!-- Pass the roomId as the id attribute -->
        <!--<div class="card-header">Chats</div>-->
        <div class="card-body ">
            <chat-messages :messages="messages" ></chat-messages> <!-- Pass the roomId as a prop -->
        </div>
        <div class="card-footer">
            <chat-form v-on:messagesent="addMessage" :user="{{ Auth::user() }}"></chat-form>
        </div>
    </div>
</div>


<!-- Include Vue.js and Axios -->
<script src="https://unpkg.com/vue@next"></script>
<script src="https://unpkg.com/axios@0.21"></script>

<!-- Load the Vue.js app -->
<script>
    const app = Vue.createApp({
        data() {
            return {
                messages: [],
            };
        },
        methods: {
            addMessage(message) {
                // Send the message to the backend using Axios
                axios.post('/message', message)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    });
            },
            fetchMessages() {
                // Fetch the messages for the current room from the backend using Axios
                axios.get('/room/{{ $room_id }}/messages')
                    .then(response => {
                        this.messages = response.data;
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    });
            },
        },
        created() {
            // Fetch the messages for the current room when the component is created
            this.fetchMessages();
        },
    });

    // Define the chat-messages component
    app.component('chat-messages', {
        props: ['roomId', 'messages'],
        template: `
            <ul class="scrollbar">
                <li class="left clearfix" v-for="message in messages" :key="message.id">
                    <div class="clearfix">
                        <div class="header">
                            <strong>
                                {{ message.user.name }}
                            </strong>
                        </div>
                        <p>
                            {{ message.message }}
                        </p>
                    </div>
                </li>
            </ul>
        `,
    });

    // Define the chat-form component
    app.component('chat-form', {
        props: ['user'],
        data() {
            return {
                message: '',
            };
        },
        methods: {
            sendMessage() {
                if (this.message.trim() === '') {
                    return;
                }
                // Emit a messagesent event with the message content and the user object
                this.$emit('messagesent', {
                    message: this.message,
                    user: this.user,
                    room_id: {{ $room_id }},
                });
                // Clear the input field
                this.message = '';
            },
        },
        template: `
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Type your message" v-model="message">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button" @click="sendMessage">Send</button>
                </div>
            </div>
        `,
    });

    app.mount('#demo');
</script>

In this example, we're using Axios to fetch the messages for the current room from the `/room/{{ $room_id

@endsection
