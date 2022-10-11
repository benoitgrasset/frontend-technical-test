import moment from "moment";

const dateFormat = "MMMM D";

/**
 *
 * @param timeStamp - number (en ms)
 * @param format - string
 * @returns
 */
export const convertTimeStamp = (timeStamp: number, format?: string) => {
  return moment.unix(timeStamp).format(format || dateFormat);
};

/**
 * @returns timeStamp en secondes
 */
export const getTimeStamp = () => Date.now() / 1000;
