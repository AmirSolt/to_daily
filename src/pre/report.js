
export async function fetchReports(date){
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))
  const dateStr = date.toISOString().split('T')[0]

  const whereStatementUrlified = encodeURIComponent(`OCC_DATE_EST >= date '${dateStr} 00:00:00' and OCC_DATE_EST < date '${dateStr} 11:59:59'`)
  const url = `https://services.arcgis.com/S9th0jAJ7bqgIRjw/ArcGIS/rest/services/YTD_CRIME_WM/FeatureServer/0/query?where=${whereStatementUrlified}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=OCC_DATE_EST&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`

  const response = await fetch(url);
  const reportsRaw = await response.json();

  const reports = reportsRaw['features'].filter(item=>"geometry" in item).map((item)=>{
    const x = item["geometry"]['x']
    const y = item["geometry"]['y']

    return {
      geoPoint:[x,y],
      hour:item["attributes"]["HOUR"],
      neighborhood:item["attributes"]["NEIGHBOURHOOD_158"],
      crimeType:item["attributes"]["CRIME_TYPE"],
      locationType:item["attributes"]["LOCATION_CATEGORY"],
    } 
  })

  return filterByCrimeType(reports)
}

function filterByCrimeType(reports){
  const filteredReports = reports.filter(item=>Object.values(chosenCrimeTypes).includes(item.crimeType))
  return filteredReports
}


export const CrimeTypes = {
  assault: 'Assault',
  autoTheft: 'Auto Theft',
  theftFromVehicle: 'Theft from Motor Vehicle',
  breakAndEnter: 'Break and Enter',
  sexualViolation: 'Sexual Violation',
  robbery: 'Robbery',
  theftOver: 'Theft Over',
  bikeTheft: 'Bike Theft',
  shooting: 'Shooting',
  homicide: 'Homicide',
};

export const chosenCrimeTypes = {
  sexualViolation:CrimeTypes.sexualViolation,
  robbery:CrimeTypes.robbery,
  shooting:CrimeTypes.shooting,
  homicide:CrimeTypes.homicide,
}

// geometry
  // x
  // y

// attributes
  // HOUR
  // NEIGHBOURHOOD_158
  // CRIME_TYPE
  // LOCATION_CATEGORY

