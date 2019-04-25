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
import { FilterableGroup } from '../components'
import { performanceStart, performanceEnd } from './performance'

const FILTERABLE_GROUP = 'props.filterable-group'
const FILTERABLE_STICKY = 'props.filterable-sticky'
const FILTERABLE_IGNORE = 'props.filterable-ignore'

export class FilterEngine {
  #filterResultCache = new Map()
  #filterKeywordCache = []
  #prevKeyword = ''
  #prevResult = []
  #storageKey = ''
  #config={
    maxCache: 30,
    displayPerformanceLog: true,
    highlightResult: true,
    highlightStyle: {
      background: '#fff542',
      display: 'inline',
      padding: '2px 0'
    }
  }
  #highlighter = '';

  constructor(userConfig) {
    this.setConfig(userConfig)
    this.#highlighter = new Highlighter(this.#config)
  }

  setConfig(userConfig) {
    this.#config = { ...this.#config, ...userConfig }
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

    // console.log(children);
    // console.log(result);
    if(this.#config.displayPerformanceLog){
      performanceEnd()
    }

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

  #isIncludeText = (text, keyword) => {
    if (typeof text === 'string' && typeof keyword === 'string') {
      return text.toLowerCase().includes(keyword.toLowerCase())
    }
  }

  #isContainKeyword = (componentKeyword, keyword) => {
    if (typeof componentKeyword === 'string' && typeof keyword === 'string') {
      return componentKeyword.toLowerCase().includes(keyword.toLowerCase())
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
          } else {
            nodeKeyword = `${nodeKeyword} ${getValue(value, 'props.keyword') || ''} ${getValue(reactNode, 'props.alt') || ''}`
            let result = this.#extractText(getValue(value, 'props.children'), nodeText, nodeKeyword)
            nodeText = result.nodeText
            nodeKeyword = result.nodeKeyword
          }
        })
      } else if (typeof reactNode === 'string') {
        nodeText = `${nodeText} ${reactNode}`
      } else {
        nodeKeyword = `${nodeKeyword} ${getValue(reactNode, 'props.keyword') || ''} ${getValue(reactNode, 'props.alt') || ''}`
        let result = this.#extractText(getValue(reactNode, 'props.children'), nodeText, nodeKeyword)
        nodeText = result.nodeText
        nodeKeyword = result.nodeKeyword
      }
    }
    return { nodeText, nodeKeyword }
  }

  /**
   * @param {number} a - this is a value.
   * @param {number} b - this is a value.
   * @return {number} result of the sum value.
   */
  #processChildren = ({reactNode, parentNode, keyword, result}) => {
    let children = getValue(reactNode, 'props.children')
    let componentKeyword = `${getValue(reactNode, 'props.keyword') || ''} ${getValue(reactNode, 'props.alt') || ''}`

    if (typeof reactNode === 'string' && parentNode) {
      let parentKeyword = `${getValue(parentNode, 'props.keyword') || ''} ${getValue(parentNode, 'props.alt') || ''}`

      this.#shouldIncluded(reactNode,
        parentKeyword,
        keyword,
        getValue(parentNode, FILTERABLE_STICKY)) &&
        result.push(this.#highlighter.injectHighlight(parentNode, keyword))
    } else if (getValue(reactNode, 'type') === FilterableGroup || getValue(reactNode, FILTERABLE_GROUP)) {
      let { nodeText, nodeKeyword } = this.#extractText(reactNode)
      this.#shouldIncluded(nodeText,
        nodeKeyword,
        keyword,
        getValue(reactNode, FILTERABLE_STICKY)) &&
        result.push(this.#highlighter.injectHighlight(reactNode, keyword))
    } else if (typeof children === 'string') {
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
