export default async function fetchPrefectures() {

    const API_KEY = process.env.RESAS_API_KEY as string;
    const API_ENDPOINT = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';

    const response = await fetch(API_ENDPOINT, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    const data = await response.json();
    return data;
  }