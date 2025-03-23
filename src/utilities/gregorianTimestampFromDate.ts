export default function gregorianTimestampFromDate(date: Date): number {
  const gregorianSecondsFrom1970To0001 = 62135596800;

  const unixTimestamp = date.getTime();
  const unixSeconds = Math.round(unixTimestamp / 1000);

  return unixSeconds + gregorianSecondsFrom1970To0001;
}
