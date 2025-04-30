function convertTo12Hour(timeStr) {
  const [hourStr, minute] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12; // convert 0 to 12 for midnight
  return `${hour}:${minute} ${ampm}`;
}

export default convertTo12Hour;
