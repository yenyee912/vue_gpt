<template>
  <!-- :style="{ [chatPosition]: 0 }" -->
  <div>

    <!-- <b-btn variant="success" class="btn-open-chat" @click="windowMode=!windowMode">Chat</b-btn> -->

    <div v-show="windowMode" class="popup-chat">
      <div>
        <div class="header-chat">
          <img src="src/assets/logo.svg" class="image-avatar" /> 
          <span class="text-username"> {{ botName }}</span>

        </div>

          <!-- {{ fullMesagesList }} -->
          <div v-for="(msgObj, index) in fullMesagesList" :key="index">
            <div class="mb-2 bubble-chat" :class="[msgObj.isMine? 'bubble-user': 'bubble-bot']">
              <span>{{ msgObj.textField }}</span>
            
              <!-- </b-row> -->

            </div>
          </div>
        </div>
      <div class="mt-4">
        <!-- v-on:keyup.enter.shift="sendMessage" -->
        <b-textarea v-model="newMessageText" placeholder="Ask some questions..."></b-textarea>
        <b-btn size="sm" variant="success"  @click="sendMessage">Send</b-btn>

      </div>
    </div> <!--end of window mode-->


  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    windowMode: {
      type: Boolean,
      default: false,
    }

  },
  data() {
    return {
      newMessageText: "", // text which not yet send
      fullMesagesList: [],
      chatPosition: 'right',

      userAvatar: "src/assets/user.jpeg",
      botAvatar: "src/assets/logo.svg",
      userName: "John Doe",
      botName: "AI",

    };
  },

  computed: {
    notMineMessages() {
      return this.fullMesagesList.filter((msg) => !msg.isMine).length
    },
  },
  methods: {
    async sendMessage() {
      
      const msg = Object.assign({}, {
        isMine: true,
        textField: this.newMessageText,
        senderNameField: this.userName,
        avatarLinkField: this.userAvatar

      });
      this.fullMesagesList.push(msg);
      this.newMessageText = "";

      this.formatResponse(msg.textField);
    },

    async formatResponse(prompt){
      const res  = Object.assign({}, {
        isMine: false,
        textField: "",
        senderNameField: "Bot",
        avatarLinkField: this.botAvatar
      });

      const x = await axios.post( `${process.env.VUE_APP_GPT_API}/ask`, { prompt: prompt });

      
      if (x.data.success)
        res.textField = x.data.message;
      else
        res.textField = "error, please ask again";

        this.fullMesagesList.push(res);

    },
    scrollDownChat() {
      if (this.windowMode) {
        setTimeout(() => {
          this.scrollWrapper.scrollTop = this.scrollWrapper.scrollHeight
        }, 100)
      }
    },


  },
};
</script>

<style scoped>
/* .popup-chat{
  width: 80%;
  max-width: 80%;
  align-self: auto;
  margin: auto;
} */

.popup-chat{
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 9;
  width: 50%;
  max-width: 50%; /* flexibility: the chat window will change depends on message length */
  /* border: solid 2px; */

}

.popup-chat .header-chat{
  text-align: left;
}

/* tested, all username align at same position when turn off message component */
.text-username{
  /* display: flex; */
  font-weight: bold;
  font-size: 30px;
  width: 100%;
  text-align: left;
  margin: auto;
  /* margin-right: 20px;
  padding-right: 30px;
  margin-bottom: 2px;
  padding-bottom: 5px; */
  letter-spacing: 0.6px;
  text-transform: capitalize;
  /* position: relative; */
  /* border: solid 2px; */
}

/* tested, applicable to both user and bot */
.popup-chat .bubble-chat{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-width: 100%;
  width: 100%;
  padding: 5px 10px;
  max-width: 100%;
  border-radius: 10px;
  /* background-color: #fff; */
  -webkit-box-shadow: 0 0 20px rgba(208, 208, 208, 0.3);    
  box-shadow: 0 0 20px rgba(208, 208, 208, 0.3);
  height: 100px;
  -webkit-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
  z-index: 1;
  /* position: absolute; */
  /* bottom: 0; */
  overflow: hidden;
  /* border: solid 2px ; */

}
.popup-chat .image-avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: solid 2px;
  -o-object-fit: cover;
  object-fit: cover;

  text-align: left;
  margin: left;

}

.popup-chat .bubble-user{
  background-color: #f3f3f3;
  color: black;
}

.popup-chat .bubble-bot{
  background-color: #6f42c1;
  color: white;
}


.popup-chat .text-message{
  display: block;
  font-size: 13px;
  letter-spacing: .3px;
  white-space: pre-line;
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  border: solid 2px;
  /* position: relative; */

}

.popup-chat .messages_list__item___message {
  padding-left: 5px;
  -webkit-box-flex: 4;
  -ms-flex: 4;
  flex: 4;
  font-size: 13px;
  letter-spacing: 0.3px;
  min-height: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
}
</style>