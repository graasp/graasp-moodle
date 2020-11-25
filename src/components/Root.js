import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ReactGa from 'react-ga'
import { I18nextProvider } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import i18nConfig from '../config/i18n'
import App from './App'
import {
  REACT_APP_GOOGLE_ANALYTICS_ID,
  REACT_APP_GRAASP_APP_ID,
  REACT_APP_GRAASP_DEVELOPER_ID,
  REACT_APP_VERSION
} from '../config/env'
import updateWindowSize from '../actions/windowSize'

ReactGa.initialize(REACT_APP_GOOGLE_ANALYTICS_ID)
ReactGa.ga(
  'send',
  'pageview',
  `/${REACT_APP_GRAASP_DEVELOPER_ID}/${REACT_APP_GRAASP_APP_ID}/${REACT_APP_VERSION}/`
)

const styles = {
  root: {
    flexGrow: 1,
    height: '100%'
  }
}

const Root = ({ classes, context }) => {
  const dispatch = useDispatch()

  function updateSize() {
    const width = window.innerWidth
    dispatch(updateWindowSize(width))
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  })

  return (
    <div className={classes.root}>
      <I18nextProvider i18n={i18nConfig}>
        <App context={context} />
        <ToastContainer />
      </I18nextProvider>
    </div>
  )
}

Root.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string
  }).isRequired
}

const StyledComponent = withStyles(styles)(Root)

export default StyledComponent