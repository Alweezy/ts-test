import { httpGet } from './mock-http-interface';

type TResult  = []

type TResults = any

/**
 * Used to retrueve ArniQuotes from a list of urls
 * @param {string[]} urls -- a list of urls pinged for data
 * @return [{ ["Arnie Quote" || "FAILURE"]: message }] results -- A list of responses from the urls
 */
export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const promises = urls.map( url  => httpGet(url));

  const data = await Promise.all(promises);
  let results: TResults = []
  data.map(result => {
    const response = JSON.parse(result.body)

    // there are only 2 status codes: 200 & 500
    // Format the expected output based on these.
    if (result.status == 200) {
      results.push({"Arnie Quote": `${response.message}`})
    } else {
      results.push({"FAILURE": `${response.message}`})
    }
  });
  return results;
};
