<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

import { usePathTreeStore, DEV_HOST} from '../stores/pathTree'
const store = usePathTreeStore()
</script>


<template>
  <el-upload
    class="upload-demo"
    drag
    :action="`${DEV_HOST}files?target_dir=${store.pathTreeObj.currentDir}`"
    multiple
    :on-success="store.refresh"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
  </el-upload>
</template>

<style scoped>
</style>
