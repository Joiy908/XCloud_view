import { defineStore } from 'pinia'
import axios from 'axios'

import {type PathTree } from '../types'


export const usePathTreeStore = defineStore('pathTree', {
  state: () => ({ 
    pathTreeObj: {
      currentDirName: '.files/Test',
      subFileList: ['demo.png'],
      subFolderList: ['testDir']
    } as PathTree,
    ROOT_PATH: './files' as string,
  }),

  actions: {
    update() {
      axios.get('paths', {
        params:{'dirPath': this.ROOT_PATH}
      })
      .then(
        res => {
          console.log('get path ok!:', res.data);
          this.pathTreeObj = res.data;
        },
        err => {
          console.log('get path err:@@@', err.response.data);
        }
      );
    }
  },
})