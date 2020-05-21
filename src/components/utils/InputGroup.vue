<template>

  <div class="form-input" :class="{basic,solid,'red-line':warning}">
       <label v-show="label">{{label}}</label><slot></slot>
       <span class="warning-text" v-show="warning">{{warning}}</span> 
  </div>
</template>

<script>
export default {
    props:{
        basic:{type:Boolean,default:true},
        solid:{type:Boolean,default:false},
        label:{type:String,default:null},
        warning:{type:String,default:null},
        column:{type:Number,default:2}
    }

}
</script>

<style scoped>
    .form-input{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        position: relative;
        padding: 0px 0 6px 0px ;
        overflow: hidden;
    }
    .form-input.red-line input{border-bottom: 1pt solid rgb(199, 19, 19) !important;}
    input[type="text"], input[type="password"],  input[type="number"],  textarea,  select{
        min-width: 160px;
        font-size: 1.2em;
        padding: 6px 8px;
    }
    .basic input[type="text"], .basic input[type="password"], .basic input[type="number"], .basic textarea, .basic select{
        border: none;
        background: none ;
        border-bottom: 1pt solid #aaa;
    } 
    .solid  input[type="text"], .solid input[type="password"], .solid input[type="number"], .solid textarea, .solid select{
        border: 1pt solid #aaa;
        background: #eee;
        color: #222;
        border-radius: 6px; 
        padding: 8px;
        
    }





    input:focus, select:focus{outline: none;} 
    .warning-text{
        color: rgb(199, 19, 19) ;
        font-size: .9em;
        line-height: 1.2em;
        font-weight: bold;
        position: absolute;
        right: 2px;
        bottom: 0px;
        padding: 0 2px;
        margin-right: 4px;
        margin-left:auto;
        background-color: white;
    }
    textarea.invalid:focus{
        border: 1pt solid #aaa;
        box-shadow: none;
    }
    
    .warning-icon{
        position: absolute;
        right: 3px;
        bottom: -1px;
        margin: auto;
        color: rgb(199, 19, 19) ;
        background-color: white;
        padding: 2px;
        width: 15px;
        height: 15px;
    }
  
    label{
        font-size: .95em;
        line-height: 1.2em;
        color: rgba(23, 40, 148, 0.75);
        font-weight: bold;
        padding: 4px 2px;
        margin: auto auto auto 0;
    }
</style>