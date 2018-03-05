<template>
  <div>
    <h3>PlayerTable</h3>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns"
            @click="sortBy(column)"
            :class="{active: sortKey === column}"
          >
            {{column | capitalize}}
            <span class="arrow"
              :class="sortOrders[column] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in filteredPlayers">
          <td>{{ player.name }}</td>
          <td>{{ player.number }}</td>
          <td>{{ setAvg(player.average) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data: function() {
      let sortOrders = {};
      this.columns.forEach(function(key) {
        sortOrders[key] = 1;
      });
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    props: {
      players: {
        type: Array
      },
      columns: {
        type: Array
      },
      filterKey: {
        type: String
      }
    },
    methods: {
      setAvg(avg) {
        return avg === null ? "データなし" : avg;
      },
      sortBy(column) {
        this.sortKey = column;
        this.sortOrders[column] = this.sortOrders[column] * -1;
      }
    },
    computed: {
      filteredPlayers() {
        const sortKey = this.sortKey;
        const filterKey = this.filterKey && this.filterKey.toLowerCase();
        const order = this.sortOrders[sortKey] || 1;
        let players = this.players;
        if(filterKey) {
          players = players.filter((row) => {
            return Object.keys(row).some((key) => {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
            });
          })
        }
        if(sortKey) {
          players = players.slice().sort((a, b) => {
            a = a[sortKey];
            b = b[sortKey];
            if(a === null) {
              return -1 * order;
            } else if(b === null) {
              return 1 * order;
            }
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
        return players;
      }
    },
    filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  }
</script>

<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
