<template>
  <div class="container my-2">
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Gmail</th>
        <th>Role</th>
        <th>Handle</th>
      </tr>
      <tr>
        <td>
          <strong> <h5>Mark Gaberiya</h5> </strong>
        </td>
        <td class="fs-5">Mark Gaberiya@gmail.com</td>
        <td>
          <select
            class="select"
            style="
              padding: 10px;
              width: 200px;
              font-size: 16px;
              border: 0;
              border-bottom: 3px solid teal;
            "
          >
            <option value="">-- Select Role --</option>
            <option value="paris" class="text-light bg-dark">Memeber</option>
            <option value="london" class="text-danger bg-dark">Staff</option>
            <option value="athens" class="text-warning bg-dark">Owner</option>
          </select>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-success opacity-100 p-2"
          >
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
          <button
            type="button"
            class="btn btn-outline-danger opacity-100 p-2"
          >
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
        </td>
      </tr>
      <tr>
        <td>
          <strong> <h5>Mark Gaberiya</h5> </strong>
        </td>
        <td class="fs-5">Mark Gaberiya@gmail.com</td>
        <td>
          <select
            class="select"
            style="
              padding: 10px;
              width: 200px;
              font-size: 16px;
              border: 0;
              border-bottom: 3px solid teal;
            "
          >
            <option value="">-- Select Role --</option>
            <option value="paris" class="text-light bg-dark">Memeber</option>
            <option value="london" class="text-danger bg-dark">Staff</option>
            <option value="athens" class="text-warning bg-dark">Owner</option>
          </select>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-success opacity-100 p-2"
          >
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
          <button
            type="button"
            class="btn btn-outline-danger opacity-100 p-2"
          >
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
        </td>
      </tr>
      <tr>
        <td>
          <strong> <h5>Mark Gaberiya</h5> </strong>
        </td>
        <td class="fs-5">Mark Gaberiya@gmail.com</td>
        <td>
          <select
            class="select"
            style="
              padding: 10px;
              width: 200px;
              font-size: 16px;
              border: 0;
              border-bottom: 3px solid teal;
            "
          >
            <option value="">-- Select Role --</option>
            <option value="paris" class="text-light bg-dark">Memeber</option>
            <option value="london" class="text-danger bg-dark">Staff</option>
            <option value="athens" class="text-warning bg-dark">Owner</option>
          </select>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-success opacity-100 p-2"
          >
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
          <button
            type="button"
            class="btn btn-outline-danger opacity-100 p-2"
          >
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
        </td>
      </tr>
    </table>
    <div class="d-flex justify-content-end mx-3 px-3">
      <button type="button" class="btn btn-outline-success">save..</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Customers",
};
</script>