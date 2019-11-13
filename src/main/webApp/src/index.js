import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CssBaseline from '@material-ui/core/CssBaseline';



const Root = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
        
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
