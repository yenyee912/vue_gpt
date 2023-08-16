<template>
  <!-- :style="{ [chatPosition]: 0 }" -->
  <div>

    <!-- <b-btn variant="success" class="btn-open-chat" @click="windowMode=!windowMode">Chat</b-btn> -->

    <div v-show="windowMode" class="chat-popup">
      <div>
          <!-- {{ fullMesagesList }} -->
          <div v-for="(msgObj, index) in fullMesagesList" :key="index">
            <div class="mb-2 chat-bubble" :class="[msgObj.isMine? 'user-bubble': 'bot-bubble']">
              <b-row>
              <b-col cols="2"><img v-if="msgObj.avatarLinkField" :src="msgObj.avatarLinkField" class="avatar" />
              <!-- use html to create a logo  -->
              <!-- <span class="no-image" v-if="!msgObj.avatarLinkField">
                {{ msgObj.senderNameField ? msgObj.senderNameField.charAt(0).toUpperCase() : '?' }}
              </span> -->
              </b-col>

              <b-col cols="10" class="messages_list__item___message">
              <span>{{ msgObj.senderNameField }}</span>

              <span>{{ msgObj.textField }}</span>
              
              </b-col>

              </b-row>

            </div>
          </div>
        </div>
      <div class="mt-4">
        <b-textarea v-model="newMessageText" placeholder="Use 'Shift + Enter' to send"
          v-on:keyup.enter.shift="sendMessage"></b-textarea>
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
      newMessageText: "What is the price of bitcoin?", // text which not yet send
      fullMesagesList: [
        { "isMine": true, 
        "textField": "the average price of BTCUSDT is 29410.59122796sasasassassasasasasass?\n", 
        "senderNameField": "me", 
        "avatarLinkField": "src/assets/logo.svg" }, 
        
        { "isMine": false, 
        "textField": "the average price of BTCUSDT is 29410.59122796 ", 
        "senderNameField": "ai", 
        "avatarLinkField": "src/assets/user.jpeg" },
              {
          "isMine": true,
          "textField": "What is the price of bitcoin?\n",
          "senderNameField": "me",
          "avatarLinkField": "src/assets/logo.svg"
        },

        {
          "isMine": false,
          "textField": "the average price of BTCUSDT is 29410.59122796 ",
          "senderNameField": "ai",
          "avatarLinkField": "src/assets/user.jpeg"
        }],


      chatPosition: 'right',
      messages: [],

      userAvatar: "src/assets/user.jpeg",
      botAvatar: "src/assets/logo.svg",
      userName: "John Doe",

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

      // this.formatResponse(msg.textField);
    },

    async formatResponse(prompt){
      const res  = Object.assign({}, {
        isMine: false,
        textField: "",
        senderNameField: "Bot",
        avatarLinkField: this.botAvatar
      });

      const x = await axios.post("http://localhost:5050/ask", { prompt: prompt });

      
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
.btn-open-chat{
  cursor: pointer;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

/* .chat-popup{
  width: 80%;
  max-width: 80%;
  align-self: auto;
  margin: auto;
} */

.chat-popup{
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 9;
  /* border: solid 2px; */
}

/* tested, applicable to both user and bot */
.chat-popup .chat-bubble{
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
.chat-popup .avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: solid 2px;
  -o-object-fit: cover;
  object-fit: cover;
}

.chat-popup .user-bubble{
  background-color: #f3f3f3;
  color: black;
}

.chat-popup .bot-bubble{
  background-color: #6f42c1;
  color: white;
}

/* tested, all same position when turn off message component */
.chat-popup .txt-username{
  display: block;
  font-weight: bold;
  font-size: 12px;
  width: 100%;
  text-align: left;
  margin-right: 20px;
  padding-right: 10px;
  margin-bottom: 2px;
  padding-bottom: 5px;
  letter-spacing: 0.6px;
  text-transform: capitalize;
  /* position: relative; */
  /* border: solid 2px; */
}


.chat-popup .txt-message{
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

.chat-popup .messages_list__item___message {
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