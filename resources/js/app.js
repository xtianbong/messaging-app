/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

const { default: Echo } = require('laravel-echo');

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('chat-messages', require('./components/ChatMessages.vue').default);
Vue.component('chat-form', require('./components/ChatForm.vue').default);

//declare room-messages component
Vue.component('room-messages', require('./components/RoomMessages.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        messages: []
    },

    created() {
        console.log("created ran");
        this.fetchMessages();

        window.Echo.private('chat')
        .listen('MessageSent', (e) => {
            console.log("Echo heard");
            console.log('Data received on chat channel:', e);
            console.log(e);
            //if(e.room_id == this.room_id){
            if(true){
                this.messages.push({
                    message: e.message.message,
                    //message: "rtrt",
                    user: e.user
                });
            }

        });
    },

    methods: {
        fetchMessages() {
            var roomId=document.querySelector("#name-box").querySelector("h2").id;//get room id from the room title's id attribute
            console.log(document.querySelector("#name-box"));
            axios.get('/messages/'+roomId).then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            var roomId=document.querySelector("#name-box").querySelector("h2").id;//get room id from the room title's id attribute
            console.log(roomId);
            if(message.message!=""){
                this.messages.push(message);
                //this.updatedMessages.push(message);
                axios.post('/messages', {
                    message: message.message,
                    room_id: roomId
                }).then(response => {
                    console.log(response.data);
                    // Fetch updated messages after successfully sending the message
                    this.fetchMessages();
                });
            }
            else{
                console.log("Empty message");
            }
        }
    },
    mounted() {
        this.fetchMessages();
    }
});


