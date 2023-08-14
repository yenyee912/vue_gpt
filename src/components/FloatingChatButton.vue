<template>
  <div>
    <div id="main-wrapper">
      <div id="floating-snap-btn-wrapper">
        <!-- BEGIN :: Floating Button -->
        <div class="fab-btn">
          <b-icon icon="chat-dots"></b-icon>
        </div>
        <!-- END :: Floating Button -->
      </div>
    </div>


  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* #main-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #E1E8FD;
  overflow: hidden;
} */

#floating-snap-btn-wrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.fab-btn {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #6B26BB;
  color: white;
  z-index: 1000;
  box-shadow: 0px 2px 17px -1px rgba(0, 0, 0, 0.3);
}

</style>