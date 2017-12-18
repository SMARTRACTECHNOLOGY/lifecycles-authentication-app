# Lifecycles Utilize App

## Overview

The Lifecycles Utilize App is a mobile application leveraging NFC technology to read NDEF compliant RFID tags. This is a reference implementation for "Consumer Experiences" related to tag registration.

### Use-case Implementation

A consumer owns a product with a Smartrac RFID tag. The consumer, who has already installed this app, can tap the tag and view all metadata associated to the tag. This could be things like a SKU number. The consumer can choose to register the tag forming a link between the tag and the consumer. This can be leveraged at a later date to enhance a users ability to interact with the company producing said product.

#### Technology Overview

* React Native
  * View layer abstraction over native Android/IOS platforms which allows us to target both platforms with almost the same view layer
  * Routing handled via `react-navigation` and a `StackNavigator` which acts a push/pop stack of `Screens`
  * NDEF integration via `@smartractechnology/react-native-rfid-nfc`, which is an in-house RFID based NDEF reader library that supports both Android and IOS.

* Auth0
  * Leverages `hosted pages` as the main entry point into the application

#### Architecture/Design Overview

* `Screens` - "container" components
 * Top-level view component that directly maps to routes or workflow pages e.g, `Auth` and `Dashboard`

* State/Data Management
  * `Screens` wrap global properties and hold internal state for all stateless child components. Child components receive their data via props as per regular React principles

* Data Fetching and API integration
 * The `Databroker` is an internal lib that returns an API to deal with the application data fetching calls
   * Wraps native `fetch` that is available in React Native and adds in additional functionality like timeouts and session request headers
   * Exposes an interface of methods to perform `auth`, `get`, `put`, `post`, and `delete` requests
   * Integrates our token mechanism and injects token into the API requests leveraging Auth0 internally
   * This is initialized when the application loads and checks to rehydrate itself from a previous session if a token exists in `AsyncStorage`.
  * Requests are proxied to a base url w/ the hosted API e.g, `https://demo.lifecycles.io`. This is set by the `Databroker` at runtime but is compile time configurable i.e If you want to run the API locally you can set `process.env.base` to something like `localhost:<port>`

* Authentication
 * Using Auth0 as a service for authentication
   * Using hosted pages and the javascript SDK
  * To change the `hosted page` you will need access to the Smartrac Auth0 web app dashboard
  * Note the `auth0-credentials` inside the `Databroker` lib which are somewhat hardcoded and not passed in as options of the `Databroker`

* NFC
 * Supports Android and IOS NFC reads
 * `nfc.js` provides a simple API of 2 methods `bindNFC` and `unbindNFC` that you can use within `Screen` workflows to start and stop the RFID reader. This abstraction dispatches to the proper handlers for the current platform in use

## Development Setup

* Install proper dependencies for android development
  * Android SDK25
  * Build tools 25.0.2
* Open up an emulator or connect device

`npm install && react-native run-android`

To run with android stacktrace

`cd android && ./gradlew installDebug --stacktrace`
