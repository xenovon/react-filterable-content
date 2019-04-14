/**
 * Copyright (c) Adnan Hidayat P
 * komputok@gmail.com, http://adnanhidayat.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { getValue } from './getValue'

const MAX_CACHE = 30

export class FilterableContent {

  #filterResultCache = new Map()
  #filterKeywordCache = []
  #prevKeyword = ''
  #prevResult = []


  filterChildren = ({children, keyword, isCached}) => {
    if (!keyword) {
      return children
    }

    if (keyword === prevKeyword) {
      return prevResult
    }

    if (filterResultCache.get(keyword)) {
      return filterResultCache.get(keyword)
    }

    let result = transverseChildren(React.Children.toArray(children), keyword)

    addFilterCache(keyword, result)

    return result
  }


  const addFilterCache = (keyword, result) => {
    filterResultCache.set(keyword, result)
    filterKeywordCache.push(keyword)

    if (filterResultCache.size > MAX_CACHE) {
      let shiftedKeyword = filterKeywordCache.shift()
      filterResultCache.delete(shiftedKeyword)
    }
  }

  const isIncludeText = (text, keyword) => {
    if (typeof text === 'string' && typeof keyword === 'string') {
      return text.toLowerCase().includes(keyword.toLowerCase())
    }
  }

  const transverseChildren = (reactChildren, keyword, result) => {
    if (!result) {
      result = []
    }
    if (reactChildren) {
      if (reactChildren.forEach) {
        reactChildren.forEach(value => {
          let children = value.props.children

          if (typeof children === 'string') {
            isIncludeText(children, keyword) && result.push(value)
          } else {
            let innerResult = []

            innerResult = transverseChildren(children, keyword, innerResult)
            if (innerResult) {
              let props = children.props
              let newValue = { ...value, props: { ...props, children: innerResult } }

              result.push(newValue)
            }
          }
        })
      } else {
        let children = getValue(reactChildren, 'props.children')
        isIncludeText(children, keyword) && result.push(reactChildren)
      }
    }

    return result
  }

}