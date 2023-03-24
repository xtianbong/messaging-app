// resources/assets/js/components/ChatMessages.vue

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
  props: ["messages", "roomId"],
  computed: {
    fetchMessages() {
        axios.get(`/api/rooms/${this.roomId}/messages`)
            .then(response => {
            this.messages = response.data;
            })
            .catch(error => {
            console.log(error);
            });
    },
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      axios.get(`/api/messages?room_id=${this.roomId}`).then((response) => {
        this.messages = response.data;
      });
    },
  },
};
</script>
