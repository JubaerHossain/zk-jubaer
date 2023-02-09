<h1> zk-jubaer </h1>
The zk-jubaer library is a powerful tool for Node.js developers who need to integrate their applications with ZK BioMetric Fingerprint Attendance Devices. With its simple and intuitive API, developers can easily retrieve information from the device, such as the number of users registered, logs, device version, and more. It also enables developers to add new users, retrieve real-time logs, and clear the attendance logs stored on the device. The library uses a socket connection to communicate with the device, which provides fast and reliable data transfer. Whether you need to build an attendance tracking system, a time-and-attendance management solution, or any other application that requires integration with biometric devices, the zk-jubaer library is the perfect tool to get the job done.

### Installation

```bash
npm i zk-jubaer
```

Or, if you prefer Yarn:

```bash
yarn add zk-jubaer
```

### Usage Example

```js
const ZKJUBAER = require("zk-jubaer");

const runMachine = async () => {
  let obj = new ZKJUBAER("192.168.1.106", 4370, 5200, 5000);
  try {
    // Create socket to machine
    await obj.createSocket();

    // Get all logs in the machine
    const logs = await obj.getAttendances();
    console.log(logs);

    // Read real-time logs
    await obj.getRealTimeLogs((data) => {
      console.log(data);
    });

    // Disconnect from device
    await obj.disconnect(); // when you are using real-time logs, you need to disconnect manually
  } catch (e) {
    console.log(e);
  }
};

runMachine();
```

API Reference :

  - `createSocket()` - creates a connection to the device
  - `getInfo()` - returns general information about the device, such as log capacity and user count
  - `getUsers() `- returns an array of all users in the device
  - `setUser(uid, userid, name, password, role = 0, cardno = 0)` - adds a new user to the device
  - `getAttendances()` - returns an array of all attendance logs in the device
  - `getRealTimeLogs(callback)` - sets up a real-time log stream and calls the provided callback function with each new log
  - `getPIN()` - returns the device PIN

  - `getFaceOn()` - returns the device Face On status
  - `getSSR()` - returns the device Self-Service-Recorder (SSR) status
  - `getDeviceVersion()` - returns the device version
  - `getDeviceName()` - returns the device name
  - `getPlatform()` - returns the device platform version
  - `getOS()` - returns the device OS version
  - `getAttendanceSize()` - returns the device attendance size
  - `clearAttendanceLog()` - clears the attendance log
  - `disconnect()` - disconnects from the device


### Don't forget to star the repo if you like it.
