const Invoke = (...args) => {
  return window.electron.ipcRenderer.invoke(...args)
}

export default Invoke
