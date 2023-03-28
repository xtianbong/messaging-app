<template>
    <ul class="scrollbar">
        <li class="left clearfix" v-for="message in filteredMessages" :key="message.id">
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
</template>


<script>
export default {
    props: ['messages', 'currentUser'],
    data() {
        return {
            roomId: 0,
        }
    },
    computed: {
        filteredMessages() {
            if (this.roomId === null) {
                return this.messages;
            }
            return this.messages.filter((message) => message.room_id === this.roomId);
        },
    },
    created() {
        this.roomId = this.$route.params;
        console.log('Room ID:', this.roomId);
    },
    // other options for the component go here
}
</script>
