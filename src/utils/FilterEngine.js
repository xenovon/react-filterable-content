/**
 * Copyright (c) Adnan Hidayat P
 * komputok@gmail.com, http://adnanhidayat.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Fragment } from 'react';
import { getValue } from './getValue'
import { Highlighter } from './Highlighter'
import { performanceStart, performanceEnd } from './performance'
import { toLowerCase } from './toLowerCase'
import { FILTERABLE_GROUP, FILTERABLE_STICKY, FILTERABLE_IGNORE } from './constant'


export const defaultConfig = {
  maxCache: 30,
  displayPerformanceLog: false,
  highlightResult: true,
  caseSensitive: false,
  highlightStyle: {
    background: '#fff542',
    display: 'inline',
    padding: '2px 0'
  }
}

export class FilterEngine {
  #filterResultCache = new Map()
  #filterKeywordCache = []
  #prevKeyword = ''
  #prevResult = []
  #config=defaultConfig
  #highlighter = '';

  constructor(userConfig) {
    this.setConfig(userConfig)
    this.#highlighter = new Highlighter(this.#config)
  }

  setConfig(userConfig) {
    this.#config = { ...this.#config, ...userConfig }
  }

  getConfig() {
    return this.#config
  }

  filterChildren({children, keyword}) {

    if(this.#config.displayPerformanceLog){
      performanceStart('Filter Engine')
    }
    let result

    if (!keyword) {
      return children
    }
    this.#highlighter.resetIteration();
    
    if (keyword === this.#prevKeyword) {
      result = this.#prevResult
    } else if (this.#filterResultCache && this.#filterResultCache.get && this.#filterResultCache.get(keyword)) {
      result = this.#filterResultCache.get(keyword)
    } else {
      result = this.#transverseNode(children, keyword)

      this.#addFilterCache(keyword, result);
    }

    if(this.#config.displayPerformanceLog){
      performanceEnd()
    }

    this.#prevResult = result
    this.#prevKeyword = keyword

    return result
  }

  #addFilterCache = (keyword, result) => {
    this.#filterResultCache.set(keyword, result)
    this.#filterKeywordCache.push(keyword)

    if (this.#filterResultCache.size > this.#config.maxCache) {
      let shiftedKeyword = this.#filterKeywordCache.shift()
      this.#filterResultCache.delete(shiftedKeyword)
    }
  }

  #hasIgnoreFlag = node => {
    if(node && getValue(node, FILTERABLE_IGNORE)){
      return true
    }
    return false
  }

  #isIncludeText = (text, keyword) => {
    if (typeof text === 'string' && typeof keyword === 'string') {
      return toLowerCase(text, this.#config).includes(toLowerCase(keyword, this.#config))
    }
  }

  #isContainKeyword = (componentKeyword, keyword) => {
    if (typeof componentKeyword === 'string' && typeof keyword === 'string') {
      return toLowerCase(componentKeyword, this.#config).includes(toLowerCase(keyword, this.#config))
    }
  }

  #shouldIncluded = (text, componentKeyword, keyword, isSticky) => {
    return (this.#isIncludeText(text, keyword) || this.#isContainKeyword(componentKeyword, keyword) || isSticky)
  }

  #extractText = (reactNode, nodeText = '', nodeKeyword = '') => {
    if (reactNode) {
      if (reactNode.forEach) {
        reactNode.forEach((value) => {
          if (typeof value === 'string') {
            nodeText = `${nodeText} ${value}`
          } else if(!this.#hasIgnoreFlag(value)){
            nodeKeyword = `${nodeKeyword} ${getValue(value, 'props.keyword') || ''} ${getValue(reactNode, 'props.alt') || ''}`
            let result = this.#extractText(getValue(value, 'props.children'), nodeText, nodeKeyword)
            nodeText = result.nodeText
            nodeKeyword = result.nodeKeyword              
          }
        })
      } else if (typeof reactNode === 'string') {
        nodeText = `${nodeText} ${reactNode}`
      } else if(!this.#hasIgnoreFlag(reactNode)){
        nodeKeyword = `${nodeKeyword} ${getValue(reactNode, 'props.keyword') || ''} ${getValue(reactNode, 'props.alt') || ''}`
        let result = this.#extractText(getValue(reactNode, 'props.children'), nodeText, nodeKeyword)
        nodeText = result.nodeText
        nodeKeyword = result.nodeKeyword         
      }
    }
    return { nodeText, nodeKeyword }
  }

  /**
   * 
   *
   */
  #processChildren = ({reactNode, parentNode, keyword, result}) => {
    let children = getValue(reactNode, 'props.children')
    let componentKeyword = `${getValue(reactNode, 'props.keyword') || ''} ${getValue(reactNode, 'props.alt') || ''}`

    if (typeof reactNode === 'string' && parentNode) {
      let parentKeyword = `${getValue(parentNode, 'props.keyword') || ''} ${getValue(parentNode, 'props.alt') || ''}`

      !this.#hasIgnoreFlag(parentNode) &&
      this.#shouldIncluded(reactNode,
        parentKeyword,
        keyword,
        getValue(parentNode, FILTERABLE_STICKY)) &&
      result.push(this.#highlighter.injectHighlight(parentNode, keyword))
    } else if (getValue(reactNode, FILTERABLE_GROUP)) {
      let { nodeText, nodeKeyword } = this.#extractText(reactNode)

      !this.#hasIgnoreFlag(reactNode) &&
      this.#shouldIncluded(nodeText,
        nodeKeyword,
        keyword,
        getValue(reactNode, FILTERABLE_STICKY)) &&
      result.push(this.#highlighter.injectHighlight(reactNode, keyword))
    } else if (typeof children === 'string') {

      !this.#hasIgnoreFlag(reactNode) &&
      this.#shouldIncluded(children,
        componentKeyword,
        keyword,
        getValue(reactNode, FILTERABLE_STICKY)) &&
      result.push(this.#highlighter.injectHighlight(reactNode, keyword))
    } else {
      let innerResult = []
      innerResult = this.#transverseNode(children, keyword, innerResult)
      if (innerResult && innerResult.length) {
        let props = reactNode.props
        let newNode = { ...reactNode, props: { ...props, children: innerResult } }

        result.push(newNode)
      }
    }
  }

  #transverseNode = (reactNode, keyword, result = []) => {
    if (reactNode) {
      if (reactNode.forEach) {
        reactNode.forEach((value) => {
          this.#processChildren({reactNode: value, parentNode: reactNode, keyword, result})
        })
      } else {
        this.#processChildren({reactNode, keyword, result})
      }
    }

    return result
  }
}
