<template>
	<div class="nouveauRestaurant">
		<span class="ajoutText"><b>AJOUTER UN RESTAURANT:</b><button class="closeNewRestau" v-on:click="closeNewRestau()"><b>X</b></button><br/><br/>
			Veuillez entrer le nom de l'établissement:
			<input v-model="nomRestau" class="NomRe" placeholder="renseignez-moi"><br/><br/>
			Adresse de l'établissement:<br/>
			{{ addnewAdress }}<br/><br/>
			Veuillez indiquer le nombre d'étoiles:</span>
		<section>			
			<input type="radio" id="one" value="1" v-model.number="numberStarsNewrestau">
			<label for="one"><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="two" value="2" v-model.number="numberStarsNewrestau">
			<label for="two"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="three" value="3" v-model.number="numberStarsNewrestau">
			<label for="three"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="four" value="4" v-model.number="numberStarsNewrestau">
			<label for="four"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label><br/>
			<input type="radio" id="five" value="5" v-model.number="numberStarsNewrestau">
			<label for="five"><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></label>
		</section><br/>
		Votre Commentaire:
		<textarea class="NewRestauCom" v-model="CommentaireNewrestau" placeholder="ajoutez votre texte"></textarea><br/><br/>
		<button  class="addNewRestau" v-on:click="addNewRestau()"><b>Ajouter l'avis</b></button>
		
	</div>
</template>

<script>

export default {
	props: ["newGeometry", "starSelect", "newAdress"],
	name: 'NewRestaurant',
	data(){
		return{
			nomRestau:null,
			numberStarsNewrestau:null,
			CommentaireNewrestau:"",
		}
	},
	methods: {
		addNewRestau :function() {
			var that = this
			if (this.nomRestau && this.numberStarsNewrestau && this.CommentaireNewrestau) {
				that.$parent.arRestaurants = [];
				that.$parent.myJson.push({"name":that.nomRestau, "rating":that.numberStarsNewrestau, "vicinity":that.newAdress, "geometry":that.newGeometry, "reviews":[{"rating":that.numberStarsNewrestau,"text":that.CommentaireNewrestau}]});
				that.$parent.delMarkers();
				that.$parent.setMarker();
				this.$parent.mynewRestaurant = false;
				alert("le restaurant a été ajouté");
			}
			else {
				alert("Veuillez remplir tous les champs, Merci.");
			}

		},
		closeNewRestau: function() {
			if(this.starSelect.length==1||this.starSelect.length==2){
				window.location.reload();
			} else {
				this.$parent.mynewRestaurant = false;
			}
		},
	},
	computed: {
		addnewAdress(){
			return this.newAdress;
		}
	}
}
</script>

<style>
.NomRe{
	width:320px;
}
.closeNewRestau{
	background-color:#ff4500;
	color:white;
	font-size: 12px;
	border-radius: 5px;
	float:right;
	height:25px;
}
.nouveauRestaurant{
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
.NewRestauCom{
	font-family: "Arial";
	font-size: 14px;
	width: 320px;
	height: 178px;
}
.addNewRestau{
	background-color:orange;
	border:solid 1px black;
	font-size: 12px;
	border-radius: 5px;
	height:25px;
}
@media screen and (max-width: 700px){
	.nouveauRestaurant{
		width:330px;
		height: 530px;
	}
	.NewRestauCom{
		width:250px;
	}
	.NomRe{
	width:280px;
	}
}
</style>
