<template>
  <div class="imgin-perfil" :class="{disabled,round}">
    <div class="vp">
      <img class="imgin-img " :src="preview" alt=""> 
    </div>
    <span class="imgin-button" @click="clickHanlder()">
      Alterar
    </span>
  </div>
</template>

<script>
const fileInput = document.createElement('input'); fileInput.type = 'file';
export default {

  props:{
    src:{tye:Object,default:null},
    disabled:{type:Boolean,default:false},
    round:Boolean
  },
  data(){
    return{
        img :this.src == null ?require("./empty.jpg"):this.src
    }
  },
  computed:{
    preview(){
       return this.src || this.img
    }
  },
  methods:{
    clickHanlder(){
  
      fileInput.click();
      fileInput.onchange = e => {
        e.preventDefault();
        const input = e.target;
        var reader = new FileReader();
        reader.onload = (e) =>{
          this.img = e.target.result;
        }
        reader.readAsDataURL(input.files[0]); 
        var formData = new FormData();
        formData.append('image',input.files[0]);
        this.$emit("newFormData",formData)
      }

    }
  }
}
</script>

<style scoped>
  .disabled:after{
    content: "";
    position: absolute;
    top: 0;left:0;
    width: 100%;
    height: 100%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .imgin-perfil {
    position: relative;
    border-radius: 4px;
  
    
  }
  .imgin-perfil.round{
    border-radius: 50%;
  }
  .imgin-perfil.round .vp{
    
    border-radius: 50%;
  }
  .imgin-perfil .vp{
    border: solid 3px rgb(250, 250, 250);
    box-shadow: 0px 2px 3px rgba(51, 51, 51, 0.133);
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    width: 180px;
    height: 180px;
  }
  .imgin-img{
    position: absolute;
    top: 0;bottom: 0;right: 0;left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .imgin-button{
    display: block;
  
    width: fit-content;
    cursor: pointer;
    transition: all .05s;
    padding: 3px 12px;
    text-align: center;
    border-radius: 8px;
    border: solid 2pt rgb(19, 59, 134);
    color:rgb(19, 59, 134);
    margin: 12px auto;

  }
  .imgin-button:hover{
    background-color: rgb(184, 194, 204);
  }
  .imgin-button:active{
    transform: scale(.95);
  }
  .imgin-button .icon{
    height: 100%;
    width: 100%;
    padding: 2px;
    color: rgba(255, 255, 255, 0.5);
  }
</style>