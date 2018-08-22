import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

class MainAppBar extends React.Component {
  /* eslint-disable */
  onHomeIconClick = () => {

  }
  onHomeIconClick = () => {

  }
  loginButtonClick = () => {

  }
  /* eslint-enable */
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="inherit" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography className={classes.flex} type="title" color="inherit">
              G-Node
            </Typography>
            <Button color="inherit" onClick={this.createButtonClick}>
              新建话题
            </Button>
            <Button color="inherit" onClick={this.loginButtonClick}>
              登录
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(MainAppBar)
