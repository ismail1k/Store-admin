<template>
  <div>
    <div class="d-flex justify-content-end m-3">
      <button type="button" class="btn btn-outline-success">
        Create Product
      </button>
    </div>
    <div class="m-3">
      <!--Starting table-->
      <table class="table table-bordered">
        <tr>
          <th>product</th>
          <th>Description</th>
          <th>Category</th>
          <th>Stocke</th>
          <th>Price</th>

          <th width="150px">Action</th>
        </tr>
        <tr>
          <td>image+product_name</td>
          <td>Description...</td>
          <td>Category 1</td>
          <td>stocke</td>
          <td>100 MAD</td>
          <td align="center">
            <button class="btn btn-danger mx-1">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="btn btn-primary mx-1">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td>product</td>
          <td>Description...</td>
          <td>Category 1</td>
          <td>stocke</td>
          <td>100 MAD</td>
          <td align="center">
            <button class="btn btn-danger mx-1">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="btn btn-primary mx-1">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td>product</td>
          <td>Description...</td>
          <td>Category 1</td>
          <td>stocke</td>
          <td>100 MAD</td>
          <td align="center">
            <button class="btn btn-danger mx-1">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="btn btn-primary mx-1">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
        </tr>
      </table>
      <!--ending table-->
    </div>
    <div class="m-3">
      <div class="form-group d-md-flex">
        <div class="col-md-4"><label for="">Product Name: </label></div>
        <div class="col-12 col-md-8">
          <input
            type="text"
            class="form-control"
            placeholder="Product name...."
          />
        </div>
      </div>
      <div class="input-group mb-3">
        <input type="file" class="form-control" id="inputGroupFile02" />
      </div>
      <div class="form-group d-md-flex">
        <div class="col-md-4"><label for="">Description : </label></div>
        <div class="col-12 col-md-8">
          <input
            type="text"
            class="form-control"
            placeholder="Paste your sescription here...."
          />
        </div>
      </div>
      <div class="form-group d-md-flex">
        <div class="col-md-4"><label for="">Inventory : </label></div>
        <div class="col-12 col-md-8">
          <input
            type="text"
            class="form-control"
            placeholder="Paste your categori here...."
          />
        </div>
      </div>
      <div class="input-group mb-3"  >
        <div class="col-md-4"><label for="">Category : </label></div>
        <select class="form-select" id="inputGroupSelect02">
          <option selected>Choose...</option>
          <option value="1">On stock</option>
          <option value="2">off stock</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currency: "MAD",
    };
  },
  name: "Product-List",
};
</script>
<style scoped>
.table > tr {
  border: 0;
}
</style>