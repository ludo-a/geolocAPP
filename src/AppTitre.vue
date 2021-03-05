<template>
    <div id="app">
        <header>
            <div class="Logo">
                <h1 id="titre">Po'Pote</h1>
                <img alt="popote logo" class="popotelogo" src="./assets/nouille.png">
                <div id="banniere">
                    <hr color="black" width="500px">
                    <h3>Une application pour decouvrir les restaurants autour de vous</h3>
                    <hr color="black" width="500px">
                </div>
            </div>
        </header>
    </div>
</template>

<script></script>

<style>
@font-face {
  font-family: 'Broken';
  src: url('./fonts/BrokenHeart.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Anti';
  src: url('./fonts/Antipasto.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
h1#titre{
  font-family: 'Broken';
  font-size: 70px;
  margin-bottom:0px;
}
h3{
  font-size: 25px;
  font-family: 'Anti';
  text-align: center;
  color: orange;
  text-shadow: 2px 2px 1px black;
}
#banniere{
    margin-top: 20px;
}
hr{
    border-width: 2px;
    box-shadow: 9px 3px 0px orange;
}
.popotelogo{
  width:100px;
  height:100px;
}
.Logo {
  display:flex;
  justify-content:flex-start;
}
body{
background-image: url("./assets/fond.jpeg");
background-size: cover;
}
@media screen and (max-width: 700px){
 .Logo{
  flex-direction: column;
  align-items: center;
 }
 h1#titre{
  font-size: 50px;
 }
 .popotelogo{
  width:70px;
  height:70px;
 }
 h3{
  width:300px;
  margin:auto;
 }
 #banniere{
    margin-top: 10px;
}
}
</style>
