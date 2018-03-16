import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import BlockImage from 'react-block-image'

import placeholder from './placeholder.jpg'
import ribbon from './ribbon.png'
import images from './images'
import styles from './styles.css'

export default class App extends Component {
  state = {
    index: 0,
    backgroundSize: 'cover'
  }

  render () {
    const {
      index,
      backgroundSize
    } = this.state
    const image = images[index]

    const aspectRatio = 16 / 9
    const widthC = Math.min(720 - 32, window.innerWidth)
    const heightC = Math.min(480, window.innerHeight)

    const heightR = widthC / aspectRatio
    const widthR = heightC * aspectRatio

    const width = Math.min(widthC, widthR)
    const height = Math.min(heightC, heightR)

    return (
      <MuiThemeProvider>
        <div>
          <a href='https://github.com/transitive-bullshit/react-block-image'>
            <img
              src={ribbon}
              alt='Fork me on GitHub'
              className={styles.ribbon}
            />
          </a>

          <div
            className={styles.container}
          >
            <div>
              <h3>
                react-block-image demo
              </h3>

              <BlockImage
                className={styles.image}
                src={image.src}
                fallback={placeholder}
                showPreview={true}
                backgroundSize={backgroundSize}
                loader={(
                  <CircularProgress
                    className={styles.loading}
                    color='#fff'
                    size={24}
                    thickness={2.5}
                  />
                )}
                style={{
                  width,
                  height
                }}
              />

              <p>
                Image credit <a href={image.source.userUrl} target='_blank' rel='noopener'>{image.source.user}</a> / <a href={image.source.url} target='_blank' rel='noopener'>{image.source.label}</a>.
              </p>

              <div className={styles.option}>
                <div>
                  Background Size:
                </div>

                <DropDownMenu
                  className={styles.menu}
                  value={backgroundSize}
                  onChange={this._onChangeBackgroundSize}
                >
                  <MenuItem value='cover' primaryText='cover' />
                  <MenuItem value='contain' primaryText='contain' />
                  <MenuItem value='100% 100%' primaryText='stretch' />
                </DropDownMenu>
              </div>

              <div className={styles.actions}>
                <RaisedButton
                  label='Prev'
                  onTouchTap={this._onSelectPrev}
                />

                <RaisedButton
                  label='Next'
                  onTouchTap={this._onSelectNext}
                />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  _onSelectPrev = () => {
    let index = this.state.index - 1
    if (index < 0) index = images.length - 1

    this.setState({ index })
  }

  _onSelectNext = () => {
    let index = this.state.index + 1
    if (index >= images.length) index = 0

    this.setState({ index })
  }

  _onChangeBackgroundSize = (event, index, value) => {
    this.setState({ backgroundSize: value })
  }
}
