<template>
  <div class="content-header">
    <span class="title">{{title}}</span>
    <div class="user-div mr-0 ml-auto">
        <span class="user-name">{{user.name}} </span>
        <user-profile :user="get_user"></user-profile>
        <drop-down >
               <router-link to="/logout">logout</router-link>
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
  }
}
</script>

<style scoped>
  .content-header {
    height: 86px;
    border-bottom: solid 1px #ddd;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
  @media only screen and (max-width: 960px){
    .content-header {
      height: 64px;
    }
  }
  .content-header .title{
    font-size: 1.5em;
    line-height: 2.1em;
    font-weight: 500;
  }
  .user-div{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: 10px;
   
  }
  .user-div .user-name{
    margin-right: 12px;
     color: #444;
  }
  @media only screen and (max-width:1024px){
    .user-div .user-name{
      display: none;
    }
  }
  @media only screen and (max-width:960px){
    .user-div{
      display: none;
    }
  }
</style>