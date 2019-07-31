const Papa = require('papaparse')
const path = require('path')
const fs = require('fs')
const csv = fs.createReadStream(path.join(__dirname, '../data/Einwohner_Berlin.csv'))

var json = require('../src/shared/data/lor_planungsraeume.geo.json')
// console.log(json.features)

Papa.parse(csv, {
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    let features = results.data.map((entry, i) => {
			if (entry.RAUMID.length < 8) entry.RAUMID = '0' + entry.RAUMID
			let obj = json.features.find(feature => feature.properties.spatial_name === entry.RAUMID)
			if (obj) {
				obj.properties.years = {
					'2001': parseInt(entry[2001]), '2002': parseInt(entry[2002]), '2003': parseInt(entry[2003]), '2004': parseInt(entry[2004]), 
					'2005': parseInt(entry[2005]), '2006': parseInt(entry[2006]), '2007': parseInt(entry[2007]), '2008': parseInt(entry[2008]), 
					'2009': parseInt(entry[2009]), '2010': parseInt(entry[2010]), '2011': parseInt(entry[2011]), '2012': parseInt(entry[2012]), 
					'2013': parseInt(entry[2013]), '2014': parseInt(entry[2014]), '2015': parseInt(entry[2015]), '2016': parseInt(entry[2016]),
					'2017': parseInt(entry[2017]), '2018': parseInt(entry[2018])
				}
				return obj 
			}

	
      // return {
      //   type: 'Feature',
      //   properties: {
      //     id: i,
      //     h: 'test',
      //     v: '1'
      //   },
      //   geometry: {
      //     type: 'Point',
      //     coordinates: [
      //       1,
      //       2
      //     ]
      //   }
      // }
    })

    // let seen = {}

    const output = {
      type: 'FeatureCollection',
      features: features
      // // filter out invalid locations
      // .filter(feature => {
      //   return !!feature.geometry.coordinates[0] && !!feature.geometry.coordinates[1]
      // })
      // // filter out duplicates
      // .filter(feature => {
      //   const isDuplicate = seen[feature.properties.id]
      //   seen[feature.properties.id] = true
      //
      //   return !isDuplicate
      // })
		}
		
		console.log(output)

    fs.writeFile(path.join(__dirname, '../public/population-development.geo.json'), JSON.stringify(output), error => {
      if (error === null) {
        console.log('success')
      } else {
        console.error(error)
        process.exit(1)
      }
    })
  }
})
