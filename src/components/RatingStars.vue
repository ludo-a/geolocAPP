<template>
	<div>
		<span v-if="isActive1" class="fa fa-star checked"></span>
		<span v-if="isActive2" class="fa fa-star-half-o" aria-hidden="true"></span>
		<span v-if="isActive3" class="fa fa-star checked"></span>
		<span v-if="isActive4" class="fa fa-star-half-o" aria-hidden="true"></span>
		<span v-if="isActive5" class="fa fa-star checked"></span>
		<span v-if="isActive6" class="fa fa-star-half-o" aria-hidden="true"></span>
		<span v-if="isActive7" class="fa fa-star checked"></span>
		<span v-if="isActive8" class="fa fa-star-half-o" aria-hidden="true"></span>
		<span v-if="isActive9" class="fa fa-star checked"></span>
		
	</div>
</template>

<script>

export default {
	props: ["note"],
	name: 'RatingStars',

	computed:{
		isActive1: function(){
			if(this.note>=0.9){
				return true 
			} else {
				return false
			}
		},
		isActive2: function(){
			if(this.note>=1.4 && this.note<1.9){
				return true 
			} else {
				return false
			}
		},
		isActive3: function(){
			if(this.note>=1.9){
				return true 
			} else {
				return false
			}
		},
		isActive4: function(){
			if(this.note>=2.4 && this.note<2.9){
				return true 
			} else {
				return false
			}
		},
		isActive5: function(){
			if(this.note>=2.9){
				return true 
			} else {
				return false
			}	
		},
		isActive6: function(){
			if(this.note>=3.4 && this.note<3.9){
				return true 
			} else {
				return false
			}
		},
		isActive7: function(){
			if(this.note>=3.9){
				return true 
			} else {
				return false
			}
		},
		isActive8: function(){
			if(this.note>=4.4 && this.note<4.9){
				return true 
			} else {
				return false
			}
			
		},isActive9: function(){
			if(this.note>=4.9){
				return true 
			} else {
				return false
			}
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.checked,.fa-star-half-o {
  color: orange;
}
</style>
