# Satoshi's Hive UI

Demonstration of a community application built on top of Lightning.

```

## Installation

```

yarn install

```

## Client app setup

Run `yarn install` in the client directory

Create a `.env` file updated with values in `.env.sample` file

```

cd client

yarn install

```

To display the client application run

```

yarn run dev

```

## Running via Docker

As an alternative to building and running the client and service individually, you can run these via Docker. In the root of the project, simply run `docker_compose up`, and wait for it to build and start the `sh-ui` container. Once ready, the UI can be accessed at `http://localhost:3000`.

## Usage

Once the client has started, you should see a `user connected` message in the _server_ logs, as the client connects to it over websocket. Click the "log in with lighning button", at which point a QR code should be displayed. Scan this with your lighning wallet, at which point, it should ask you if you want to log in to the domain of your temporary ngrok address. Select "Yes", if authentication is successful, you should be instantly routed to the Dashboard page.

## Demo Video

<a href="https://odysee.com/@davidcarrington:3/lnurl-auth-demo2:3" target="_blank"><img src="https://user-images.githubusercontent.com/32391650/216687887-60299449-2f12-4aaf-9811-44950a3e1805.png"></a>
```
