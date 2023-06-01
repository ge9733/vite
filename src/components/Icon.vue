<template>

<div>
    <i class="iconfont" :class="props.name" :style="{fontSize:size+'px'}"></i></div>



</template>
<script setup lang='ts'>
import {ref,reactive,defineProps, toRef} from 'vue'
const props=defineProps({
    name:String,
    size:{
        type:String,
        default:'25'
    }
})

let size = ref(props.size)

</script>
<style scoped lang="less">


</style>