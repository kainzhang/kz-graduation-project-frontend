<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <card class="card-user">

            <div align="center" style="padding: 20px">
              <img class="img-fluid" :src="bookCover" :alt="bookData.name" />
            </div>
            <hr>
            <div slot="footer" class="text-center d-flex justify-content-center">
              <a class="btn btn-simple" href="javascript:void(0)" @click="toBookAnalysis()">Analyses</a>
              <a class="btn btn-simple" href="javascript:void(0)">|</a>
              <a class="btn btn-simple" href="javascript:void(0)" @click="toBookComment()">Comments</a>
            </div>
          </card>
        </div>

        <div class="col-md-8">
          <card>
            <template slot="header">
              <h4 class="card-title">图书详情</h4>
              <p class="card-category">The profile of the book</p>
            </template>

            <div class="row">
              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Name</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.name">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Author</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.author">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Press</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.press">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Translator</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.translator">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Pub Date</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.pub_date">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Producer</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.producer">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Subtitle</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.subtitle">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Orig Title</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.original_title">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Series</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.series">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Binding</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.binding">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Paginal Num</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.paginal_num">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">ISBN</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.isbn">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Price</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext detail-input" :value="bookData.price">
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                  <div class="form-group row">
                  <label class="col-sm-2 col-form-label detail-label">Douban</label>
                  <div class="col-sm-10">
                    <textarea type="text" readonly class="form-control-plaintext detail-input" :value="bookData.douban_url" rows="2"></textarea>
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
        bookData: {},
        bookCover: null,
        bookId: '',
      }
    },
    methods: {
      getBookDetail() {
        axios.get('douban/book/', {
          params: {
            search: this.bookId
          }
        }).then(res => {
          this.bookData = res.data.results[0];
          this.bookCover =  'http://localhost:8000/media/img/' + this.bookId + '.jpg'
        })
      },
      toBookComment() {
        this.$router.push({
          path: '/comment/',
          query: {
            douban_id: this.bookId
          }
        })
      },
      toBookAnalysis() {
        this.$router.push({
          path: '/analysis/',
          query: {
            douban_id: this.bookId
          }
        })
      }
    },
    mounted() {
      this.bookId = this.$route.query.book_id;
      this.getBookDetail()
    }
  }

</script>
<style type="text/css">

</style>
