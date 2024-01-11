export async function fetchPrefectures() {
  const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY as string;
  const API_ENDPOINT = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

  const response = await fetch(API_ENDPOINT, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchPopulationDataByPref(prefCode: number) {
  const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY as string;
  // 選択された都道府県のcodeを元に検索
  const API_ENDPOINT = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`;

  const response = await fetch(API_ENDPOINT, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  const data = await response.json();
  return data;
}
