import React from 'react';
import GroupCheckBox from '@/components/GroupCheckBox';
import { fetchPopulationDataByPref } from '@/lib/actions';
async function MyComponent() {

  // fetchPrefectures 関数をコンポーネント内で定義
  const data = await fetchPopulationDataByPref(10);
  const totalPopulationData = data.result.data.find(item => item.label === "総人口");
  console.log(totalPopulationData)
  return (
    <div>
        <GroupCheckBox/>
    </div>
  );
}

export default MyComponent;
