import {
  format,
  isThisYear,
  formatDistanceStrict,
  formatDistanceToNow,
} from "date-fns";

export function formatPostDate(date) {
  console.log({ date });
  const formatShort = format(new Date(Number(date)), "MMMM d").toUpperCase();
  // MARCH 23
  const formatLong = format(
    new Date(Number(date)),
    "MMMM d, yyy"
  ).toUpperCase();
  // FEBRUARY 2, 2019
  // return isThisYear(new Date(Number(date))) ? formatShort : formatLong;
  return "FEBRUARY 2, 2019";
}

export function formatDateToNow(date) {
  let newDate = new Date(Number(date)).toISOString();
  newDate = formatDistanceToNow(new Date(newDate), {
    addSuffix: true,
  }).toUpperCase();
  return newDate;
}

export function formatDateToNowShort(date) {
  // 5 days ago -> 5 days -> ['5', 'days'] -> ['5', 'd'] -> 5d
  // 7 weeks ago -> 7w
  return formatDistanceStrict(new Date(date), new Date(Date.now()))
    .split(" ")
    .map((s, i) => (i === 1 ? s[0] : s))
    .join("");
}
