<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <card class="card-user">

            <div align="center" style="padding: 20px">
              <img class="img-fluid" :src="movieCover" :alt="movieData.name" />
            </div>
            <hr>
            <p class="description text-center" style="margin-top: 20px">
              {{ movieData.description }}
            </p>
            <div slot="footer" class="text-center d-flex justify-content-center">
              <a :href="movieData.douban_url" class="btn btn-simple">Analysis</a>
              <a href="#" class="btn btn-simple">|</a>
              <a :href="movieData.douban_url" class="btn btn-simple">Comments</a>
            </div>
          </card>
        </div>

        <div class="col-md-8">
          <card>
            <template slot="header">
              <h4 class="card-title">电影详情</h4>
              <p class="card-category">The profile of the movie</p>
            </template>
          
            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Genre</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.genre">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Pub Date</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.pub_date">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Rating</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.rating_val">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">IMDb</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.imdb">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Region</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.region">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Language</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.language">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Director</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.director">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Author</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.author">
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Actor</label>
                  <div class="col-sm-10">
                    <textarea type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.actor" rows="8"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Alias</label>
                  <div class="col-sm-10">
                    <textarea type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.alias" rows="2"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label movie-detail-label">Douban</label>
                  <div class="col-sm-10">
                    <textarea type="text" readonly class="form-control-plaintext movie-detail-input" :value="movieData.douban_url" rows="2"></textarea>
                  </div>
                </div>
              </div>
            </div>

          </card>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import axios from 'axios'

  export default {
    components: {
      Card
    },
    data () {
      return {
        movieApi: 'http://localhost:8000/douban/movie/',
        mediaUrl: 'http://localhost:8000/media/img/',
        movieData: {},
        movieCover: null,
        movieId: '',
      }
    },
    methods: {
      getMovieDetail(movieId) {
        axios.get(this.movieApi, {
          params: {
            search: movieId
          }
        }).then(res => {
          this.movieData = res.data.results[0];
          this.movieCover = this.mediaUrl + movieId + '.jpg'
        })
      }
    },
    mounted() {
      this.movieId = this.$route.query.movie_id;
      this.getMovieDetail(this.movieId)
    }
  }

</script>
<style type="text/css">
  .movie-detail-label{
    line-height: 24px;
    margin-bottom: 0!important;
  }

  .movie-detail-input {
    border-width: 1px!important;
    padding: 6px 10px;
    border-color: #eee;
    border-radius: 8px;
    margin-bottom: 15px!important;
  }

</style>
