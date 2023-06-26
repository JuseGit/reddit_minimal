enum Times {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  MONTHS = "months",
  YEARS = "years",
}

export type TimeDiff = {
  name: string;
  val: number;
};

/**
 *	Gets the time difference between the current date and the date provided.
 *	\return An object containing the time difference in minuts/hours/months/years and a string expressing the time laspe
 */
export function getTimeDiff(date_utc: number): TimeDiff {
  const pastDate = new Date(date_utc * 1000);

  const curDate = new Date();

  const timeDiff = curDate.getTime() - pastDate.getTime();

  const diff_in_seconds = timeDiff / 1000;
  if (diff_in_seconds < 60) {
    return { name: Times.SECONDS, val: Math.round(diff_in_seconds) };
  }

  const diff_in_minutes = diff_in_seconds / 60;
  if (diff_in_minutes < 60) {
    return { name: Times.MINUTES, val: Math.round(diff_in_minutes) };
  }

  const diff_in_hours = diff_in_minutes / 60;
  if (diff_in_hours < 24) {
    return { name: Times.HOURS, val: Math.round(diff_in_hours) };
  }

  const diff_in_days = diff_in_hours / 24;
  if (diff_in_days < 30) {
    return { name: Times.DAYS, val: Math.round(diff_in_days) };
  }

  const diff_in_months = diff_in_days / 30;
  if (diff_in_months < 12) {
    return { name: Times.MONTHS, val: Math.round(diff_in_months) };
  }

  return { name: Times.YEARS, val: Math.round(diff_in_months / 12) };
}

export const getPostedTime = (time_frame: TimeDiff) => {
  let posted = "n/a";

  switch (time_frame.name) {
    case Times.SECONDS:
      posted =
        time_frame.val <= 1
          ? `${time_frame.val} second ago`
          : `${time_frame.val} seconds ago`;
      break;

    case Times.MINUTES:
      posted =
        time_frame.val <= 1 ? `a minute ago` : `${time_frame.val} minutes ago`;
      break;

    case Times.HOURS:
      posted =
        time_frame.val <= 1 ? `an hour ago` : `${time_frame.val} hours ago`;
      break;

    case Times.DAYS:
      posted = time_frame.val <= 1 ? `a day ago` : `${time_frame.val} days ago`;
      break;

    case Times.MONTHS:
      posted =
        time_frame.val <= 1 ? `a month ago` : `${time_frame.val} months ago`;
      break;

    case Times.YEARS:
      posted =
        time_frame.val <= 1 ? `a year ago` : `${time_frame.val} years ago`;
      break;

    default:
      break;
  }

  return posted;
};

export const format_votes = (n_votes: number) => {
  let retVal = `${n_votes}`;

  // NOTE: here the value could be undefined.
  if (!n_votes) return "0";

  let sliced_str = "";
  const format_str = n_votes
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  const sliceIndex = format_str.indexOf(".");

  if (format_str[sliceIndex + 1] !== "0") {
    sliced_str = format_str.slice(0, sliceIndex + 2);
  } else {
    sliced_str = format_str.slice(0, sliceIndex);
  }

  if (n_votes > 999 && n_votes < 1000000) {
    retVal = `${sliced_str}k`;
  } else if (n_votes >= 1000000 && n_votes < 1000000000) {
    retVal = `${sliced_str}m`;
  } else if (n_votes >= 1000000000) {
    retVal = "a lot";
  }

  return retVal;
};
