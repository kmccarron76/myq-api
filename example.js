const account = new MyQ();
account.login('mccarronkevin@outlook.com ', '8fTv3xbc%GC%91gH')
    .then(function(result) {
        console.log(result);
    }).catch(function(error) {
        console.error(error);
    });

console.log(`\nGetting all devices on account`);
return account.getDevices();
})
.then((getDevicesResult) => {
        console.log('getDevices result:');
        console.log(JSON.stringify(getDevicesResult, null, 2));

        const { devices } = getDevicesResult;
        if (devices.length === 0) {
            throw Error('No devices found!');
        }
        console.log('Devices:');
        devices.forEach((device, index) => {
            console.log(
                `Device ${index} - Name: '${device.name}', Serial Number: '${device.serial_number}'`
            );
        });

        door = devices.find(
            (device) => device.state && MyQ.constants._stateAttributes.doorState in device.state
        );
        if (!door) {
            throw Error('No doors found!');
        }

        console.log(`\nClosing door '${door.name}'`);
        return account.setDoorState(door.serial_number, MyQ.actions.door.CLOSE);
    })
    .then((setDoorStateResult) => {
        console.log('setDoorStateResult:');
        console.log(JSON.stringify(setDoorStateResult, null, 2));

        console.log('Waiting 5 seconds before polling state again');
        return new Promise((resolve) => setTimeout(resolve, 5000));
    })
    .then(() => {
        console.log(`\nGetting state of door '${door.name}'`);
        return account.getDoorState(door.serial_number);
    })
    .then((getDoorStateResult) => {
        console.log('getDoorState result:');
        console.log(JSON.stringify(getDoorStateResult, null, 2));
        console.log(`State of door '${door.name}': ${getDoorStateResult.deviceState}`);
    })
    .catch((error) => {
        console.error('Error received:');
        console.error(error);
        console.error(`Error code: ${error.code}`);
        console.error(`Error message: ${error.message}`);
    });
const MyQ = require('myq-api');

const account = new MyQ();
account.login(email, password)
    .then(function(result) {
        console.log(result);
    }).catch(function(error) {
        console.error(error);
    });