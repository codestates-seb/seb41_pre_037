const dateCalc = (date) => {
  const now = new Date(Date.now());
  const createdAt = new Date(date);
  const hoursDiff = Math.abs(now.getHours() - createdAt.getHours());
  const daysDiff = new Date(now - createdAt).getDate();
  const yearsDiff = Math.abs(now.getFullYear() - createdAt.getFullYear());

  if(yearsDiff > 1) {
    return  yearsDiff === 1 ? `${yearsDiff} year ago` : `${yearsDiff} years ago`;
  } 
  else {
    if(daysDiff > 1) {
      return daysDiff === 1 ? `${daysDiff} day ago` : `${daysDiff} days ago`;
    } 
    else {
      return  hoursDiff === 1 ? `${hoursDiff} hour ago` : `${hoursDiff} hours ago`;
    }
  }

};

export default dateCalc;