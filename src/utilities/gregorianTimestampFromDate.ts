export default function gregorianTimestampFromDate(date: Date): number {
  const julianSecondsFrom1970To0001 = 62135596800;

  const unixTimestamp = date.getTime();
  const unixSeconds = Math.round(unixTimestamp / 1000);

  return unixSeconds + julianSecondsFrom1970To0001;
}
