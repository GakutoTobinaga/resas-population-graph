import React from 'react';
import fetchPrefectures from '@/lib/actions';
import GroupCheckBox from '@/components/GroupCheckBox';

async function MyComponent() {

  // fetchPrefectures 関数をコンポーネント内で定義
  const data = await fetchPrefectures();
  return (
    <div>
        <GroupCheckBox/>
    </div>
  );
}

export default MyComponent;
