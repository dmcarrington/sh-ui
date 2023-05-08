import styles from "../styles/Nostr.module.css";
import { formatDate } from "../utils/time";

function NostrMessage({ content, sender, timestamp, key }) {
  let dtg = new Date();
  dtg.setTime(timestamp * 1000);
  const formattedDate = formatDate(dtg);
  return (
    <div className={styles.message_container}>
      <div className={styles.message_author}>
        <b>From:</b> {sender}
      </div>
      <div className={styles.message_createdat}>
        <b>Posted At:</b> {formattedDate}
      </div>
      <div className={styles.message_content}>{content}</div>
    </div>
  );
}

export default NostrMessage;
