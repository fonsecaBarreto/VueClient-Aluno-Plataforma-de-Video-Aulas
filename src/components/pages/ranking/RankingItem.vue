<template>
  <div class="ranking-item" :class="{highlight}">
    <span class="numeration">{{numeration}}</span>
    <div class="user-img-vp " :class="{'img-holding':aluno_result.name == null }">
      <user-profile :user="aluno" v-if="aluno_result.name != null" ></user-profile>
    </div>
  
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
import UserProfile from "../../utils/UserProfile"
export default {
  components:{UserProfile},
  props:{aluno:Object,numeration:Number,highlight:Boolean},
  computed:{
    aluno_result(){
        var aluno = {...INITIAL_ALUNO};
        if(this.aluno != null)aluno = {...this.aluno};
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
  }
  .user-img-vp.img-holding:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left:0;top:0;
    border-radius: 50%;
    background-color: red;
    background-color: #eee;
  }
  .numeration{
    font-size: 1.25em;
    color: #888;
    width: 64px;
  }
  .ranking-item{
    max-width: 720px;
    width: 100%;
    height: 52px;
    border-bottom: solid 1px #ddd;
    display:flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 0 18px;
    margin-top: 6px;
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
     
    .user-img-vp{
      display: none;
    }
   }
  .ranking-item.highlight{
    background-color: #8d0f20;
    background: #2b5876ee;  
    

    border-radius: 16px;
  
  }
  .ranking-item.highlight *{
      color: white!important;
  }
  
  .ranking-item .imgvp{
    height: 32px;
    width: 32px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    border: solid 1px #999;
  }
  .ranking-item .imgvp>img{
    position: absolute;
    top: 0;bottom: 0;left: 0;right: 0;
    margin:auto;
    width: 100%;
    object-fit: cover;
  }
  .ranking-item .name{
    flex:1;
    min-height: 1.4em;
    font-size: 1em;
    line-height: 1.3em;
    font-weight: 500;
    text-transform: uppercase;
    margin-left: 22px;
    position: relative;
    max-height: 2.6em;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: left;
    width: 100%;
  }

  .ranking-item .points{
    width: fit-content;
    min-width: 72px;
    margin-left: 16px;
    font-size: .9em;
    color: #666;
    height: 1.4em;
    position: relative;
     
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
</style>