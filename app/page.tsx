"use client"
import styles from './page.module.css'
import GroupCheckBox from '@/components/GroupCheckBox'
import { ChartBox } from '@/components/ChartBox'
import { useState } from 'react';
import TestComponent from '@/components/testcomponent';

export default function Home() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<[string, number][]>([]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <TestComponent/>
      </div>
    </main>
  )
}
