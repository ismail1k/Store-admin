<template>
  <div class="container my-2">
    <table class="table">
      <tr>
        <th>Account</th>
        <th>Role</th>
        <th width="150px">Action</th>
      </tr>
      <tr>
        <td> 
          <b>Mark Gaberiya</b><br>
          <small><i>Mark&nbsp;Gaberiya@gmail.com</i></small>
        </td>
        <td>
          <select class="form-control">
            <option value="" class="text-light bg-dark">Memeber</option>
            <option value="london" class="text-success bg-dark">Staff</option>
            <option value="athens" class="text-danger bg-dark">Owner</option>
          </select>
        </td>
        <td>
          <button class="btn text-danger ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
          <button class="btn text-primary ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
              />
            </svg>
          </button>
        </td>
      </tr>
      <tr>
        <td> 
          <b>Mark Gaberiya</b><br>
          <small><i>Mark&nbsp;Gaberiya@gmail.com</i></small>
        </td>
        <td>
          <select class="form-control">
            <option value="" class="text-light bg-dark">Memeber</option>
            <option value="london" class="text-success bg-dark">Staff</option>
            <option value="athens" class="text-danger bg-dark">Owner</option>
          </select>
        </td>
        <td>
          <button class="btn text-danger ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
          <button class="btn text-primary ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </table>
    <div class="d-flex justify-content-end mx-3 px-3">
      <button type="button" class="btn btn-outline-success">save..</button>
    </div>
    <div>
    <div class="form-group d-md-flex my-3">
                <div class="col-md-4"><label for="">Fullname:  </label></div>
                <div class="col-12 col-md-8">
                    <input type="text" class="form-control" value="ismail" placeholder=" name...." />
                </div>
            </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Customers",
};
</script>