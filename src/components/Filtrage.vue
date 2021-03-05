<template>
	<div class="filtre">
		<span class="filterText">Filtrer les restaurants par nombre d'étoiles: </span><button class="CloseFil" v-on:click="Close()"><b>X</b></button><br/>
		<button class="resFilter" v-on:click="resetAll()">Reset</button>
		<button class="helpFilter" v-on:click="helpFilter()"><b>Help</b></button>
		<section>			
			<input type="checkbox" id="one" value="1" v-model.number="numberStars" @change="check()">
			<label for="one"><span class="fa fa-star checked"></span></label><br/>
			<input type="checkbox" id="two" value="2" v-model.number="numberStars" @change="check()">
			<label for="two"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="checkbox" id="three" value="3" v-model.number="numberStars" @change="check()">
			<label for="three"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="checkbox" id="four" value="4" v-model.number="numberStars" @change="check()">
			<label for="four"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="checkbox" id="five" value="5" v-model.number="numberStars" @change="check()">
			<label for="five"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<span class="invi">{{checkedComputed}}</span>
			<span class="invi">{{numberStars}}</span>
		</section>
	</div>
</template>

<script>
export default {
	name: 'Filtrage',
	data(){
		return{
			numberStars:[],
		}
	},
	computed:{
		checkedComputed(){ 
			var that = this;
			// Blocage du click au dela de 2 choix sur le filtrage
			var cb = document.querySelectorAll("[type=checkbox]");
			for (let i =0; i < cb.length; i++){
				cb[i].addEventListener("change", function (){
					if (document.querySelectorAll(":checked").length > 2)
						that.checked = false;
				}, false);
			}
			// suppression de l'ajout du click au dela de 2 choix sur le tableau (suppression du 3eme element)
			if (that.numberStars.length >2){
				that.numberStars.pop();	
			} else if(that.numberStars.length===1){
				this.$emit('newarray', this.numberStars);
				
			} else if(that.numberStars.length===2){
				that.numberStars.sort();
				this.$emit('newarray', this.numberStars);
				
			} else if (that.numberStars.length===0){
				that.numberStars = [];
				this.$emit('newarray', this.numberStars);
			}
			return this.numberStars;	
		}
	},
	methods: {
		check: function(){
			if (this.numberStars.length <3){
				if(this.numberStars.length===2){
					this.$parent.arRestaurants = [];
					this.$parent.filtrerTwo();
				} else if(this.numberStars.length===1){
					this.$parent.arRestaurants = [];
					this.$parent.filtrer();
				} else if(this.numberStars.length===0){
					this.$parent.arRestaurants = [];
					this.$parent.filtrerReset();
				}
			}
		},
		helpFilter: function(){
			alert("AIDE POUR FILTRER\n\nVous pouvez filtrer de 2 manières différentes:\n\n1)Choisir une catégorie parmi celle à disposition\n   affichera uniquement une gamme de restaurant\n\n2)Choisir une fourchette de restaurant dans une\n   plage donnée en selectionnant deux catégories.\n   (exemple: 2 et 4 étoiles sélectionnées nous\n    affichera les restaurants ayant 2, 3 et 4 étoiles)");
		},
		resetAll: function(){
			window.location.reload()
		},
		Close: function(){
			this.$parent.filtreActif = false;
		}
	}
}
</script>

<style>
section{
	display:flex;
	justify-content: space-between;
}
.filtre{
	font-family: "Arial";
	background-color: #F5F5F5;
	border : solid 2px;
	border-radius: 4px;
	font-size: 14px;
	width:330px;
	margin-top: 10px;
	padding:8px;	
}
.invi{
	display:none;
}
.helpFilter{
	background-color: gold;
	border-radius: 4px;	
	height:23px;
	font-size: 12px;
	margin-left: 10px;
	margin-bottom: 14px;
}
.resFilter{
	background-color: #4169e1;
	color:white;
	font-size: 12px;
	border-radius: 5px;
	margin-top: 10px;
	height:25px;
}
.CloseFil{
	float:right;
	background-color:#FF4500;
	color:white;
	font-size: 12px;
	border-radius: 5px;
	margin-top: 5px;
	height:25px;
}
@media screen and (max-width: 700px){
	.filtre{
		width:330px;
	}
}
</style>
