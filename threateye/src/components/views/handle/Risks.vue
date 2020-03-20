<template>
 <div class="Risks">
   <transition name="slider">
     <keep-alive>
       <router-view/>
     </keep-alive>
   </transition>
 </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "Risks"
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
</style>
