<template>
	<div class="nouveauCom">
		<span class="ajoutText"><b>AJOUTER UN AVIS:</b><button class="closeCo" v-on:click="closeNeWCo()"><b>X</b></button><br/><br/>
			Veuillez indiquer le nombre d'étoiles:</span>
		<section>			
			<input type="radio" id="one" value="1" v-model.number="numberStarsNewCom">
			<label for="one"><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="two" value="2" v-model.number="numberStarsNewCom">
			<label for="two"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="three" value="3" v-model.number="numberStarsNewCom">
			<label for="three"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="four" value="4" v-model.number="numberStarsNewCom">
			<label for="four"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="five" value="5" v-model.number="numberStarsNewCom">
			<label for="five"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label>
		</section><br/>
		Votre Commentaire:
		<textarea v-model="Commentaire" placeholder="ajoutez votre texte"></textarea><br/><br/>
		<button  class="addNewCom" :disabled="numberStarsNewCom === null || Commentaire.length < 3" v-on:click="addNew(index)"><b>Ajouter l'avis</b></button>
		
	</div>
</template>

<script>

export default {
	props: ["index", "starSelect"],
	name: 'NewComments',
	data(){
		return{
			numberStarsNewCom:null,
			Commentaire:"",
		}
	},
	methods: {
		addNew :function(index) {
			this.$parent.filtreActif = false;
			this.$parent.arRestaurants = [];
			if(this.$parent.myJson[index].reviews == undefined){
				this.$parent.myJson[index].reviews = [];
				
			}
			this.$parent.myJson[index].reviews.push({"rating":this.numberStarsNewCom,"text":this.Commentaire});
			alert("Votre commentaire a été ajouté avec succès");
			var note =0;
			var noteTotal=0;
				this.$parent.myJson[index].reviews.forEach(e=>{
					note+=e.rating;
				})
				note = (note/this.$parent.myJson[index].reviews.length).toFixed(1);
				noteTotal=((Number(note)+this.$parent.myJson[index].rating)/2).toFixed(1);
				this.$parent.myJson[index].rating = Number(noteTotal);
				this.$parent.readNote(index);
		},
		closeNeWCo: function() {
			if(this.starSelect.length==1||this.starSelect.length==2){
				window.location.reload();
			} else{
				this.$parent.newCom=false;
			}
		},
	},
}
</script>

<style>
.closeCo{
	float:right;
	background-color:#ff4500;
	color:white;
	font-size: 12px;
	border-radius: 5px;
	height:25px;
}
.nouveauCom{
	font-family: "Arial";
	background-color: #F5F5F5;
	border : solid 2px;
	border-radius: 4px;
	font-size: 14px;
	width:330px;
	height: 465px;
	margin-top: 10px;
	padding:8px;
}
textarea{
	font-family: "Arial";
	font-size: 14px;
	width: 320px;
	height: 278px;
}
.addNewCom{
	background-color:orange;
	border:solid 1px black;
	font-size: 12px;
	border-radius: 5px;
	height:25px;
}
@media screen and (max-width: 700px){
	.nouveauCom{
		width:330px;
	}
	textarea{
		width: 300px;
		height: 200px;
	}
}
</style>
