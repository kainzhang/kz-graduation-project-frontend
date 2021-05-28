<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">已收录的书籍</h4>
              <p class="card-category">所有的信息都来自豆瓣官网</p>
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
              <tr v-for="book in books" :key="book.url">
                <td><a :href=book.douban_url>url</a></td>
                <td>{{ book.name }}</td>
                <td>{{ book.pub_date }}</td>
                <td>{{ book.rating_val }}</td>
              </tr>
            </tbody>
          </table>
          </card>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import axios from 'axios'
import DashboardLayout from '../layout/DashboardLayout.vue'

  export default {
    components: {
      LTable,
      Card,
        DashboardLayout
    },
    data () {
      return {
        book_api: 'http://127.0.0.1:8000/douban/book/?ordering=-create_date',
        // tableColumns: ['name', 'pub_date', 'rating_val', 'operation'],
        books: null
      }
    },
    created() {
      this.getAll()
    },
    methods: {
      getAll() {
        axios.get(this.book_api)
          .then(res => {
            this.books = res.data.results
          });
      }
    },
    mounted() {
      this.getAll()
    }
  }
</script>
<style>
</style>
