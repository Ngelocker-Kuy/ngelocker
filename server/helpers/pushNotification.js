const { Expo } = require('expo-server-sdk')
let expo = new Expo();

const UserController = require('../controller/userController')

async function pushNotification(io, { UserId, guest }) {
    console.log("ini di luar");
    try {
        const { tokenExpo } = await UserController.findUser(UserId)
        console.log(tokenExpo);
        let messages = [{
            to: tokenExpo,
            sound: 'default',
            body: `${guest} requested to open your locker!`,
            data: { withSome: 'data asdasd' },
        }];
        console.log(messages, "ini mesages");

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];

        (async () => {
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk, "ticket chunk");
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                } catch (error) {
                    console.log("masuk ga");
                    return
                    // console.error(error);
                }
            }
        })();
        io.emit('guestUpdate')
    } catch (err) {
        return
    }
}

module.exports = pushNotification