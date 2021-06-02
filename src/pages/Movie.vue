<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
            <nav>
              <ul class="pagination justify-content-end">
                <li v-if="prevUrl!=null" class="page-item">
                  <a class="page-link" href="#" tabindex="-1" @click="getPreviousPage">Prev</a>
                </li>
                <li v-else class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" @click="getPreviousPage">Prev</a>
                </li>

                <li v-if="nextUrl!=null" class="page-item">
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
                <th scope="col">GENRE</th>
                <th scope="col">RATING</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movie in movieList" :key="movie.url">
                <td><a :href=movie.douban_url>url</a></td>
                <td>{{ movie.name }}</td>
                <td>{{ movie.genre }}</td>
                <td>{{ movie.rating_val }}</td>
                <td><button @click="getDetail(movie.id)">detail</button></td>
              </tr>
            </tbody>
          </table>
          </card>
        </div>

        <!-- <div class="col-12">
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
        movieApi: 'http://127.0.0.1:8000/douban/movie/',
        movieList: {},
        nextUrl: null,
        prevUrl: null,
        numMovie: 0,
        numPage: 0,
        nowPage: 1,
      }
    },
    methods: {
      getAll() {
        axios.get(this.movieApi, {
          params: {
            ordering: '-create_date',
            page: this.nowPage
          }
        })
          .then(res => {
            this.movieList = res.data.results;
            this.numMovie = res.data.count;
            this.prevUrl = res.data.previous;
            this.nextUrl = res.data.next;
            this.numPage = Math.ceil(this.numMovie / 10);
          });
      },
      getNextPage() {
        this.nowPage += 1;
        this.getAll();
      },
      getPreviousPage() {
        this.nowPage -= 1;
        this.getAll();
      },
      getDetail(movieId) {
        this.$router.push({
          path: '/movie/detail/',
          query: {
            movie_id: movieId
          }
        })
      }
    },
    mounted() {
      this.getAll();
      // console.log(this.numPage);
    }
  }
</script>
<style>
</style>
