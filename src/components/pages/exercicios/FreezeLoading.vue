<template>
  <div class="freeze">

  </div>
</template>

<script>
export default {

}
</script>

<style>
.freeze{
  position: absolute;
  top:0;left:0;
  height: 100%;
  width: 100%;
  background-color: #fffb;
  background-image: url("../../../assets/loading.svg");
  background-position: center;
  background-size: 100px;
  background-repeat: no-repeat;
  z-index: 99999;
}
</style>