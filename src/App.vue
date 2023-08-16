<template>
  <div id="app">
    <PopUpChatRoom :windowMode="windowMode" />
    <FloatingChatButton  @change-mode="(n)=> windowMode=n"  />
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

  methods:{
    changeMode(e){
      this.windowMode= e;
    }
  }
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