<template>
  <div id="app">
    <PopUpChatRoom />
  </div>
</template>

<script>
import PopUpChatRoom from './components/PopUpChatRoom.vue';


export default {
  components: {
    PopUpChatRoom

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