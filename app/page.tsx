import styles from './page.module.css'
import GroupCheckBox from '@/components/GroupCheckBox'
import { ChartBox } from '@/components/ChartBox'

export default function Home() {
  return (
    <main className={styles.main}>
      <GroupCheckBox/>
      <div className={styles.description}>
        <ChartBox prefectureName="愛知県" />
      </div>
    </main>
  )
}
