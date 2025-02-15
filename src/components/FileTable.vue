<script setup lang="ts">
import { usePathTreeStore } from '../stores/pathTree'
import { storeToRefs } from 'pinia'

const store = usePathTreeStore();
</script>


<template>
 <div>
    <h1>File to download</h1>
    Current dir: {{ store.pathTreeObj.currentDirName }}
    <button>back to parent dir</button>
    <br>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Operation</th>
        </tr>
        <template v-if="store.pathTreeObj.subFolderList">
          <tr v-for="dirName in store.pathTreeObj.subFolderList" :key="dirName">
            <td>Dir</td>
            <td>{{ dirName }}</td>
            <td>
              <button >open</button>
            </td>
          </tr>
        </template>
      </thead>
      <tbody>
        <tr v-for="fileName in store.pathTreeObj.subFileList" :key="fileName">
          <td>File</td>
          <td>{{ fileName }}</td>
          <td>
            <!-- <a :href="getDownloadUrl(fileName)"> -->
              <button>download</button>
            <!-- </a> -->
          </td>
          <td>
            <button>delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div> 
</template>

<style scoped>
</style>
