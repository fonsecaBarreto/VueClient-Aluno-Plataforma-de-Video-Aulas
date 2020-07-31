<template>
  <div class="ranking-item d-flex align-items-center" 
    :class="{highlight, 
    'first':numeration === 1,
    'second':numeration === 2,
    'third':numeration === 3
    
    
    }">
    <span class="numeration">{{numeration}}</span>
    
    <user-avatar :picture="aluno_result.picture"
      :first="numeration  === 1"
      :second="numeration === 2"
      :third="numeration  === 3"
    
    ></user-avatar>

  
    <span class="name " :class="{'onhold': aluno_result.name == null }">{{aluno_result.name}}</span>
    <span class="points" :class="{'onhold': aluno_result.name == null  && aluno_result.points == null}">
     
    <font-awesome-icon icon="star"></font-awesome-icon>
     {{aluno_result.points || '0'}}</span> 
  </div>
</template>

<script>
const INITIAL_ALUNO ={
  name:null,
  points:null,
  picture:null
}
import UserAvatar from "./UserAvatar"
import "./ranking.css"
export default {
  components:{UserAvatar},
  props:{aluno:Object,numeration:Number,highlight:Boolean},
  computed:{
    aluno_result(){
        var aluno = {...INITIAL_ALUNO,...this.aluno};
        aluno.picture = aluno.picture != null && aluno.picture.sm
        ? aluno.picture.sm 
        : ""
        
        return aluno
    }
  }
}
</script>

<style scoped>

  .user-img-vp{
    position: relative;
    height: 38px;
    width: 38px;
    background-color: white;
  }
  .user-img-vp.img-holding:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left:0;top:0;
    border-radius: 50%;
    background-color: #eee;
  }
  .numeration{
    font-size: 1.25em;
    color: #888;
    width: 64px;
  }
  .ranking-item{
    position: relative;
    max-width: 720px;
    width: 100%;
    height: 56px;
    border-bottom: solid 1px #ddd;
    background-color: white;
    padding: 0 18px;
    margin: 4px 0;
    border-radius: 12px;
  }
  @media only screen and (max-width:756px){
     .ranking-item{padding: 0 12px}
     .numeration{
      font-size: 1em;
      color: #888;
      width: 30px;
      overflow:hidden;
    }
  }
   @media only screen and (max-width:320px){
    .user-img-vp{ display: none;}
   }


  .ranking-item .name{
 
  max-width: 100%;
    flex:1;
    min-height: 1.8em;

    font-size: 1em;
    line-height: 1.9em;
    font-weight: 500;
    text-transform: uppercase;
    margin-left: 22px;
    position: relative;
    max-height: 1.9em;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
    width: 100%;
    background-color: white;
    border-radius: 24px;
    padding-left: 14px;
    padding-right: 14px;
  }

  .ranking-item .points{
    width: fit-content;
    min-width: 80px;
    margin-left: 16px;
    font-size: 1em;
    color: #666;
    height: 1.8em;
    line-height: 1.9em;
    position: relative;
    background-color: white;
    border-radius: 24px;
    text-align: center;
    
  }
 
 .ranking-item.first .points, 
 .ranking-item.second .points,
  .ranking-item.third .points{
    color: #222!important;
    box-shadow: inset 0px 2px 5px #0005;
 
  } 
 .ranking-item.first .name, 
 .ranking-item.second .name,
  .ranking-item.third .name{
    color: #222!important;
    box-shadow: inset 0px 2px 5px #0005;
 
  } 
 .ranking-item.first .numeration, 
 .ranking-item.second .numeration,
  .ranking-item.third .numeration{
    font-size: 1.5em;
    color: white!important;
    text-shadow: 0px 0px 5px #0008;
  } 



  .onhold:after{
    content: "";
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: #eee;
  
  }
  .ranking-item.highlight{
    margin-top: 22px !important;
    border: dashed 1.5pt #888

  }
</style>