export default function gregorianTimestampToDate(timestamp: number): Date {
  const date = new Date();
  date.setUTCFullYear(1, 0, 1);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCSeconds(timestamp);
  return date;
}
