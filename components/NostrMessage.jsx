import styles from '../styles/Nostr.module.css';

function NostrMessage({content, sender, timestamp, key}){
    return (
        <div className={styles.message_container}>
            <div className={styles.message_author}><b>From:</b> {sender}</div>
            <div className={styles.message_createdat}><b>Posted At:</b> {timestamp}</div>
            <div className={styles.message_content}>{content}</div>
        </div>
    );
}

export default NostrMessage