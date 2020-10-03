<template>
  <div class="sender-form bd-green" :class="{'onloading':freeze}">
      <textarea   v-model="inputs.content" class="input-box" placeholder="Compartilhe as suas duvidas!"
       cols="30" rows="5"></textarea>
      <div class="flex-row jus-end">
       <button-a project @click.native="sendInteraction()" class="px-5">
         <font-awesome-icon icon="paper-plane"></font-awesome-icon>
     </button-a>
      </div>
  </div>
</template>

<script>
import InputGroup from "../../utils/InputGroup";
import ButtonA from "../../utils/ButtonA"
export default {
  props:{parentId:{default:null},from:String,module:Number},
  components:{InputGroup,ButtonA},
  data(){
    return{
      freeze : false,
      inputs:{content:""}
    }
  },methods:{
    async sendInteraction(){
      if(this.inputs.content != null && this.inputs.content.length > 0){
        this.$emit("sending")
     /*    this.freeze = true */
        const {err,data} =  await this.$store.dispatch("sendInteraction",{...this.inputs,parentId:this.parentId,module:this.module,from:this.from})
        this.inputs.content = ""
        /* this.freeze = false; */
        if(data)this.$emit("novo",data)
      }
    }
  }
}
</script>

<style scoped>
  .sender-form{
    width: 100%;
    height: fit-content;
    box-sizing: border-box;
    gap: 8px;
    position: relative;
  }
  .input-box{
    width: 100%;
    padding: 9px 12px;
    border-radius: 4px;
    border: solid 1px #ddd;
  }
  .input-box:active{
    outline: none;
  }
  .input-box:focus{
   
    outline: none;

  }
 .sender-form.onloading::after{
    content: "";
    position: absolute;
    top: -16px;left: -16px;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    background-color: rgba(248, 248, 248, 0.7);
    background-image: url("../../../assets/loading.svg");
    background-repeat: no-repeat;
    background-size: 180px;
    background-position: center;
    z-index: 9999;
  } 
</style>