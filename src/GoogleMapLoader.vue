<template>
	<div id="restauMap">
		<div class="google-map" id="mapName"></div>
		<ul id="listeRestau">
			<li class="oneElt" v-for="(data, index) in myJson" v-bind:key="data.id"  v-bind:index="index" v-on:click="readNote(index)">
			<span class="eltTitre"><span class="nomRes">{{data.name}}</span><RatingStars v-bind:note="moyenne[index]"></RatingStars></span>
			{{data.vicinity}}
			</li>
		</ul>
		<div id="filtreAndCo">
			<div>
				<button class="goHome" v-on:click="goHome()">^</button>
				<button :disabled="newCom === true || filtreActif === true || comments === true" class="filtreOn" v-on:click="filtreOn()"><b>Filtrer les restaurants</b></button>
			</div>
			<Filtrage v-if="filtreActif" v-on:newarray="setStars($event)"></Filtrage>
			<Comments v-if="comments" v-bind:starComment="elemClicked" v-bind:starSelect="starSelect"></Comments>
			<NewComment v-if="newCom" v-bind:index="index" v-bind:starSelect="starSelect"></NewComment>
			<NewRestaurant v-if="mynewRestaurant" v-bind:starSelect="starSelect" v-bind:newGeometry="newGeometry" v-bind:newAdress="newAdress"></NewRestaurant>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import GoogleMapsApiLoader from 'google-maps-api-loader'
import RatingStars from './components/RatingStars.vue'
import Comments from './components/Comments.vue'
import Filtrage from './components/Filtrage.vue'
import NewComment from './components/NewComment.vue'
import NewRestaurant from './components/NewRestaurant.vue'

