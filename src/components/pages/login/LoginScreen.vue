<template>
  <div id="login-screen" class="bd-red">
   <div class="login-box">
      <img  id="loginlogo" :src="logo" alt="">
      <input-group label="Email" :warning="this.searchError('email')" >
        <input type="text" v-model="credentials.email"  >
      </input-group>
      <input-group label="Senha" :warning="this.searchError('password')">
        <input type="password" v-model="credentials.password">
      </input-group>
      <input-group class="mt-3" >
        <button-a  project @click.native="signin()" :loading="loading" h="42px"> Entrar</button-a>
      </input-group>
      <span class="mt-2">{{soloError}}</span>
   </div>
  </div>
</template>

<script>
import InputGroup from "../../utils/InputGroup"
import ButtonA from "../../utils/ButtonA"
const INITIAL_CREDENTIALS = {email:null,password:null}

export default {
  components:{InputGroup,ButtonA},
  data(){
    return{
      credentials:{...INITIAL_CREDENTIALS},
      errors:[],
      loading:false,
      logo:require("../../..//assets/logo.png")
    }
  },
  computed:{
    soloError(){
      if(this.errors && this.errors.length){
        var found = this.errors.find(e=>e.param == null);
        if(found ) return found.msg
      }
      return null;
    }
  },
  methods:{
    searchError(param){
      if(this.errors && this.errors.length){
        var found = this.errors.find(e=>e.param == param);
        if(found) return found.msg
      }
      return null;
    },
    async signin(){
      this.errors = []
      this.loading=true;
      const err = await this.$store.dispatch("obtainToken",{...this.credentials})
      this.loading=false
      if(err && err.length) return this.errors = err;
      this.$router.push({path:"/"})
        
      

      
    }
  }
}
</script>

<style scoped>
  #loginlogo{
    width: 200px;
    margin-bottom: 48px;
  }
  #login-screen{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../../assets/bgv3.svg");
    background-position: center;
    background-size: cover; 
  }
  .login-box{
    padding: 32px 20px;
    width: 360px;
    background-color: rgb(250, 250, 250);
    margin-top: -100px;
    box-shadow:  0px 4px 10px #0008;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;
  }
  @media only screen and (max-width : 756px){
    .login-box{
      position: fixed;
      top: 32px;
      left: 0;right:0;
      margin: auto;
      width: calc(100% - 16px);
      height: calc(100vh - 64px);
    }
  }
</style>