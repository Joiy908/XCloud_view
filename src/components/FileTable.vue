<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { usePathTreeStore, DEV_HOST } from '../stores/pathTree'
import { Delete, Download, Back, Document, Folder } from '@element-plus/icons-vue'
import { type TableRow } from '../types'


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
  store.update(store.ROOT_PATH);
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
  <el-text class="mx-1" size="large">
    Current dir: &nbsp;{{ store.pathTreeObj.currentDir }} &nbsp;
            
  </el-text>
  
  <el-Button @click="backToParentDir" type="primary" plain :icon="Back" >back</el-button>
  <br>
  <el-table :data="tableData">
    <el-table-column label="Name" >
      <template #default="{ row }">
        <template v-if="row.type === 'dir'">
          <el-link @click="store.update(`${store.pathTreeObj.currentDir}/${row.name}`)">
            <el-icon><Folder /></el-icon>
            &nbsp;
            {{ row.name }}
          </el-link>
        </template>
        <template v-else>
          <el-link
            :href="`${DEV_HOST}files?path=${store.pathTreeObj.currentDir}/${row.name}`"
          >
            <el-icon><Document /></el-icon>
            &nbsp;
            {{ row.name }}
          </el-link>
        </template>

      </template>
    </el-table-column>
    <el-table-column prop="size" label="Size">
      <template #default="{ row }">
        {{ row.size || '-' }}
      </template>
    </el-table-column>
    <el-table-column prop="mtime" label="Modified Time">
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
