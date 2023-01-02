const dateCalc = (date) => {
  const now = new Date(Date.now());
  const createdAt = new Date(date);
  const timeDiff = new Date(now - createdAt);
  if (timeDiff.getDate() >= 365) {
    return `asked ${Math.floor(timeDiff.getDate() / 365)} years ago`;
  } 
  else if (timeDiff.getDate() > 1) {
    return `asked ${timeDiff.getDate()} days ago`;
  } 
  else {
    return `asked ${timeDiff.getHours()} hours ago`;
  }
};

export default dateCalc;