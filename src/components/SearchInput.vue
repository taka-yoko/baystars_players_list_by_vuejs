<template>
  <div class="search-input">
    Search <input type="text" name="query" v-model="searchQuery" @keyup="changeHandler" />
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        searchQuery: ""
      }
    },
    methods: {
      changeHandler() {
        this.$emit('searchData', this.searchQuery);
      }
    }
  }
</script>

<style scoped>
.search-input {
  margin-top: 20px;
}
input {
  margin-left: 5px;
}
</style>
