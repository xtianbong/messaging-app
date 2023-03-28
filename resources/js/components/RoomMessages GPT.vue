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
    props: {
        roomId: {
            type: Number,
            required: true,
        },
        messages: {
            type: Array,
            required: true,
        },
        currentUser: {
            type: Object,
            required: true,
        },
    },
    computed: {
        filteredMessages() {
            return this.messages.filter((message) => message.room_id === this.roomId);
        },
    },
};
</script>
