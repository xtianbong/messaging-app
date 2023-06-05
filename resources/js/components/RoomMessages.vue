// resources/assets/js/components/RoomMessages.vue
<template>
    <div>
        <div id="left-side" onload="searchFilter()">
                <div id = "search-box">
                    <input type="text" id="rsearch-bar" class="search-bar"><!-- room search bar-->
                </div>
                <ul id="room-list" class="rooms scrollbar chats">
                    <li v-for="room in rooms" v-if="room.id!=0" :key="room.id">
                        <a :href="'../room/' + room.id">
                            <div class="chat room" id="roomdiv">
                                <img class="pfp" src="\img\pfp.png">
                                <h3 class="username">{{ room.name }}</h3>
                                <img class="alert" src="/img/alert.png">
                            </div>
                        </a>
                    </li>
                </ul>
                <div id="settings-box">
                    <img class="pfp" src="/img/pfp.png">
                    <h3 :id=currentUser.id class="current-user">{{currentUser.name}}</h3>
                    <img id="settings-button" src="/img/settings.png" alt="settings">
                    <img id="plus-button" src="/img/plus.png" alt="add chat" >
                    <!-- <button id="plus-button"  alt="add chat"> </button> -->
                    <div id="tint"></div>
                    <!--hidden divs-->
                    <div id="settings" class="overlay" style="display: none;">
                        <div id="uname-box" class="name-box">
                            <input type="text" id="uname" class ="resizing-input" :placeholder=currentUser.name maxlength="20">
                            <img src="/img/edit.png">
                        </div>
                        <button id="log-out-btn" class="overlay-btn">Logout</button>

                    </div>
                    <div id="select-new" class="overlay" style="display: none;">
                        <button id="add-room-btn" class="overlay-btn">New Room</button>
                        <button id="add-friend-btn" class="overlay-btn">Add Friend</button>
                    </div>
                    <div id="new-room" class="overlay" style="display: none;">
                        <div id="rname-box" class="name-box">
                            <input type="text" id="rname" class ="resizing-input" placeholder="New Room" maxlength="20">
                            <img src="/img/edit.png">
                        </div>
                        <input type="text" id="fsearch-bar" class="search-bar"> <!-- friend search bar-->
                        <!--list of friends-->
                        <ul id="friend-list" class="scrollbar">
                            <li class="left clearfix" v-for="friend in sortedFriends" :key="friend.id">
                                <div :id = friend.id class="friend not-selectable">
                                    <h3>{{ friend.name }}</h3>
                                    <img class="add-button" src="/img/plus.png" alt="add friend">
                                    <img class="added-button" src="/img/tick.png" alt="friend added">
                                </div>
                            </li>

                        </ul>
                        <button id="create-room-btn" class="overlay-btn">Create Room</button>
                    </div>
                    <div id="new-room-alert" class="overlay room-alert" style="display: none;">
                        <img class="confirm-tick" src="/img/tick.png" alt="tick to siginify that the room  has been created">
                        <h1>New room created</h1>
                    </div>
                    <div id="add-friend" class="overlay" style="display: none;">
                        <input type="text" id="new-friend-email" class="email-bar" placeholder="E-mail">
                        <button id="confirm-new-friend" class="overlay-btn">Add Friend</button>
                    </div>
                    <div id="add-friend-alert" class="overlay room-alert" style="display: none;">
                        <img class="confirm-tick" src="/img/tick.png" alt="tick to siginify that the friend has been added">
                        <h1>New friend addded</h1>
                    </div>
                </div><!--settings-box-->
            </div><!--left side-->
        <div id="right-side">
            <div id="name-box" >
                <h2 :id=currentRoom.id v-if="currentRoom.id != 0">{{currentRoom.name}}</h2>
                <img id="edit-room-btn" src="/img/options.png" >
                <div id="edit-room" class="overlay" style="display: none;">
                    <div id="rname-box" class="name-box">
                        <input type="text" id="rname" class ="resizing-input" :placeholder="currentRoom.name" maxlength="20">
                        <img src="/img/edit.png">
                    </div>
                    <input type="text" id="fsearch-bar" class="search-bar"> <!-- friend search bar-->
                    <!--list of friends-->
                    <ul id="friend-list" class="scrollbar">
                        <li class="left clearfix" v-for="friend in sortedFriends" :key="friend.id">
                            <div :id = friend.id class="friend not-selectable visible" :class="{ added: currentRoom.user_ids.includes(friend.id) }">
                                <h3>{{ friend.name }}</h3>
                                <!--display either the add button or the added button based on if the user is already in the room or not-->
                                <img class="add-button"  src="/img/plus.png" alt="add friend">
                                <img class="added-button"  src="/img/tick.png" alt="friend added">
                            </div>
                        </li>

                    </ul>
                    <button id="confirm-edit-btn" class="overlay-btn">Save Changes</button>
                </div>
                <div id="edit-room-alert" class="overlay room-alert" style="display: none;">
                    <img class="confirm-tick" src="/img/tick.png" alt="tick to siginify that the room  has been edited">
                    <h1>Changes saved</h1>
                </div>
            </div>
            <div :id=currentRoom.id class="room-id-carrier" style="display:none;">Find</div>
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
            <div id="landing-room" v-if="currentRoom.id == 0">
                <h1>Welcome!</h1>
                <h2>Please select a chat room on the left side of the screen or <a id="landing-new-room">create a new room.</a></h2>
            </div>
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
    friends:Array,
  },
  data() {
    return {
      // add any component-specific data here
      addedFriends: [], // new data property to track added friends
    };
  },
  computed: {
  actualFriends() {
    return this.friends.filter(friend => friend.id !== this.currentUser.id);
  },
  sortedFriends() {
    const actualFriends = this.friends.filter(friend => friend.id !== this.currentUser.id);
    return actualFriends.sort((a, b) => {
      const addedA = this.isAdded(a.id);
      const addedB = this.isAdded(b.id);
      if (addedA && !addedB) {
        return -1; // a should appear before b
      } else if (!addedA && addedB) {
        return 1; // b should appear before a
      } else {
        return 0; // maintain the original order
      }
    });
  },
    },
  methods: {
    // add any component-specific methods here
    isAdded(id) {
      return this.addedFriends.includes(id);
    },
    toggleFriend(id) {
      if (this.isAdded(id)) {
        this.addedFriends = this.addedFriends.filter(friendId => friendId !== id);
      } else {
        this.addedFriends.push(id);
      }
    },
  },
  mounted() {
    // add any code to run when the component is mounted here
    console.log(this.friends);
  },
};
</script>
