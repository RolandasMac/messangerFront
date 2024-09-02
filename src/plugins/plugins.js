function getDate(value) {
  // Check if the value is a number (timestamp) and convert it to a Date object
  const date =
    typeof value === "string" || typeof value === "number"
      ? new Date(value)
      : value;

  // Format the date to Lithuanian locale
  const lithuanianDate = new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long", // Full month name
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
    weekday: "long", // Includes the full name of the weekday
  }).format(date);

  return lithuanianDate;
}

module.exports = {
  getDate,
};
