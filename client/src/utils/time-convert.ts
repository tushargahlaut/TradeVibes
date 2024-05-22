import dayjs from 'dayjs';
export const ConvertTime = (timestamp: string): string => {
  const givenTime = dayjs(timestamp);
  const currentTime = dayjs();

  // Calculate the difference in minutes, hours, and days
  const diffInMinutes = currentTime.diff(givenTime, "minute");
  const diffInHours = currentTime.diff(givenTime, "hour");
  const diffInDays = currentTime.diff(givenTime, "day");

  // Determine the appropriate format based on the difference
  let result;
  if (diffInMinutes < 60) {
    result = `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    result = `${diffInHours} hours ago`;
  } else {
    result = `${diffInDays} days ago`;
  }

  return result;
};
