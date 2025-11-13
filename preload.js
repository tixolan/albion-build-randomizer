const { contextBridge, ipcRenderer } = require('electron');

let indexBridge = {
    getItemData: async () => {
        return ipcRenderer.invoke('getItemData')
    }
}

contextBridge.exposeInMainWorld('indexBridge', indexBridge);