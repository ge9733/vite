<template>
  <div class="header">
    <div class="header_left">
      <el-icon :size="20" color="black"><ArrowLeft /></el-icon>
      <button>back</button>
    </div>

    <div class="header_right">search:<input type="text" name="" value="" /></div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>
<style scoped lang="less">
.header {
  position: relative;
  height: @TopHeight;
  width: 100%;
  background-color: aqua;

  display: flex;
  justify-content: space-between;
  align-items: center;
  &_left {
    display: flex;
  }
}
</style>
