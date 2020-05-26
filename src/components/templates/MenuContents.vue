<template>
      <div class="menu-contents">
 
      <router-link to="/modules" class="menu-item">
        <font-awesome-icon icon="archive"></font-awesome-icon> 
        <span>Módulos</span>
      </router-link>
      <router-link to="/profile" class="menu-item">
        <font-awesome-icon icon="user"></font-awesome-icon> 
        <span>
        Minha Conta

        </span>
      </router-link>
      <router-link to="/ranking" class="menu-item">
        <font-awesome-icon icon="star"></font-awesome-icon> 
        <span> Ranking</span>
      
      </router-link>
      <router-link to="/logout" class="menu-item">
        <font-awesome-icon icon="sign-out-alt"></font-awesome-icon> 
        <span> Logout</span>
      
      </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .menu-item{
    font-family: 'gothamBook', Arial, sans-serif;
    width: 100%;
    height: 48px;
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