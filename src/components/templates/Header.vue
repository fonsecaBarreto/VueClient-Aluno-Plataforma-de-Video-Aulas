<template>
  <div class="content-header bd-blue">
    <span class="botao-voltar" @click="voltar()" v-if="title != 'Módulos'">
      <font-awesome-icon icon="chevron-left"></font-awesome-icon>
    </span>
    <span class="title bd-red">{{title}}</span>
    <div class="user-div mr-0 ml-auto bd-red">
     
        <span class="user-name">{{user.name}} </span>
        <user-profile :user="get_user"></user-profile>
        <drop-down>
               <router-link to="/profile">Minha Conta</router-link>
               <router-link to="/logout" >Sair</router-link>
        </drop-down>
    </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserProfile from "../utils/UserProfile";
import DropDown from "../utils/Dropdown"
export default {
  components:{UserProfile,DropDown},
  props:{title:String},
  computed:{
    ...mapGetters(["get_user"]),
    user(){
      const user = this.get_user != null? this.get_user : {name:null};
      return user;
    }
  },methods:{
      voltar(){this.$router.go(-1) },
  },mounted(){
    console.log(this.$route)
  }
}
</script>

<style scoped>
  .content-header {
    height: fit-content;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: solid 1px #ddd;
    
  }

  .content-header .title{
    font-family: 'GothamMedium', 'Arial Narrow', Arial, sans-serif;
    width: fit-content;
    font-size: 1.4em;
    line-height: 1.1em;
    color: #444;

  }
  .botao-voltar{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center ;
    font-size: .85em;
    font-weight: 500;
    width: 38px!important;
    height: calc(52px - 10px);
    margin-top: 12px;
    color: #999;
    cursor: pointer;
    border: solid 1px #e4e4e4;
    border-radius: 12px;
    margin: 5px;
    margin-right:12px;
    transition: all .15s;
  }
  .botao-voltar:hover{
    color: #444;
    box-shadow: inset 0px 2px 4px #00000010;
    border: solid 1px #ddd;

  }
  .user-div{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: 4px 10px;
   
  }
  .user-div .user-name{
    margin-right: 12px;
     color: #444;
  }

  @media only screen and (max-width:1446px){

    .user-div .user-name{
      display: none;
    }
  }
  @media only screen and (max-width:960px){

    .user-div{
      display: none;
    }
    .content-header {
      padding-bottom: 8px;
    }
  }

</style>