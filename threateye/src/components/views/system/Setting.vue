<template>
  <div id="system_setting">
    <transition name="slider">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "system_setting"
  }
</script>

<style scoped>
  .slider-enter{
    opacity: 0;
    transform: translateX(100px);
  }
  .slider-enter-active{
    transition: all .3s ease;
  }
  #system_setting{
    min-height: 900px;
  }
</style>
