<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
            <nav>
              <ul class="pagination justify-content-end">
                <li v-if="pre_url!=null" class="page-item">
                  <a class="page-link" href="#" tabindex="-1" @click="getPreviousPage">Prev</a>
                </li>
                <li v-else class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" @click="getPreviousPage">Prev</a>
                </li>

                <li v-if="nxt_url!=null" class="page-item">
                  <a class="page-link" href="#" @click="getNextPage">Next</a>
                </li>
                <li v-else class="page-item disabled">
                  <a class="page-link" href="#" @click="getNextPage">Next</a>
                </li>
              </ul>
          </nav>
      
        </div>


        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Bootstrap Test</h4>
              <p class="card-category">this is just a test</p>
            </template>
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">NAME</th>
                <th scope="col">PUB DATE</th>
                <th scope="col">RATING</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movie in movie_list" :key="movie.url">
                <td><a :href=movie.douban_url>url</a></td>
                <td>{{ movie.name }}</td>
                <td>{{ movie.pub_date }}</td>
                <td>{{ movie.rating_val }}</td>
              </tr>
            </tbody>
          </table>
          </card>
        </div>

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Table on Plain Background</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="tableColumns"
                       :data="tableData">
              </l-table>
            </div>
          </card>
        </div>

        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Small table</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <l-table class="table-hover table-striped table-sm"
                     :columns="tableColumns"
                     :data="tableData">
            </l-table>
          </card>

        </div> -->

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import axios from 'axios'

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        movie_api: 'http://127.0.0.1:8000/douban/movie/?ordering=-create_date&page=1',
        // tableColumns: ['name', 'pub_date', 'rating_val', 'operation'],
        movie_list: null,
        nxt_url: null,
        pre_url: null,
        num_movie: 0,
        num_page: 0,
      }
    },
    methods: {
      getAll() {
        axios.get(this.movie_api)
          .then(res => {
            this.movie_list = res.data.results
            this.num_movie = res.data.count
            this.pre_url = res.data.previous
            this.nxt_url = res.data.next
            this.num_page = Math.ceil(this.num_movie / 10)
          });
      },
      getNextPage() {
        this.movie_api = this.nxt_url
        this.getAll()
      },
      getPreviousPage() {
        this.movie_api = this.pre_url
        this.getAll()
      }
    },
    mounted() {
      this.getAll()
      console.log(this.num_page)
    }
  }
</script>
<style>
</style>
