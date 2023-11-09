
export function getDateStr(date:Date, isMonthShort:boolean=false):string{
  const day = date.getDay();
  const monthName = date.toLocaleString('default', { month: 'long' });
  return `${monthName} ${day}`
}