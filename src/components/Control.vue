<template>

<div class="control" :class="{active:active}" @click="handleControl()">
<Icon name="icon-mobile-phone"></Icon>
<div class="circle one">
<Icon name="icon-shangyigeshangyiqu" size="50"></Icon>
</div>
 <div class="circle two">
<Icon name="icon-xiayigexiayiqu" size="50"></Icon>
</div>
<!-- <div class="circle three">
<Icon name="icon-geciweidianji"></Icon>
</div>
<div class="circle four">
<Icon name="icon-24gf-volumeHigh"></Icon>
</div>  -->


</div>

</template>
<script setup lang='ts'>
import Icon from './Icon.vue';
import {ref,reactive} from 'vue'
let active = ref(false)

function handleControl(){
    active.value = !active.value

}



</script>
<style scoped lang="less">
.control{
    position: absolute;
    left: 0px;
    right:0px;
    bottom:30px;
    border-radius: 50%;
    margin: 0 auto;
    box-shadow:0 0 20px rgb(255,46,99);
    background-color:white;
    z-index:20;
    width: 50px;
    height:50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active{
        box-shadow: 0 0 40px #fff;
        div{
            z-index:2;
        }
        .one{
            transform: translate(-208%,-34%) scale(1.1);
            transition-delay:0.3s;
        }
        .two{
            transform: translate(208%,-34%) scale(1.1);
            transition-delay:0.4s;

        }
    }
    .circle{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        transform: translate(0) scale(0);
        transition: all 0.25s;
        z-index: -1;
        box-sizing: border-box;
        &.one{
            transition-delay:0.3s;

        }
        &.two{
            transition-delay:0.4s;
        }

    }

}
</style>