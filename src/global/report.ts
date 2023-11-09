
export interface Report{
  geoPoint:[number,number]
  hour:number
  neighborhood:string
  crimeType:string
  locationType:string
}


export function fetchReports(date:Date):Report[]{

  const reportExample:Report={
    geoPoint : [250,450],
    hour:23,
    neighborhood:"Downtown Yonge East",
    crimeType:"Robbery",
    locationType:"Outside",
  }
  const reportExample2:Report={
    geoPoint : [500,350],
    hour:23,
    neighborhood:"Downtown Yonge East",
    crimeType:"Shooting",
    locationType:"Outside",
  }
  const reportExample3:Report={
    geoPoint : [850,300],
    hour:23,
    neighborhood:"Downtown Yonge East",
    crimeType:"Homicide",
    locationType:"Outside",
  }
  
  const reports:Report[] = [
    reportExample,
    reportExample2,
    reportExample3,
  ]

  return reports
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

// geometry
  // x
  // y

// attributes
  // HOUR
  // NEIGHBOURHOOD_158
  // CRIME_TYPE
  // LOCATION_CATEGORY

