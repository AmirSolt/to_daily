
export function getDateStr(date:Date, isShortHand:boolean) : string {
  const day = date.getDate();
  const month = date.getMonth();

  // Define full months and shorthand months 
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getOrdinalSuffix = (n: number) => { 
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
  }

  if(isShortHand) {
    return `${shortMonths[month]} ${day}${getOrdinalSuffix(day)}`;
  } else {
    return `${fullMonths[month]} ${day}${getOrdinalSuffix(day)}`;
  }
}

export function convertTo12(time: number): string {
  if (time === 0) {
      return `12am`;
  } else if (time < 12) {
      return `${time}am`;
  } else if (time === 12) {
      return `12pm`;
  } else {
      return `${time - 12}pm`;
  }
};