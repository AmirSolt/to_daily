
export interface Report{
  x:number
  y:number
  hour:number
  neighborhood:string
  crimeType:string
  locationType:string
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
  autoTheft:CrimeTypes.autoTheft,
  breakAndEnter:CrimeTypes.breakAndEnter,
}
