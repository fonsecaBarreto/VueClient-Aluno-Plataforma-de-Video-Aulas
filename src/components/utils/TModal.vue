<template>
    <transition name="fade">
        <div class="t-modal" v-show="show" >
            <div class="modal-content" :class="[size,position]">
                <div class="modal-header ">
                    <span class="modal-title unselectable">{{title}}</span>
                    <span class="modal-close unselectable" @click="close()"> 
                    <font-awesome-icon icon="times"></font-awesome-icon>
                    </span>
                </div>
                <div class="modal-body">
                    <slot>
                        
                    </slot>
                </div>
            </div>
        </div>
  </transition>
</template>

<script>
export default {
    mounted(){
        this.gone()
    },
    props:{
        show:{type:Boolean,default:true},
        title:{type:String,default:""},
        size:{type:String,default:"lg"},
        timer:{type:Number,default:null},
        pos:{type:Number,default:0}
    },
    computed:{
       position(){
           var v = "top"
           switch(this.pos){
               case 0 : v = "top"; break;
               case 1 : v= "center"; break;
           }
           return v;
        }
    },
    methods:{
        close(){ this.$emit("close")},
        gone(){
            if(this.timer)
            setTimeout(()=>{this.close()},this.timer)}
    },
    watch: {
        show: function (novo) {
            if(novo === true) this.gone()
        },
        timer:function(novo){
            if(novo!=undefined) this.gone();
        }
  },
   
}
</script>

<style scoped>

    .t-modal{
        position: fixed;
        top: 0;left:0;
        width: 100%;
        height:100vh;
        background-color: rgba(0, 0, 0,.3);
        z-index: 99999;
        overflow: auto;
    }
    .modal-content{
        width: fit-content;
        background-color: #fff;
        box-shadow: 0px 4px 9px #0003;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border: none;
        overflow: hidden;
    }
    .modal-close{
        
        padding: 8px 16px;
        cursor: pointer;
        font-size: 1em;
        position: absolute;
        right: 0;
        top:0;
    }
    .modal-close:active{ color: rgb(219, 17, 17);}
    .modal-header{
        width: 100%;
        height: fit-content;
        padding: 10px 12px;
        border-bottom: none;
        position: absolute;
        z-index: 999999;
    }
    .modal-title{
        font-size: 1.2em;
    }
    .modal-body{
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
       padding: 0px;
    }
     .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .fade-enter-active, .fade-leave-active {transition: opacity .4s;}
    .fade-enter, .fade-leave-to {opacity: 0;}
    .top{ margin: 82px auto !important; }
    .center{ margin: 25vh auto !important; }
    .sm{max-width: 360px; min-width: 240px; min-height: 96px;}
    .md{max-width: 520px; min-width: 360px; min-height: 182px;}
    .lg{max-width: 960px; min-width: 520px; min-height: 360px;}
</style>