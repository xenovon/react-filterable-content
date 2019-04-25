/**
 * Copyright (c) Adnan Hidayat P
 * komputok@gmail.com, http://adnanhidayat.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { getValue } from './getValue'

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
   * @param {number} a - this is a value.
   * @param {number} b - this is a value.
   * @return {number} node with injected highlight.
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
        newChildren = this.#processHighlightText(children, keyword)
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
          {key: this.#iteration},
          [ ...newChildren]
        )
      }
    } else {
      return reactNode
    }
  }

  #processHighlightText = (text='', keyword='') => {

    let childrens = []

    if (typeof text === 'string' && typeof keyword === 'string') {

      let textLowercase = text.toLowerCase();
      let splittedMap = [];

      let fromIndex = 0;
      let i = 0;
      do {
        let indexOf = textLowercase.indexOf(keyword.toLowerCase(), fromIndex)

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
