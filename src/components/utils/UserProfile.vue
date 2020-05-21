<template>
   <img  class="profile-avatar" :src="oUsuario.picture" alt="">
</template>

<script>
const USER ={
  picture:require('../../assets/nouser.png')
}
export default {
  props:{user:Object},
  computed:{
      oUsuario(){
        var usuario = {...USER}
        if(this.user != null){
          usuario.picture = this.user.picture ? this.user.picture.sm : USER.picture
        }
        return usuario
      }
  }
}
</script>

<style scoped>
.profile-avatar{
    height: 38px;
    width: 38px;
    background-color: white;
    margin:auto auto auto 0;
    border-radius: 50%;
    box-shadow: 0px 2px 2px #0004;
  }
</style>