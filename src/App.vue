<template>
  <div id="app">
    <PopUpChatRoom :window-mode="windowMode" />
    <FloatingChatButton @click="windowMode= !windowMode" />
    {{ windowMode }}
  </div>
</template>

<script>
import PopUpChatRoom from './components/PopUpChatRoom.vue';
import FloatingChatButton from './components/FloatingChatButton.vue';

export default {
  components: {
    PopUpChatRoom,
    FloatingChatButton

  },

  data(){
    return{
      windowMode: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>