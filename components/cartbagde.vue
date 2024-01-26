<!-- löschen-->
<template>
    <v-badge :content="20">
        <v-btn
          prepend-icon="mdi-cart-outline"
            color="#FF6B35"
            size="x-large"
            class="flex-grow-2"
            @click="goToCartPage"
          >
          </v-btn>
    </v-badge>
</template>
<script>
 export default {
     
  methods:{
    goToCartPage(){
      this.$router.push('/cart')
    }
  }
};

</script>