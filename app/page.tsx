import styles from './page.module.css'
import GroupCheckBox from '@/components/GroupCheckBox'
import { ChartBox } from '@/components/ChartBox'

export default function Home() {
  return (
    <main className={styles.main}>
      <GroupCheckBox selectedPrefectures={selectedPrefectures} setSelectedPrefectures={setSelectedPrefectures} />
      <div className={styles.description}>
      </div>
    </main>
  )
}
