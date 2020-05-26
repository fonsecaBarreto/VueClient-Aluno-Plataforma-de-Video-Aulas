<template>
  <div id="ranking">
    <div class="box">
      <img class="ranking-img" src="../../../assets/ranking.svg" alt="">
      <div class="d-flex flex-column my-2">

        <span class="ranking-title ">Ranking</span>
        <span class="ranking-text">Vencer um desafio,
          Procurar a superação,
          Escapar por um fio,
          E torná-se campeão.</span>
      </div>
     
      <div class="ranking-flow ">
        <ranking-item v-for="(a,i) in ranking" :key="i" :aluno="a" :numeration="i+1"></ranking-item>
       

        <ranking-item  class="mt-2" highlight  v-if="get_selfRanking" :numeration="get_selfRanking.position+1" :aluno="get_selfRanking"></ranking-item>
      </div>
    </div>
  </div>
</template>

<script>
import RankingItem from "./RankingItem"
import {mapGetters} from "vuex"
export default { 
  components:{RankingItem},
  computed:{
    ...mapGetters(["get_ranking","get_selfRanking"]),
 
    ranking(){
      var ranking =  this.get_ranking != null ? [...this.get_ranking]  : null;
      if(ranking != null && ranking.length){
        let falta = 10 - ranking.length ;
        if(falta > 0 ){
          for (let n = 0; n < falta; n++) {
            ranking.push(null)
          }
        }
      }
      return ranking;
    }
  },
  async mounted(){

     this.$store.commit("set_module_title",null)
    if(this.get_ranking == null){
      const err =await this.$store.dispatch("loadRanking");
      if(err) console.log(err)
    }
  }
}
</script>

<style>

  .ranking-img{
    width: 165px;
    margin: auto;
  }

  .ranking-title{
    font-size: 2.2em;
    line-height: 1.6em;
     margin: auto;
  }
  .ranking-text{
    font-size: 1.1em;
    max-width: 520px;
     margin: auto;
     color:#656565;
     text-align: center;
     padding: 0 16px;
  }
 .box{
    position: relative;
    width: 100%;
    min-height: 200px;
    background-color: white;
    border-radius: 3px;
    display: grid;
    box-shadow:  0px 3px 6px #0002;
    grid-template-columns: 1fr;
    grid-template-rows:  1fr;
    max-width: 700px;
    margin: auto;
    margin-top: 52px;
    padding: 32px 12px;
    margin-bottom: 86px;
  }
  @media  only screen and (max-width:756px) {
    .box{
       margin-top: 36px;
    }
    
  }
  .ranking-flow{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    border-top: solid 1px #ccc;
    margin-top: 32px;
  }
</style>