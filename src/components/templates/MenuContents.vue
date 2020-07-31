<template>
      <div class="menu-contents">
 
      <router-link to="/modules" class="menu-item">
        <font-awesome-icon icon="archive" class="mi-icon"></font-awesome-icon> 
        <span>Módulos</span>
      </router-link>
      <router-link to="/profile" class="menu-item">
        <font-awesome-icon icon="user" class="mi-icon" ></font-awesome-icon> 
        <span>
        Minha Conta

        </span>
      </router-link>
      <router-link to="/interactions" class="menu-item">
        <font-awesome-icon icon="handshake" class="mi-icon"></font-awesome-icon> 
        <span>Feed</span>
      </router-link>

      <router-link to="/ranking" class="menu-item">
        <font-awesome-icon icon="star" class="mi-icon"></font-awesome-icon> 
        <span> Ranking</span>
      
      </router-link>

      <a href="https://chat.whatsapp.com/FKrKONwzHulDO8alafdFpN" class="menu-item">

        <div class="mi-icon whatsicon"></div>
        <span> Whatsapp Group</span>
      </a>

      <router-link  to="/support" class="menu-item">
        <font-awesome-icon icon="at" class="mi-icon"></font-awesome-icon> 
        <span> Contato</span>
      </router-link>
      <router-link to="/logout" class="menu-item">
        <font-awesome-icon icon="sign-out-alt" class="mi-icon"></font-awesome-icon> 
        <span> Logout</span>
      </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .mi-icon{
    width: 24px;
  }
  .whatsicon{
    height: 1.1em;
    background: url("../../assets/whatsapp.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 16px;
    color: white;
  }

  .menu-item{
    font-family: 'gothamBook', Arial, sans-serif;
    width: 100%;
    height: 42px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1em;
    font-weight: 500;
  }
    
  .menu-item:hover{
    background-color: rgba(0,0,0,.15);
    text-decoration: none;
    color: white;
  }
  .menu-contents{
    margin-top: 22px;
    margin-bottom: 22px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>