export default {
	components:{
		RatingStars,
		Comments,
		Filtrage,
		NewComment,
		NewRestaurant,
	},
	data(){
		return{
			apiKey: "YOU_API_KEY_FROM_GOOGLE",
			myJson:[],
			bounds:null,
			lat:0,
			lng:0,
			places:[],
			elemClicked:[],
			arRestaurants:[],	
			markers:[],
			starSelect:[],
			comments:false,
			newCom:false,
			filtreActif:false,
			mynewRestaurant:false,
			index:null,
			newGeometry:null,
			newAdress:null,
			geocoder:null,
		}
	},
	mounted: async function() {
		var that = this;
	// Affichage map Google
		const googleMapApi = await GoogleMapsApiLoader({
			apiKey: this.apiKey
		})
		this.google = googleMapApi
		const element = document.getElementById("mapName")
		const options = {disableDoubleClickZoom: true,};
		this.map = new this.google.maps.Map(element,options);
		this.bounds  = new this.google.maps.LatLngBounds();
	// Affichage de notre position avec geolocalisation + Marker
		this.myPosition();
    // Ajout d'un listener dbl click + recuperation des coordonnées et infos de l'adresse restaurant
		this.geocoder = new this.google.maps.Geocoder();
		this.google.maps.event.addListener(this.map, 'dblclick', function(event) {		
			var resultat = confirm("Placer un nouveau Restaurant sur la Carte?");
			if(resultat == true){
				that.geocoder.geocode({
					'latLng': event.latLng
				}, function(results, status) {
					if (status == that.google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							that.newAdress = results[0].formatted_address;
							that.newGeometry = results[0].geometry;
							that.newGeometry.location.lat = event.latLng.lat();
							that.newGeometry.location.lng = event.latLng.lng();	
						}
					}
				});
				that.filtreActif=false;
				that.newCom=false;
				that.comments=false;
				that.mynewRestaurant=true;
			} else {
				alert("L'ajout a été annulé");
			}
		});
	},
	computed:{ //computed pour la moyenne des avis
		moyenne(){
			var that = this;
			var note;
			this.myJson.forEach(e=>{
				note = e.rating;
				that.arRestaurants.push(Number(note));
			})
			
			for (let i = 0; i < this.myJson.length; i++){ 
				that.myJson[i] = Object.assign({},that.myJson[i], {
					noteMoyenne: that.arRestaurants[i],
			});
		}
			return this.arRestaurants;
		},
	},
	methods:{
		myPosition: function(){
			var that = this;
			function success(position) {
				var crd = position.coords;
				that.lat=crd.latitude;
				that.lng=crd.longitude;
			//requete AXIOS	avec near by search
				axios
				.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+that.lat.toString()+","+that.lng.toString()+"&radius=2000&type=restaurant&key="+that.apiKey)
				.then(response => {
					that.places = response.data.results;
					that.myJson = response.data.results;
				//ajout d'un boolean pour les reviews non chargées
					for (let i = 0; i < that.myJson.length; i++){
						that.myJson[i].reviewsInJson = false;
						}
				//Affichage de notre Marker position
					new that.google.maps.Marker({
						position: {lat: crd.latitude, lng: crd.longitude},
						map: that.map,
						zIndex:999,
						icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
					})
				//Appel de fonction d'affichage des Markers	
					that.setMarker();
				})
				.catch(error => {
				console.log(error.message);
				});
			}
			function error(err) { //message d'erreur si refus de la géolocalisation
			alert(`ERROR(${err.code}): ${err.message}`);
			}
			navigator.geolocation.getCurrentPosition(success, error);
		},
		//Affichage des marker	
		setMarker: function() {

			var infowindow = new this.google.maps.InfoWindow();

			this.myJson.forEach((data)=>{
				const lat = data.geometry.location.lat;
				const lng = data.geometry.location.lng;

				let marker = new this.google.maps.Marker({
					position: new this.google.maps.LatLng(lat, lng),
					map: this.map,
				})
				let loc = new this.google.maps.LatLng(marker.position.lat(), marker.position.lng());
				this.bounds.extend(loc);
				this.markers.push(marker);
			//infos de l'adresse restaurant lors du clic Marker	
				this.google.maps.event.addListener(marker, "click", () => { 
					infowindow.setContent(`${data.name}<p>${data.vicinity}</p>`);
					infowindow.open(this.map, marker);
				});	
			})
			this.map.fitBounds(this.bounds);       //auto-zoom
			this.map.panToBounds(this.bounds);     //auto-cente
			return this.markers;
		},
		//suppression des markeur
		delMarkers: function () {
			while(this.markers.length){
				this.markers.pop().setMap(null);
			}
		},
		//Voir les avis lors du click sur le Li
		readNote: function(index){
			var that = this;
			if(this.myJson[index].reviewsInJson === false){ //requête axios pour les reviews
				axios
				.get("https://maps.googleapis.com/maps/api/place/details/json?place_id="+that.myJson[index].place_id+"&fields=reviews&key="+that.apiKey)
				.then(response => {
					that.myJson[index] = Object.assign({},that.myJson[index], {
						reviews: response.data.result.reviews,
					});
					that.myJson[index].reviewsInJson = true;
					that.filtreActif=false;
					that.mynewRestaurant = false;
					that.newCom=false;
					that.comments=true;
					that.elemClicked.push(that.myJson[index]);
					that.index = index;
					if(that.elemClicked.length == 2){
						that.elemClicked.shift();
					}
					setTimeout(function(){
					var panorama = new that.google.maps.StreetViewPanorama(
						document.getElementById('pano'), {
							position: {lat: that.myJson[index].geometry.location.lat,lng: that.myJson[index].geometry.location.lng},
							pov: {
								heading: 34,
								pitch: 10
							}
						});
						that.map.setStreetView(panorama);
					}, 300);	
				})
			} else if(this.myJson[index].reviewsInJson === true){ // si condition remplie pas de requête axios
				this.filtreActif=false;
				this.mynewRestaurant = false;
				this.newCom=false;
				this.comments=true;
				this.elemClicked.push(this.myJson[index]);
				that.index = index;
				if(this.elemClicked.length == 2){
					this.elemClicked.shift();
				}
				setTimeout(function(){
				var panorama = new that.google.maps.StreetViewPanorama(
					document.getElementById('pano'), {
						position: {lat: that.myJson[index].geometry.location.lat,lng: that.myJson[index].geometry.location.lng},
						pov: {
							heading: 34,
							pitch: 10
						}
					});
					that.map.setStreetView(panorama);
				}, 300);
			}
		},
		//filtrage des restaurants plus le reset
		filtrer: function(){
			var that = this;
			that.myJson = that.places;
			setTimeout(function(){
				that.delMarkers();
				that.myJson = that.myJson.filter(data => data.noteMoyenne === that.starSelect[0]);
				that.arRestaurants = that.arRestaurants.filter(index => index ===that.starSelect[0])
				that.setMarker();
			}, 300);
		},
		filtrerTwo: function(){
			var that = this;
			that.myJson = that.places;
			setTimeout(function(){
				that.delMarkers();
				that.myJson = that.myJson.filter(data => data.noteMoyenne >= that.starSelect[0])
				that.myJson = that.myJson.filter(data => data.noteMoyenne <= that.starSelect[1]);
				that.arRestaurants = that.arRestaurants.filter(index => index >=that.starSelect[0])
				that.arRestaurants = that.arRestaurants.filter(index => index <=that.starSelect[1]);
				that.setMarker();
			}, 300);
		},
		filtrerReset: function(){
			this.delMarkers();
			this.myJson = this.places;
			this.setMarker();
		},
		//mise à jour des étoiles selectionné pour le filtrage
		setStars: function(array) {
			this.starSelect = array;
		},
		filtreOn: function(){
			this.filtreActif = true;
			this.mynewRestaurant = false;
			this.comments=false;
		},
		goHome: function(){
			window.location.reload();
		},
	},
};
</script>

