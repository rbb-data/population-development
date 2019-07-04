import React from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import CircleMarker from '../CircleMarker/CircleMarker'
import { featureToLatLng } from '../../shared/lib/geoJsonCompat'
import { red, bordeaux } from '../../shared/styles/colors.sass'
import MarkerClusterGroup from '../MarkerClusterGroup/MarkerClusterGroup'
import _ from './Markers.module.sass'

function getSize (childCount) {
  const radius = childCount * 0.5
  if (radius < 10) return 10
  if (radius > 48) return 48

  return radius
}

function getOpacity (childCount) {
  const opacity = childCount * 0.02
  if (opacity < 0.1) return 0.2
  if (opacity > 0.8) return 0.8

  return opacity
}

// const red = '#699b32'
// const bordeaux = '#1e5a3a'
// const red = '#5f5f5f'
// const bordeaux = '#000'

function createClusterIcon (cluster) {
  const childCount = cluster.getChildCount()
  const size = getSize(childCount)

  return L.divIcon({ html:
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r="${size}"
        fill="${red}"
        fill-opacity="${getOpacity(childCount)}"
        stroke-opacity="1"
        stroke-width="2"
        stroke='${bordeaux}' />
        <text x="50" y="50" text-anchor="middle" dx="-0.03em" dy=".35em" class="${_.circleText}">
          ${childCount > 24 ? childCount : ''}
        </text>
    </svg>`,
  iconSize: [50, 50],
  className: _.divIcon
  })
}

export default function Markers (props) {
  const { markers } = props

  return <MarkerClusterGroup
    maxClusterRadius={5}
    zoomToBoundsOnClick={false}
    showCoverageOnHover={false}
    disableClusteringAtZoom={16}
    iconCreateFunction={createClusterIcon}>
    {markers.map(marker =>
      <CircleMarker
        key={marker.properties.id}
        center={featureToLatLng(marker)}
        radius={1}
        interactive={false}
        weight={1}
        color={bordeaux}
        fillColor={bordeaux}
        fillOpacity={1}
      />
    )}
  </MarkerClusterGroup>
}

Markers.propTypes = {
  /* array of geojson features */
  markers: PropTypes.array
}
