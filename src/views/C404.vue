<template>
  <div>
    <div class="d-flex align-items-center justify-content-center pt-5">
      <div align="center">
        <h1>Error 404</h1>
        <a> The page are you looking for is not exist!</a>
        <div class="mt-3">
            <button class="btn btn-outline-dark" @click="$router.back()"> Return Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'C404',
}
</script>
