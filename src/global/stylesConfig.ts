
export interface ColorScheme {
  bgColor:string
  textColor:string
}
export interface FontScheme{
  size:string
  other:string
}


export const titleFont:FontScheme = {
  size:"text-7xl",
  other:"font-bold leading-relaxed",
}
export const headerFont:FontScheme = {
  size:"text-6xl",
  other:"font-bold leading-relaxed",
}
export const bodyFont:FontScheme = {
  size:"text-5xl",
  other:"",
}

export const footerFont:FontScheme = {
  size:"text-4xl",
  other:"",
}

export const primary:ColorScheme = {
  bgColor:"bg-red-500",
  textColor:"text-slate-100",
}

export const secondary:ColorScheme = {
  bgColor:"bg-slate-100",
  textColor:"text-slate-900",
}

export const tertiary:ColorScheme = {
  bgColor:"bg-gray-950",
  textColor:"text-slate-100",
}

