import React from 'react'
import ReactDOM from 'react-dom/client'
import MainWindow from './'

console.log(111)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainWindow />
  </React.StrictMode>
)
