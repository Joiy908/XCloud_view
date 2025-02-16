import { defineStore } from 'pinia'
import axios from 'axios'
import { type PathTree } from '../types'

export const DEV_HOST: string = 'http://localhost:8000/'

export const usePathTreeStore = defineStore('pathTree', {
  state: () => ({
    pathTreeObj: {
      currentDir: '.files/Test',
      dirs: [
        { name: 'testDir', mtime: '2025-02-15 12:00:00' },
        { name: 'test', mtime: '2025-02-15 12:05:30' }
      ],
      files: [
        { name: 'testFile', size: '1 KB', mtime: '2025-02-14 18:30:00' },
        { name: 'testFile2', size: '2 MB', mtime: '2025-02-13 08:15:45' }
      ]
    } as PathTree,
    ROOT_PATH: './files' as string,
  }),

  actions: {
    async update(dirPath: string = this.ROOT_PATH) {
      try {
        const res = await axios.get(`${DEV_HOST}dirs`, { params: { 'path': dirPath } })
        console.log('get path ok!:', res.data)
        this.pathTreeObj = res.data
      } catch (err) {
        console.error('get path err:', err.response?.data || err.message)
      }
    },
    async delete(path: string) {
      try {
        const res = await axios.delete(`${DEV_HOST}files`, { params: { 'path': path } })
        console.log('delete path ok!:', res.data)
        this.update()
      } catch (err) {
        console.error('delete path err:', err.response?.data || err.message)
      }
    }
  }
})
