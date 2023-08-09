<template>
  <div>
    <b-btn variant="" id="btn-open-chat" @click="changeChatRoomStatus">Chat</b-btn>

    <div v-if="chatRoomStatus" class="chat-popup">
      <b-form class="form-container">
        <h1>Chat</h1>

        <h5><b>Message</b></h5>
        <b-textarea placeholder="Type message.." name="msg" required></b-textarea>

        <b-btn variant="success" class="btn">Send</b-btn>
        <b-btn variant="danger" class="btn cancel" @click="changeChatRoomStatus"> Close</b-btn>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      chatRoomStatus: false,
    };
  },
  methods: {
    changeChatRoomStatus() {
      this.chatRoomStatus = !this.chatRoomStatus;
    },
  },
};
</script>

<style scoped>

#btn-open-chat{
  cursor: pointer;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;

}

/* The popup chat - hidden by default */
.chat-popup {
  /* display: inline; */
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9; /*bring to front */
}

/* Add styles to the form container */
.form-container {
  width: 300px; /* use max-width property only will get tiny window */
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width textarea */
.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 200px;
}

/* When the textarea gets focus, do something */
.form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/send button */
.form-container .btn {
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

</style>