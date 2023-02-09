#<h2> zk-jubaer </h2>
A Node.js library for ZK BioMetric Fingerprint Attendance Devices.

Installation
 `npm i zk-jubaer`
Or, if you prefer Yarn:

`yarn add zk-jubaer`

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

createSocket() - creates a connection to the device
getInfo() - returns general information about the device, such as log capacity and user count
getUsers() - returns an array of all users in the device
setUser(uid, userid, name, password, role = 0, cardno = 0) - adds a new user to the device
getAttendances() - returns an array of all attendance logs in the device
getRealTimeLogs(callback) - sets up a real-time log stream and calls the provided callback function with each new log
getPIN() - returns the device PIN

Don't forget to star the repo if you like it.


