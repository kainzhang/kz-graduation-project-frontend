<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto">
          <div class="card">
            <div class="header text-center">
              <h4 class="title">由此进入系统后台管理</h4>
              <p class="category">Click the button below and enter the admin system</p>
              <br>
            </div>
            <div class="content table-responsive table-upgrade">
              <table class="table">

                <tbody>
                <tr class="last-row">
                  <td></td>
                  <td>
                    <a href="http://localhost:6800" class="upgrade-table-btn btn btn-b btn-round btn-fill btn-primary">Scrapy Client</a>
                  </td>
                  <td>
                    <a target="_blank" href="http://localhost:8000/admin" class="upgrade-table-btn btn btn-round btn-fill btn-success">Admin System</a>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="scss">
  .upgrade-table-btn {
    width: 160px;
    &:first-child {
      margin-right: 10px;
    }
  }
</style>
