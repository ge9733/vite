<template>
  <div class="mv">
    <div class="list">
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
      <div class="item">111</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>
<style scoped lang="less">
.mv {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-color: aqua;
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width: 100px;
      height: 50px;
      background-color: red;
      bottom: 1px white;
      margin-right: 5px;
      margin-top: 5px;
    }
  }
}
</style>
