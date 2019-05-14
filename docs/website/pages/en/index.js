/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')
const CompLibrary = require('../../core/CompLibrary.js')
const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const { FilterableContent } = require('react-filterable-content')

class PreviewContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    console.log(event)
    if (event && event.target) {
      const { value } = event.target
      this.setState({keyword: value})
    }
  }

  render () {
    let { keyword } = this.state
    return (
      <div>
        <input
          type={'text'}
          value={keyword}
          placeholder={'input keyword'}
          onChange={this.onChange}
        />

        <FilterableContent
          keyword={keyword}
        >
          <p>First Content Here</p>
          <p>Second Content Here</p>
          <p>Third Content Here</p>
        </FilterableContent>
      </div>
    )
  }
}

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props
    const {baseUrl, docsUrl} = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className='homeContainer'>
        <div className='homeSplashFade'>
          <div className='wrapper homeWrapper'>{props.children}</div>
        </div>
      </div>
    )

    const ProjectTitle = () => (
      <h2 className='projectTitle'>
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    )

    const PromoSection = props => (
      <div className='section promoSection'>
        <div className='promoRow'>
          <div className='pluginRowBlock'>{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className='pluginWrapper buttonWrapper'>
        <a className='button' href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    )

    return (
      <SplashContainer>
        <div className='inner'>
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href='/demo'>Demo</Button>
            <Button href={docUrl('documentation.html')}>Documentation</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props
    const {baseUrl} = siteConfig

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} l anguage={language} />
        <div className='mainContainer'>
          <div className='previewContainer'>
            <h1>Preview</h1>
            <PreviewContent />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Index
