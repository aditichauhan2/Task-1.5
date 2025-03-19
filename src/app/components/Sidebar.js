import Link from "next/link";
import { FaHome, FaClipboardList } from "react-icons/fa";
import styles from "@/app/styles/Sidebar.module.css"; // Correct import path

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <Link href="/">
        <div className={styles.iconContainer}>
          <FaHome className={styles.icon} />
          <span className={styles.text}>Home</span>
        </div>
      </Link>
      <Link href="/applied">
        <div className={styles.iconContainer}>
          <FaClipboardList className={styles.icon} />
          <span className={styles.text}>Applied Jobs</span>
        </div>
      </Link>
    </nav>
  );
}
