<template>
  <div class="minhaconta ">
    <div class="box">
        <div class="left ">
          <img-in-perfil round :src=" ( inputs.picture != null && inputs.picture.sm != null) ? inputs.picture.sm : null" @newFormData="handleImage" ></img-in-perfil>
        </div>
        <div class=" right">
            <input-group label="name" > <input type="text" v-model="inputs.name"></input-group>
            <input-group label="email" ><input type="text" v-model="inputs.email"> </input-group>
            <div class="button-group">
              <button-a h="38px" danger @click.native="changepw()" > Alterar Senha</button-a>
              <button-a h="38px" project class="ml-2" @click.native="changeUser()" > Salvar</button-a>
            </div>
        </div>
    </div>
    <div class="pbox">
      <div >
        <font-awesome-icon icon="ticket-alt" class="mr-2"></font-awesome-icon>
        <span class="font-weight-bold"> {{get_user.expiration - Date.now()  | militoDays}} dias </span>
        <span> de acesso restantes</span>
      </div>
    </div>
  <!--   <div class="pbox">

      <div  class="mb-2">
        <font-awesome-icon icon="chart-bar" class="mr-2"></font-awesome-icon>
        <span >  statistics </span>
      </div>

      <div class="text-muted small ml-2">
        <font-awesome-icon icon="star" class="mr-2"></font-awesome-icon>
        <span > {{get_user.points}} points </span>
  
      </div>
    </div> -->
    <t-modal :show="modal" size="md" @close="cancel()">
      <div class="password-box">

          <input-group :label="changePassword == true ? 'Ultima senha' : 'Senha'"> <input type="password" v-model="inputs.password"></input-group>

          <div v-if="changePassword == true">

            <input-group  label="Nova Senha" > 
              <input type="password" v-model="inputs.newpassword"></input-group>
            <input-group  label="Repita a senha nova" >
              <input type="password" v-model="inputs.newpassword_repeat"></input-group>
          
          </div>
         
         
          <span class="text-muted text-center w-100" v-if="errors && errors.length">{{errors[0].msg}}</span>
          <div class="button-group">
              <button-a h="38px"  danger class="ml-2 " @click.native="cancel()" >Cancelar</button-a>
              <button-a h="38px"  project class="ml-2 px-5" @click.native="save()" :loading="saving"> Salvar</button-a>
          </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
import ImgInPerfil from "../../utils/ImgInPerfil"
import InputGroup from "../../utils/InputGroup"
import ButtonA from "../../utils/ButtonA"
import {mapGetters} from "vuex"
import  TModal from "../../utils/TModal"

const INITIAL_INPUTS ={
  id:null,
  name:null,
  email:null,
  picture:null,
  password:null,
  newpassword:null,
  newpassword_repeat:null
}
export default {
  components:{TModal,ImgInPerfil,InputGroup,ButtonA},
  computed:{
    ...mapGetters(["get_user"])
  },
  filters:{
    militoDays(val){
       return Math.ceil( Number(val) / (864 *(10**5)))
    }
  },
   data(){return{
    changePassword:false,
    modal:false,
    inputs: this.get_user != null ? {...this.get_user} :{...INITIAL_INPUTS},
    saving:false,
    errors:[],
  }},
  methods:{
    changepw(){
      this.errors = [];
      this.changePassword = true;
      this.modal = true;
    },
    changeUser(){
      this.errors = [];
      this.changePassword = false;
      this.modal = true;
    },
    cancel(){
      this.errors=[],
      this.saving = false;
      this.modal =false;
      this.inputs.password = null;
      this.inputs.password_repeat = null;
    },
    sucesso(){
      this.cancel();
      this.$swal( {
        title: "Salvo com sucesso!",
        text: "As good as it gets",
        icon: "success",
        buttons: false,
        timer: 1600,
      })
    },
    async save(){
      this.saving=true;
      if(!this.changePassword){
        const err = await this.$store.dispatch("updateUser",{...this.inputs})
        this.saving = false;
        if(err && err.length) return this.errors  = err;
        else if(err == null){this.sucesso();}
      }else{
        const err = await this.$store.dispatch("updatePassword",{...this.inputs})
        this.saving = false;
        if(err && err.length) return this.errors  = err;
        else if(err == null){this.sucesso();}
      }
    },
    handleImage(formdata){
      this.inputs.picture = formdata
    }
  },

  watch:{
    get_user:{
      immediate: true,
      handler(data){
        this.inputs = this.get_user != null ? {...this.get_user} :{...INITIAL_INPUTS}
      }
    }
  }
}
</script>

<style scoped>
.pbox{
   background-color: white;
    border-radius: 3px;
    display: grid;
    box-shadow:  0px 3px 6px #0002;
    width: 100%;
    max-width: 960px;
    padding: 8px 22px;
    margin: auto;
}
.minhaconta{
 
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 12px;
  flex-direction: column;
  justify-content: flex-start;
}
.password-box{
  padding: 32px;
}
.button-group{
  margin-top: 14px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
  .box{
    width: 100%;
    min-height: 200px;
    background-color: white;
    border-radius: 3px;
    display: grid;
    box-shadow:  0px 3px 6px #0002;
    grid-template-columns: 280px 1fr;
    grid-template-rows:  1fr;
    max-width: 960px;
    padding: 32px 21px;
  }
  .left{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 22px;
  }
  @media only screen and (max-width:756px){
    .box{
      padding: 32px 12px;
    }
    .right{
      padding: 12px;
    }
  }
  @media only screen and (max-width:960px){
  .box{
      
      grid-template-columns: 1fr !important;
      grid-template-rows: 280px 1fr;
    }
  }
</style>