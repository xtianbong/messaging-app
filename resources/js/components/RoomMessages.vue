<template>
    <div>
        <div id="left-side" onload="searchFilter()">
                <div id = "search-box">
                    <input type="text" id="search-bar">
                </div>
                <ul id="room-list" class="rooms scrollbar chats">
                    <li v-for="room in rooms" :key="room.id">
                        <a :href="'../room/' + room.id">
                            <div class="chat room" id="roomdiv">
                                <img class="pfp" src="img\pfp.png">
                                <h3 class="username">{{ room.name }}</h3>
                                <img class="alert" src="img\alert.png">
                            </div>
                        </a>
                    </li>
                </ul>
                <div id="settings-box">
                    <img class="pfp" src="img/pfp.png">
                    <h3 id="our-user">user name</h3>
                    <img id="settings-button" src="img\settings.png">
                    <img id="plus-button" src="img\plus.png">
                </div>
            </div><!--left side-->
        <div id="right-side">
            <div id="name-box">
                <h2>{{currentRoom.name}}</h2>
            </div>
            <ul id="message-list" class="scrollbar">
            <li class="left clearfix" v-for="message in messages" :key="message.id">
                <div class="clearfix">
                <div class="header">
                    <strong>
                    {{ message.user ? message.user.name : 'Unknown' }}
                    </strong>
                </div>
                <p>
                    {{ message.message }}
                </p>
                </div>
            </li>
            </ul>
        </div><!--right side-->

    </div>
</template>

<script>
export default {
  props: {
    messages: Array,
    currentUser: Object,
    roomId: Number,
    rooms:Array,
    currentRoom:Object,
  },
  data() {
    return {
      // add any component-specific data here
    };
  },
  methods: {
    // add any component-specific methods here
  },
  mounted() {
    // add any code to run when the component is mounted here
  },
};
</script>
