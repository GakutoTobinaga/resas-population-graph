import styles from './page.module.css'
import GroupCheckBox from '@/components/GroupCheckBox'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <GroupCheckBox/>
      </div>
    </main>
  )
}
