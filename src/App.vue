<template>
    <div class="container">
        <search-input @searchData="searchData"></search-input>
        <player-table
            :players="players"
            :columns="columns"
            :filterKey="searchQuery">
        </player-table>
    </div>
</template>

<script>
    import PlayerTable from './components/PlayerTable.vue'
    import SearchInput from './components/SearchInput.vue'
    import Player from './util/api/Player'

    export default {
        data: function() {
            return {
                searchQuery: '',
                columns: ['name', 'number', 'average'],
                players: []
            }
        },
        mounted: function() {
            const api = new Player()
            api.getPlayer().then((response) => {
                this.players = response.data;
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            searchData(searchQuery) {
                this.searchQuery = searchQuery;
            }
        },
        components: {
            playerTable: PlayerTable,
            searchInput: SearchInput
        }
    }
</script>

<style>
</style>
