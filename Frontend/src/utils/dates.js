import dayjs from "dayjs";

/**
 * Default app dates format
 */
export const DEFAULT_DATE_FORMAT = "DD MMM YYYY hh:mm A"

/**
 * Format a given date to the default app format
 *
 * See https://day.js.org/docs/en/display/format
 */
export const formatDate = (date) => dayjs(date).format(DEFAULT_DATE_FORMAT)