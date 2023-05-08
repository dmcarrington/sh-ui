import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  relayInit,
  signEvent,
} from "nostr-tools";
import styles from "../styles/Nostr.module.css";
import NostrMessage from "./NostrMessage";

const NostrPanel = () => {
  const { accountData } = useContext(AuthContext);

  const [sk, setSk] = useState(() => {
    console.log("nostrSk: " + accountData.nostrSk);
    return accountData.nostrSk;
  });
  const [pk, setPk] = useState(() => {
    console.log("nostrPk: " + accountData.nostrPk);
    return accountData.nostrPk;
  });
  const [relay, setRelay] = useState(null);
  const [pubStatus, setPubStatus] = useState("");
  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [publishMessageContent, setPublishMessageContent] = useState("");

  useEffect(() => {
    const connectRelay = async () => {
      try {
        const relay = relayInit("wss://relay.damus.io");
        await relay.connect();
        relay.on("connect", () => {
          console.log("setting relay: ", relay);
          setRelay(relay);
        });
        relay.on("error", () => {
          console.log("failed to connect");
        });
      } catch (err) {
        console.log(err);
      }
    };

    connectRelay();
  }, []);

  // As soon as we are connected to the relay, subscribe to our group stream
  useEffect(() => {
    console.log("relay: " + relay);
    if (relay && relay.conn) {
      subscribeHiveEvents();
    }
  }, [relay]);

  var event = {
    kind: 1,
    pubkey: pk,
    created_at: Math.floor(Date.now() / 1000),
    tags: [["t", "satoshis_hive"]],
    content: "",
  };

  const publishEvent = (event) => {
    event.content = publishMessageContent;
    console.log(event);
    event.id = getEventHash(event);
    event.sig = signEvent(event, sk);

    const pub = relay.publish(event);
    pub.on("ok", () => {
      setPubStatus("our event is published");
    });
    pub.on("failed", (reason) => {
      setPubStatus(`failed to publish message: ${reason}`);
      console.log(relay);
    });
  };

  // Get our event from relay
  const subscribeHiveEvents = async () => {
    var sub = relay.sub([
      {
        kinds: [1],
        "#t": ["satoshis_hive"],
        //authors: [pk],
      },
    ]);
    if (sub) {
      sub.on("event", (event) => {
        console.log(event);
        let updatedEvents = events;
        updatedEvents.push(event);
        setEvents(updatedEvents);
      });
    }
  };

  // Get all events from relay
  const getEvents = async () => {
    var events = await relay.list([
      {
        kinds: [1],
        "#t": ["satoshis_hive"],
      },
    ]);
    console.log(events);
    setEvents(events);
  };

  return (
    <div>
      <p>Nostr Public key: {pk}</p>
      {relay ? (
        <p>connected to {relay.url}</p>
      ) : (
        <p>Could not connect to relay</p>
      )}
      <div className={styles.container}>
        <div className={styles.post_holder}>
          <input
            id="messageContent"
            onChange={(e) => setPublishMessageContent(e.target.value)}
            value={publishMessageContent}
            className={styles.input}
          ></input>
          <button
            onClick={() => publishEvent(event)}
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            Post Message
          </button>
        </div>
      </div>

      <b>Latest Posts</b>
      {events !== null &&
        events.map((event) => (
          <NostrMessage
            sender={event.pubkey}
            content={event.content}
            timestamp={event.created_at}
            key={event.sig}
          />
        ))}
    </div>
  );
};

export default NostrPanel;
