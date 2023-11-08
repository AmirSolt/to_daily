
export interface ColorScheme {
  bgColor:string
  textColor:string
}
export interface FontScheme{
  size:string
  other:string
}


export const titleFont:FontScheme = {
  size:"text-5xl",
  other:"font-bold leading-relaxed",
}

export const subTitleFont:FontScheme = {
  size:"text-3xl",
  other:"",
}

export const footerFont:FontScheme = {
  size:"text-lg",
  other:"",
}

export const primary:ColorScheme = {
  bgColor:"bg-red-400",
  textColor:"text-slate-100",
}

export const secondary:ColorScheme = {
  bgColor:"bg-slate-100",
  textColor:"text-slate-800",
}

export const tertiary:ColorScheme = {
  bgColor:"bg-slate-800",
  textColor:"text-slate-100",
}

