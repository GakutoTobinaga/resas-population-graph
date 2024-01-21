export async function fetchPrefectures() {
  const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY as string;
  const API_ENDPOINT = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    // レスポンスのステータスコードが成功を示しているか確認
    if (!response.ok) {
      // 成功を示さない場合はエラーをスロー
      throw new Error(`Error: ${response.status}`);
    }
    // レスポンスをJSON形式で解析
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetching prefectures failed:", error.message);
      return { error: error.message };
    }
    console.error("An unexpected error occurred:", error);
    return { error: "An unexpected error occurred" };
  }
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
