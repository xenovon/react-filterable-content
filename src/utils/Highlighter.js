/**
 * Copyright (c) Adnan Hidayat P
 * komputok@gmail.com, http://adnanhidayat.com
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * This class is to add highlight to the string that contain the keyword.
 */

import React from 'react'
import { getValue } from './getValue'
import { toLowerCase } from './toLowerCase'
import { FILTERABLE_IGNORE } from './constant'

export class Highlighter {
  #config={}
  #iteration = 0;

  constructor(config) {
    this.setConfig(config)
  }

  setConfig(config) {
    this.#config = config;
  }

  resetIteration(){
    this.#iteration = 0;
  }

  /**
   * @param {node} reactNode - React node where the highlight will be added
   * @param {string} keyword - keyword for the highlight.
   * @return {node} node with highlight injected.
   */
  injectHighlight = (reactNode, keyword) => {
    this.#iteration++
    if (this.#config.highlightResult) {
      let children = getValue(reactNode, 'props.children')
      let newChildren = []
      let clonedNode = reactNode
      let elementType = 'node' //string, node, non-string-element

      if (typeof reactNode === 'string') {
        newChildren = this.#processHighlightText(reactNode, keyword)
        elementType = 'string'
      } else if (typeof children === 'string') {
          if(this.#hasIgnoreFlag(reactNode)){
            elementType='non-string-element'
          }else{
            newChildren = this.#processHighlightText(children, keyword)
          }
      } else if (children && children.forEach) {
        children.forEach(node => {
          newChildren.push(this.injectHighlight(node, keyword))
        })
      } else {
        elementType='non-string-element'
      }

      if(elementType === 'string'){

        return React.createElement(
          'span',
          {key: this.#iteration},
          [ ...newChildren]
        )
      }else if(elementType === 'non-string-element'){
         return reactNode;
      }else{
        return React.cloneElement(
          clonedNode,
          {key: clonedNode.key || this.#iteration},
          [ ...newChildren]
        )
      }
    } else {
      return reactNode
    }
  }

  #hasIgnoreFlag = node => {
    if(node && getValue(node, FILTERABLE_IGNORE)){
      return true
    }
    return false
  }
  

  #processHighlightText = (text='', keyword='') => {

    let childrens = []

    if (typeof text === 'string' && typeof keyword === 'string') {

      let textLowercase = toLowerCase(text, this.#config);
      let splittedMap = [];

      let fromIndex = 0;
      let i = 0;
      do {
        let indexOf = textLowercase.indexOf(toLowerCase(keyword, this.#config), fromIndex)

        if(indexOf >= 0){
          splittedMap.push([fromIndex, indexOf])
          fromIndex = indexOf + keyword.length;
        }else{
          splittedMap.push([fromIndex, textLowercase.length])
          fromIndex = indexOf;
        }

        i++;

      } while(fromIndex >= 0 && i < 1000)


      for (let i = 0; i < splittedMap.length; i++) {
        let splitter = splittedMap[i]

        childrens.push(text.substring(splitter[0], splitter[1]))

        if (i !== splittedMap.length - 1) {
          childrens.push(React.createElement(
            'span',
            {
              style: this.#config.highlightStyle,
              key: i + '-children'
            },
            text.substring(splitter[1],splitter[1]+keyword.length)
          ))
        }
      }
    }  

    return childrens
  }

}
