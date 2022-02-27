<template>
    <div class="container my-2">
        <table class="table">
            <tr>
                <th width="25px">#</th>
                <th width="65%">Account</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            <tr>
                <td>1</td>
                <td>
                    <b>Mark Gaberiya</b><br />
                    <small><i>Mark&nbsp;Gaberiya@gmail.com</i></small>
                </td>
                <td>
                    <span class="text-dark">Memeber</span><br>
                    <span class="text-success">Staff</span><br>
                    <span class="text-danger">Owner</span>
                </td>
                <td>
                    <a class="btn text-danger py-0 mx-1"><i class="fa-solid fa-trash-can"></i></a>
                    <router-link :to="'/customer/1/view'" class="btn text-primary py-0 mx-1" ><i class="fa-solid fa-pen-to-square"></i></router-link>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>
                    <b>Mark Gaberiya</b><br />
                    <small><i>Mark&nbsp;Gaberiya@gmail.com</i></small>
                </td>
                <td>
                    <span class="text-dark">Memeber</span><br>
                    <span class="text-success">Staff</span><br>
                    <span class="text-danger">Owner</span>
                </td>
                <td>
                    <a class="btn text-danger py-0 mx-1"><i class="fa-solid fa-trash-can"></i></a>
                    <router-link :to="'/customer/1/view'" class="btn text-primary py-0 mx-1" ><i class="fa-solid fa-pen-to-square"></i></router-link>
                </td>
            </tr>
        </table>
        <div>
            <div class="form-group d-md-flex my-3">
                <div class="col-md-4"><label for="">Fullname: </label></div>
                <div class="col-12 col-md-8">
                    <input type="text" class="form-control" value="ismail" placeholder="fullname" />
                </div>
            </div>
            <div class="d-flex justify-content-end mx-3 px-3">
                <button type="button" class="btn btn-outline-success">Create</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Customers",
};
</script>
<style scoped>
.table>:not(:first-child){
    border:0;
}
</style>