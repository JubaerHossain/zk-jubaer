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

    // Get general info like logCapacity, user counts, logs count
    console.log(await obj.getInfo());

    // Get users in machine
    const users = await obj.getUsers();
    console.log(users);

    // Create new user
    await obj.setUser(12, "9", "testing", "111", 0, 0);

    // Get all logs in the machine
    const logs = await obj.getAttendances();
    console.log(logs);

    // Read real-time logs
    await obj.getRealTimeLogs((data) => {
      console.log(data);
    });

    // Get device PIN
    const pi = await obj.getPIN();
    console.log(pi);

    // Check Face functionality (Yes if ON, No if OFF)
    const fo = await obj.getFaceOn();
    console.log(fo);

    // Get Self-Service-Recorder (SSR) status
    const ssr = await obj.getSSR();
    console.log(ssr);

    // Get device version
    const dv = await obj.getDeviceVersion();
    console.log(dv);

    // Get device name
    const n = await obj.getDeviceName();
    console.log(n);

    // Get platform version
    const p = await obj.getPlatform();
    console.log(p);

    // Get OS version
    const o = await obj.getOS();
    console.log(o);

    // Get attendance size
    const s = await obj.getAttendanceSize();
    console.log(s);

    // Clear attendance log
    obj.clearAttendanceLog();

    // Disconnect from device
    await obj.disconnect();
  } catch (e) {
    console.log(e);
  }
};

runMachine();
```

API Reference :

`createSocket()` - creates a connection to the device
`getInfo()` - returns general information about the device, such as log capacity and user count
`getUsers() `- returns an array of all users in the device
`setUser(uid, userid, name, password, role = 0, cardno = 0)` - adds a new user to the device
`getAttendances()` - returns an array of all attendance logs in the device
`getRealTimeLogs(callback)` - sets up a real-time log stream and calls the provided callback function with each new log
`getPIN()` - returns the device PIN

Don't forget to star the repo if you like it.
