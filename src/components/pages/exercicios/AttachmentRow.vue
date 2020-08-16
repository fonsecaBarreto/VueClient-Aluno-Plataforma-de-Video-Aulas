<template>
  <div class="flex-row aln-center jus-start w-100 my-1"  
  v-if="attachment != null && attachment.files[0].url != ''  && attachment.files[0].url != null">
      <a :href="attachment.files[0].url" class="anexo"> 
        <font-awesome-icon icon="paperclip"></font-awesome-icon>
        {{attachment.files[0].name}}
      </a>
  </div> 
</template>

<script>
export default {
  props:{attachment:{type:Object,default:null}}
}
</script>

<style>
  .anexo{
    font-size: .95em;
    padding: 2px 22px;
    background-color: white;
    border: solid 1px #ccc;
    border-radius: 2px;
    margin-left: 0;margin-right: auto;
  }
</style>