<style scoped>
.goHome{
	background-color: gold;
	color:gold;
	background-image: url("./assets/home.png");
	background-size: 20px;
	background-repeat:no-repeat;
	background-position:center center;
	color:black;
	font-size: 12px;
	border-radius: 5px;
	margin-top: 25px;
	width: 50px;
	height:29px;
}
.filtreOn{
	background-color: gold;
	width:300px;
	height:30px;
	font-size: 14px;
	border-color: black;
	border-radius: 5px;
	margin-top: 0px;
	margin-left: 0px;
}
.nomRes{
	width:230px;
	font-weight: bold;
}
#filtreAndCo{
	margin-left: 20px;
	margin-right: 10px;
}
#restauMap{
	display:flex;
}
#listeRestau{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-top: 25px;
	width:380px;
	overflow: auto;
	height: 525px;
}
ul{
	padding-left: 15px;
}
.eltTitre{
	display:flex;
	justify-content: space-between;
}
.oneElt{
	cursor: pointer;
	margin: 5px;
	list-style-type: none;
	font-family: "Arial";
	font-size: 14px;
	background-color: #F5F5F5;
	border : solid 2px;
	border-radius: 4px;
	width:320px;
	padding:8px;	
}
.google-map{
	border : solid 2px;
	border-radius: 4px;
	width: 450px;
	height: 520px;
	margin-top: 25px;
	margin-left: 10px;
	background: gray;
}
.showCo,.addCom{
	background-color: #4169e1;
	color:white;
	font-size: 12px;
	border-radius: 5px;
	margin-top: 10px;
	height:25px;
}
@media screen and (max-width: 1250px){
	#restauMap{
		flex-direction: column;
		align-items: center;
	}
	.google-map{
		width: 400px;
		height: 350px;
	}
	#listeRestau{
		height: 250px;
	}
	.filtreOn{
		margin-top: 0px;
	}
}
@media screen and (max-width: 700px){
	.google-map{
		width: 300px;
		height: 300px;
	}
	ul{
		padding-left: 0px;
		padding-right: 10px;
	}
	.filtreOn{
		width: 300px;
	}
	.oneElt{
		width:300px;
	}
	#listeRestau{
		width:330px;
	}
	#filtreAndCo{
		margin-left: 0px;
		margin-right: 0px;
	}
}
</style>