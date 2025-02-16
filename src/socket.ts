import { usePathTreeStore, DEV_HOST } from './stores/pathTree'
import { v4 as uuidv4 } from 'uuid';
import { ElNotification } from 'element-plus'
import {type WSMessage } from './types'

let ws: WebSocket

function getPathDir(path: string) {
  let pathArr = path.split('/')
  pathArr.pop()
  return pathArr.join('/')
}

export function useSocket() {
  if (!ws){
    
    ws = new WebSocket(`${DEV_HOST}ws/${uuidv4()}`.replace(/^http/, 'ws'))

    let store = usePathTreeStore()
    ws.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      let data: WSMessage = JSON.parse(event.data)
      let msg;
      if (data.type === 'upload') {
        if (store.pathTreeObj.currentDir === getPathDir(data.path)) {
          store.refresh()
        }
        msg = `${data.client_ip} uploaded ${data.path}`
      }
      else if (data.type === 'delete') {
        if (store.pathTreeObj.currentDir === getPathDir(data.path)) {
          store.refresh()
        }
        msg = `${data.client_ip} deleted ${data.path}`
      } else if (data.type === 'connect' || data.type === 'disconnect') {
        msg = `${data.client_ip} ${data.type}`
      } else if (data.type === 'download') {
        msg = `${data.client_ip} download ${data.path}`
      }

      ElNotification({
        title: data.type,
        message: msg || data.type,
      })
    });
  }
  return ws
}
