<template>
    <ul class="scrollbar">
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
  </template>

<script>
export default {
  props: {
    messages: Array,
    currentUser: Object,
    roomId: Number,
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
