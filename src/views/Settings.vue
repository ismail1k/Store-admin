<template>
    <div>
        <div class="form-group d-md-flex my-3">
            <div class="col-md-4"><label for="">Select: </label></div>
            <div class="col-12 col-md-8">
                <select class="form-select" aria-label="Default select example">
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>
        </div>
        <div class="form-group d-md-flex my-3">
            <div class="col-md-4"><label for="">Input: </label></div>
            <div class="col-12 col-md-8">
                <input type="text" class="form-control" value="Input" placeholder="fullname" />
            </div>
        </div>
        <div class="form-group d-md-flex my-3">
                <div class="col-md-4"><label for="">Check box: </label></div>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                <label class="form-check-label" for="flexCheckChecked">
                    Checked checkbox
                </label>
        </div>
        </div>
        <div class="form-group d-md-flex my-3">
                <div class="col-md-4"><label for="">Switch: </label></div>
               <div class="form-check form-switch mt-3">
        <input class="form-check-input" type="checkbox" role="switch"/>
        <label class="form-check-label"  for="flexSwitchCheckDefault" >Switch</label>
      </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Settings',    
}
</script>