<template>
  <button class="button-a" :style="{height:h}"
    :class="{primary,success,danger,round,project,w100,loading}">
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props:{
    loading:Boolean,
    primary:Boolean,
    success:Boolean,
    danger:Boolean,
    project:Boolean,
    round:Boolean,
    w100:Boolean,
    h:{type:String,default:"fit-content"}
  }
}
</script>

<style scoped>
 
  .button-a{
    background: #29234b;
    border-radius: 2px;
    padding: 6px 18px;
    border: none;
    color: white;
    text-shadow: 0px 0px 8px #0003;
    box-shadow: 0px 0px 6px #0002;
    border-radius: 5px;
      -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .w100{ width: 100% !important;}
  .round{border-radius: 64px!important;}

  .button-a.primary{background: rgb(30, 121, 207);}
    .button-a.primary:hover{background: rgb(20, 107, 189);}

  .button-a.danger{background: rgb(161, 24, 15);}
    .button-a.danger:hover{background: rgb(131, 18, 10);}
  .button-a.success{background: rgb(29, 160, 79);}
    .button-a.success:hover{background: rgb(19, 121, 58);}
  .project{
   background: #29234b;
  }

  .button-a.project:active{ background: rgb(23, 54, 121); }
  .button-a.project:active{ background: rgb(24, 59, 134); }
  .loading{
    color: #00000000;
    background-color: rgb(25,61,137);
    background-image: url("../../assets/loading.svg");
    background-size: 64px;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>