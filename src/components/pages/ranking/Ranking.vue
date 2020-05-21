<template>
  <div id="ranking">
    <div class="box">
      <img class="ranking-img" src="../../../assets/ranking.svg" alt="">
     
      <span class="ranking-text">Ranking</span>
      <div class="ranking-flow ">
        <ranking-item v-for="(a,i) in ranking" :key="i" :aluno="a" :numeration="i+1"></ranking-item>
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
    ...mapGetters(["get_ranking"]),
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
    width: 200px;
    margin: auto;
  }

  .ranking-text{
    font-size: 2.2em;
    line-height: 2.5em;
     margin: auto;
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
    margin-top: 64px;

    padding: 32px 12px;
  }
  .ranking-flow{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
</style>