import React from 'react'
import { FilterEngine, defaultConfig } from '../FilterEngine'

/*
 * Test if filter engine exist
 */

describe('FilterEngine', () => {
  it('is truthy', () => {
    expect(FilterEngine).toBeTruthy()
  })
})

/*
 * Test ability to merging config object, merging from constructor,
 * and merging from setConfig method.
 *
 */

describe('Test ability to merging config object', () => {
  const mockConfig = {
    maxCache: 50,
    displayPerformanceLog: true,
    highlightStyle: {
      background: '#fff662',
      display: 'block',
      padding: '2px 2'
    }
  }

  it('Can merge from constructor', () => {

    const filter = new FilterEngine(mockConfig)

    const configTruth = { ...defaultConfig, ...mockConfig}

    expect(filter.getConfig()).toEqual(configTruth)
  })

  it('Can merge from setConfig', () => {
   
    const filter = new FilterEngine()

    filter.setConfig(mockConfig)

    const configTruth = { ...defaultConfig, ...mockConfig}

    expect(filter.getConfig()).toEqual(configTruth)
  })
})

/*
 * Test ability to filter simple child component based on keyword
 */


/*
 * Test filterable-group functionality
 */

/*
 * Test filterable-ignore functionality
 */

/*
 * Test filterable-sticky functionality
 */
