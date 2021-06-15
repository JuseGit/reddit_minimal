const time_frame = {
	SECONDS: 'seconds',
	MINUTES: 'minutes',
	HOURS: 'hours',
	DAYS: 'days',
	MONTHS: 'months',
	YEARS: 'years',
}


/**
 *	Gets the time difference between the current date and the date provided.
 *	\return An object containing the time difference in minuts/hours/months/years and a string expressing the time laspe
 */
export function getTimeDiff ( date_utc ) {
	let retVal = {
		name: undefined,
		val: 0,
	}
	const pastDate = new Date ( date_utc * 1000 );

	const curDate = new Date();

	const timeDiff = curDate.getTime() - pastDate.getTime();

	const diff_in_seconds = timeDiff / 1000;
	if( diff_in_seconds < 60 ) {
		retVal.name = time_frame.SECONDS;
		retVal.val = Math.round(diff_in_seconds);
		return retVal;
	}

	const diff_in_minutes =  diff_in_seconds / 60;
	if( diff_in_minutes < 60 ) {
		retVal.name = time_frame.MINUTES;
		retVal.val = Math.round(diff_in_minutes);
		return retVal;
	}

	const diff_in_hours =  diff_in_minutes / 60;
	if( diff_in_hours < 24 ) {
		retVal.name = time_frame.HOURS;
		retVal.val = Math.round(diff_in_hours);
		return retVal;
	}

	const diff_in_days =  diff_in_hours / 24;
	if( diff_in_days < 30 ) {
		retVal.name = time_frame.DAYS;
		retVal.val = Math.round(diff_in_days);
		return retVal;
	}

	const diff_in_months =  diff_in_days / 30;
	if( diff_in_months < 12 ) {
		retVal.name = time_frame.MONTHS;
		retVal.val = Math.round(diff_in_months);
		return retVal;
	}

	retVal.name = time_frame.YEARS;
	retVal.val = Math.round(diff_in_months / 12);

	return retVal;
}


export const getPostedTime = (time_frame) => {
	let posted = "n/a";

	switch (time_frame.name) {
		case "seconds":
			posted = (time_frame.val <= 1) ? `${time_frame.val} second ago` : `${time_frame.val} seconds ago`;
			break;

		case "minutes":
			posted = (time_frame.val <= 1) ? `a minute ago` : `${time_frame.val} minutes ago`;
			break;

		case "hours":
			posted = (time_frame.val <= 1) ? `an hour ago` : `${time_frame.val} hours ago`;
			break;

		case "days":
			posted = (time_frame.val <= 1) ? `a day ago` : `${time_frame.val} days ago`;
			break;

		case "months":
			posted = (time_frame.val <= 1) ? `a month ago` : `${time_frame.val} months ago`;
			break;

		case "years":
			posted = (time_frame.val <= 1) ? `a year ago` : `${time_frame.val} years ago`;
			break;

		default: break;
	}

	return posted;
}


export const format_votes = (n_votes) => {
	let retVal = `${n_votes}`;

	if( !n_votes )
		return "N/A";

	let sliced_str = "";
	const format_str = n_votes.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

	const sliceIndex = format_str.indexOf(".");

	if( format_str[sliceIndex+1] !== "0" ) {
		sliced_str = format_str.slice(0, sliceIndex+2);
	} else {
		sliced_str = format_str.slice(0, sliceIndex);
	}

	if( n_votes > 999 && n_votes < 1000000 ) {
		retVal = `${sliced_str}k`;
	} else if( n_votes >= 1000000 && n_votes < 1000000000 ) {
		retVal = `${sliced_str}m`;
	} else if( n_votes >= 1000000000 ) {
		retVal = "a lot"
	}

	return retVal;
}
