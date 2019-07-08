import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet/dist/leaflet.css'
import { Map as LeafletMap, ZoomControl, GeoJSON, Rectangle } from 'react-leaflet'
import { BingLayer } from 'react-leaflet-bing'

import berlinMask from '../../data/berlin.geo.json'
import _ from './Map.module.sass'

// TODO:
// add brandenburg as option

/**
 * React leaflet map component in rbb-data style
 * with bing map tiles and berlin borders
 */
const Map = props => {
  const { children, className, bingKey, ...forwardedProps } = props

  function handleZoom (e) {
    const map = e.target
    map.dragging.enable()
  }

  // props used for initial map rendering
  const berlin = {
    center: { lat: 52.5244, lng: 13.4105 },
    bounds: {
      topleft: { lat: 52.57, lng: 13.27 },
      bottomright: { lat: 52.468, lng: 13.53 }
    },
    maxBounds: {
      topleft: { lat: 52.8, lng: 12.9 },
      bottomright: { lat: 52.2, lng: 13.9 }
    }
  }

  const mapProps = {
    animate: true,
    // this is false because ios jumps towards elemts that can have focus when you touch
    // them which makes the page jump
    keyboard: false,
    minZoom: 9,
    maxZoom: 16,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    onZoom: handleZoom,
    zoomSnap: false,
    bounds: [
      [berlin.bounds.bottomright.lat, berlin.bounds.bottomright.lng],
      [berlin.bounds.topleft.lat, berlin.bounds.topleft.lng]
    ],
    maxBounds: [
      [berlin.maxBounds.bottomright.lat, berlin.maxBounds.bottomright.lng],
      [berlin.maxBounds.topleft.lat, berlin.maxBounds.topleft.lng]
    ]
  }

  const mapStyle = 'trs|lv:true;fc:EAEAEA_pp|lv:false;v:false_ar|v:false;lv:false_vg|v:true;fc:E4E4E4_wt|fc:AED1E4_rd|sc:d0d0d0;fc:e9e9e9;lv:false_mr|sc:d3d3d3;fc:dddddd;lv:true_hg|sc:d3d3d3;fc:e9e9e9;lv:true_g|lc:EAEAEA'
  const mapClassName = `${className} ${_.map}`

  return <LeafletMap className={mapClassName} {...mapProps} {...forwardedProps}>
    <BingLayer
      type='CanvasGray'
      bingkey={bingKey}
      culture='de-de'
      // eslint-disable-next-line react/style-prop-object
      style={mapStyle} />

    <GeoJSON
      data={berlinMask}
      interactive={false}
      fillOpacity={0.8}
      color='white'
      stroke={false} />

    {/* <Rectangle bounds={mapProps.bounds} /> */}

    <ZoomControl position='bottomright' />

    {children}
  </LeafletMap>
}

Map.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bingKey: PropTypes.string.isRequired
}

export default Map
