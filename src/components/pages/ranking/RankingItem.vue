<template>
  <div class="ranking-item">
    <span class="numeration">{{numeration}}</span>

    <user-profile :user="aluno"  ></user-profile>
  
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
  props:{aluno:Object,numeration:Number},
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
  .numeration{
    font-size: 1.2em;
    color: #888;
   
    width: 36px;
  }
  .ranking-item{
   
    max-width: 720px;
    width: 100%;
    height: 50px;
    border-bottom: solid 1px #ddd;
    display:flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 0 22px;
    margin-top: 6px;
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
    height: 1.4em;
    font-size: 1em;
    line-height: 1.4em;
    font-weight: 600;
    text-transform: uppercase;
    margin-left: 22px;
    position: relative;
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