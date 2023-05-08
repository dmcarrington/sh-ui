import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    generatePrivateKey,
    getEventHash,
    getPublicKey,
    relayInit,
    signEvent,
  } from "nostr-tools";

const NostrPanel = () => {
  const { accountData } = useContext(AuthContext);

  const [sk, setSk] = useState(() => {
    console.log("nostrSk: " + accountData.nostrSk)
    return accountData.nostrSk;
  });
  const [pk, setPk] = useState(() => {
    console.log("nostrPk: " + accountData.nostrPk)
    return accountData.nostrPk;
  });
  const [relay, setRelay] = useState(null);
  const [pubStatus, setPubStatus] = useState("");
  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState(null);
  const [publishMessageContent, setPublishMessageContent] = useState('')

  useEffect(() => {
    const connectRelay = async () => {
      try {
        const relay = relayInit("wss://relay.damus.io");
        await relay.connect();
        relay.on("connect", () => {
          console.log("setting relay: ", relay)
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
  
  },[]);

  var event = {
    kind: 1,
    pubkey: pk,
    created_at: Math.floor(Date.now() / 1000),
    tags: [["t","satoshis_hive"]],
    content: ""
  };

  const publishEvent = (event) => {
    event.content=publishMessageContent
    console.log(event)
    event.id = getEventHash(event);
    event.sig = signEvent(event, sk);
    
    const pub = relay.publish(event);
    pub.on("ok", () => {
      setPubStatus("our event is published");
    });
    pub.on("failed", (reason) => {
      setPubStatus(`failed to publish message: ${reason}`);
      console.log(relay)
    });
  };

  // Get our event from relay
  const getEvent = async () => {
    var sub = relay.sub([
      {
        kinds: [1],
        authors: [pk],
      },
    ]);
    if (sub) {
      sub.on("event", (event) => {
        setNewEvent(event);
      });
    }
  };

  // Get all events from relay
  const getEvents = async () => {
    var events = await relay.list([
      {
        kinds: [1],
        authors: [pk],
        "#t": ["satoshis_hive"]
      },
    ]);
    console.log(events)
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
      <input id="messageContent" onChange= {(e) => setPublishMessageContent(e.target.value)} value={publishMessageContent}></input>
      <button onClick={() => publishEvent(event)}>Post Message</button>
      <p>Publish status: {pubStatus}</p>
      <button onClick={() => getEvent()}> Get event</button>
      {newEvent ? (
        <p>Subscribed event content: {newEvent.content}</p>
      ) : (
        <p>no new events</p>
      )}
      <button onClick={() => getEvents()}> load feed</button>
      {events !== null &&
        events.map((event) => (
          <p key={event.sig} style={{ borderStyle: "ridge", padding: 10 }}>
            {event.content}
          </p>
        ))}
    </div>
  );
};

export default NostrPanel;
