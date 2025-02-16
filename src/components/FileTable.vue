<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { usePathTreeStore, DEV_HOST } from '../stores/pathTree'
import { type TableRow } from '../types'
import { Delete, Download, Back } from '@element-plus/icons-vue'


const store = usePathTreeStore();
// generate table rows
const tableData = computed<TableRow[]>(() => {
  return [
    ...store.pathTreeObj.dirs.map(dir => ({
      name: dir.name,
      type: 'dir',
      mtime: dir.mtime
    })),
    ...store.pathTreeObj.files.map(file => ({
      name: file.name,
      type: 'file',
      size: file.size,
      mtime: file.mtime
    }))
  ];
});
onMounted(() => {
  store.update();
});

function backToParentDir() {
  if (store.pathTreeObj.currentDir === store.ROOT_PATH) {
    return;
  }
  // get parent dir path
  const pathArray = store.pathTreeObj.currentDir.split("/");
  pathArray.pop();
  let parentPath = pathArray.join('/')
  // jump to
  store.update(parentPath)
}
</script>


<template>
  <h1>File to download</h1>
  Current dir: {{ store.pathTreeObj.currentDir }}
  <el-Button @click="backToParentDir" type="primary" plain :icon="Back" >back to parent dir</el-button>
  <br>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="type" label="Type" width="100" />
    <el-table-column prop="size" label="Size" width="120">
      <template #default="{ row }">
        {{ row.size || '-' }}
      </template>
    </el-table-column>
    <el-table-column prop="mtime" label="Modified Time" width="200">
      <template #default="{ row }">
        {{ row.mtime }}
      </template>
    </el-table-column>
    <el-table-column label="Operation">
      <template #default="{ row }">
        <el-button 
          v-if="row.type === 'dir'" plain 
          @click="store.update(`${store.pathTreeObj.currentDir}/${row.name}`)"
        >open</el-button>
        <el-button v-if="row.type === 'file'" type="primary" plain>
          <a 
            :href="`${DEV_HOST}files?path=${store.pathTreeObj.currentDir}/${row.name}`"
            style="text-decoration: none; color: inherit; display: flex; align-items: center;"
          >
            <el-icon><Download /></el-icon>
          </a>
        </el-button>
        <el-button 
          v-if="row.type === 'file'" type="danger" 
          :icon="Delete" plain
          @click="store.delete(`${store.pathTreeObj.currentDir}/${row.name}`)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
</style>
