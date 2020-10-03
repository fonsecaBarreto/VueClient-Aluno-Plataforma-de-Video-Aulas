<template>
  <div class="right-ov">
    <div class="d-flex flex-column" >
      <slot></slot>

  
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .right-ov{
    padding: 6px 10px;
    background-color: rgba(46, 46, 46, 0.9);
    position: absolute; right: 0; top:-14px;
    width: fit-content;
    transform: translateY(-100%);
    border-radius: 6px;
    color: white;
    z-index: 6;
  }
  .right-ov span{
    font-size: .7em;
    line-height: 1em;
    color: #bbb;
    position: relative;
    padding: 2px 0 6px;
  }
  .right-ov span::after{
    content: "";
    position: absolute;
    left: -10px;bottom: 0;
    font-size: .8em;
    color: #999;
    width: calc(100% + 20px);
    height: 1px;
    background-color: #555;
  }
</style>