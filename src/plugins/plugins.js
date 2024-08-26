function getDate(date1) {
  // Specify Lithuanian locale
  const date = new Date(date1);
  const lithuanianLocale = "lt-LT";
  if (date) {
    // Format the date to Lithuanian locale
    const litDate = new Intl.DateTimeFormat(lithuanianLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false, // Use 24-hour format
      weekday: "long", // Includes the full name of the weekday
    }).format(date);
    return litDate;
  }
}

module.exports = {
  getDate,
};
