# zk-jubaer

- install

```
npm i zk-jubaer or yarn add zk-jubaer
```

- Documentation

```javascript
//  test code:

const ZKJUBAER = require("zk-jubaer");

const runMachine = async () => {
  let obj = new ZKJUBAER("192.168.1.106", 4370, 5200, 5000);
  try {
    // Create socket to machine
    await obj.createSocket();

    // Get general info like logCapacity, user counts, logs count
    // It's really useful to check the status of device

    console.log(await obj.getInfo());
  } catch (e) {
    console.log(e);
    if (e.code === "EADDRINUSE") {
    }
  }

  // Get users in machine

  const users = await obj.getUsers();
  console.log(users);

  // Create new user: setUser(uid, userid, name, password, role = 0, cardno = 0)

  await obj.setUser(12, "9", "testing", "111", 0, 0);

  // Get all logs in the machine
  // Currently, there is no filter to take data, it just takes all !!

  const logs = await obj.getAttendances(function () {
    if (err) throw err;
    console.log("Very cool!");
  });
  console.log(logs);

  // You can also read realtime log by getRealTimelogs function

  await obj.getRealTimeLogs((data) => {
    // do something when some checkin
    console.log(data);
  });

  // PIN of the device

  const pi = await obj.getPIN();
  console.log(pi);

  // Check Face functionality (Yes if ON, No if OFF)

  const fo = await obj.getFaceOn();
  console.log(fo);

  // SSR (Self-Service-Recorder)

  const ssr = await obj.getSSR();
  console.log(ssr);

  // Device Version

  const dv = await obj.getDeviceVersion();
  console.log(dv);

  // Device Name

  const n = await obj.getDeviceName();
  console.log(n);

  // Platform Version

  const p = await obj.getPlatform();
  console.log(p);

  // OS Version

  const o = await obj.getOS();
  console.log(o);

  // Get Attendance size

  const s = await obj.getAttendanceSize();
  console.log(s);

  // Delete the data in machine
  // Note: You should do this when there are too many data in the machine,
  // this issue can slow down machine.

  obj.clearAttendanceLog();

  // Disconnect the machine ( don't do this when you need realtime update :)))
  await obj.disconnect();
};

runMachine(); // in the end we execute the function
```

