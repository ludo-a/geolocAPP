<template>
	<div class="generated">
		<button class="close" v-on:click="closeWindow()"><b>X</b></button>
		<div v-for="data in myJsonSelected" v-bind:key="data.id">
			<b>{{data.name}}</b><br/><br/>
			<button class="addCom" v-on:click="addComment()">Donner un avis sur le restaurant<span class="fa fa-star checked"></span></button>
			<p v-for="reviews in data.reviews" v-bind:key="reviews.id">
				<RatingStars v-bind:note="reviews.rating"></RatingStars>
				{{reviews.text}}
			</p>	
		</div>
		<button class="addCom" v-on:click="addComment()">Donner un avis sur le restaurant<span class="fa fa-star checked"></span></button>
		<div id="pano"></div>
	</div>
</template>

<script>
import RatingStars from '../components/RatingStars.vue'
export default {
	props: 	["starComment", "starSelect"],
	name: 'Comments',
	components:{
		RatingStars,
	},
	computed: {
		myJsonSelected: function(){
			return this.starComment
		}

	},
	methods: {
		closeWindow: function(){
			if(this.starSelect.length==1||this.starSelect.length==2){
				window.location.reload();
			} else{
				this.$parent.comments = false;
			}
		},
		addComment: function(){
			this.$parent.mynewRestaurant = false;
			this.$parent.comments=false;
			this.$parent.newCom=true;
			this.$parent.filtreActif = false;
		},
	}
}
</script>

<style>
.addCom{
	display: block;
	margin:auto;
	height: 25px;
	font-weight: bold;
	border-radius: 4px;
	box-shadow: 5px 5px 5px #696969, -5px 0 3px #696969;
}
.generated{
	background-color: #F5F5F5;
	font-family: "Arial";
	font-size: 14px;
	border: solid 2px;
	border-radius: 4px;
	padding:8px;
	width: 330px;
	height: 465px;
	margin-top: 10px;
	overflow: auto;
}
.close{
	float:right;
	background-color:#ff4500;
	color:white;
	font-size: 12px;
	border-radius: 5px;
	height:25px;
}
#pano {
	display:block;
	border: solid 2px;
	border-radius: 4px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 15px;
	margin-bottom: 20px;
	width: 310px;
	height: 210px;
}
@media screen and (max-width: 700px){
	.generated{
		width:300px;
	}
	#pano {
		width:280px;
	}
}
</style>
