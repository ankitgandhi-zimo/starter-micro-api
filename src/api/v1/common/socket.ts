// const environment = process.env.NODE_ENV,
const { socketEvents } = require("../common/erros_message"),
  //   config = require("./config").get(environment),
  port = process.env.PORT,
  //   { app, calls } = require("../../../index"),
  //   admin = require("firebase-admin"),
  //   { calls } = require("../../app"),
  socket = require("socket.io");
export enum EnumSocketEvents {
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
  ANNOUNCEMENT = "ANNOUNCEMENT",
}
class Socket {
  connectSocket = (server: any) => {
    // Socket setup

    const origin = [
      "http://192.168.1.105:5008",

      "http://192.168.1.114:3000",
      "http://localhost:4200",
    ];

    const io = socket(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ["websocket", "polling"],
      },
      allowEIO3: true,
    });

    console.log(`Socket runnning on port ${port}`);

    global.socketUsersList = new Map();

    io.on("connection", (socket: any) => {
      // console.log('New socket connection of / --- id' + socket.id + ' number ' + io.of('/').sockets.size)
      socket.on(EnumSocketEvents.ADD_USER, function (data: any) {
        // socketClientList[data.user_id] = socket.id
        global.socketUsersList.set(data.user_id, socket.id);
      });

      socket.on(EnumSocketEvents.REMOVE_USER, function (data: any) {
        // delete socketClientList[data.user_id]
        global.socketUsersList.delete(data.user_id);
        // console.log('Remove User Socket List', socketUsersList)
      });

      // *******************************  LATEST WEBRTC CODE START   ****************************************
      // socket.on(
      //   socketEvents.webrtc.addOffer,
      //   (call_id, offer) => {
      //     calls.forEach((call) => {
      //       if (call._id == call_id) {
      //         call.offer = offer;
      //         call.offerBy = socket.id;
      //       }
      //     });
      //     console.log("\n\nadd-offer   ", call_id);
      //   }
      // );

      // socket.on(
      //   socketEvents.webrtc.addAnswer,
      //   (call_id, answer) => {
      //     calls.forEach((call) => {
      //       if (call._id == call_id) {
      //         call.answer = answer;
      //         call.answerBy = socket.id;
      //         socket
      //           .to(call.offerBy)
      //           .emit(
      //             socketEvents.webrtc.answerAdded,
      //             answer
      //           );
      //         io.to(socket.id).emit(
      //           socketEvents.webrtc.setOfferCandidate,
      //           call.offerCandidate
      //         );
      //       }
      //     });
      //     // console.log('\n\nadd-answer\n\n', calls)
      //   }
      // );

      // socket.on(
      //   socketEvents.webrtc.addOfferCandidate,
      //   (call_id: any, candidateJSON: any) => {
      //     calls.forEach((call: any) => {
      //       if (call._id == call_id) {
      //         call.offerCandidate.push(candidateJSON); // for web
      //         // call.offerCandidate.push(JSON.parse(candidateJSON)) // for mobile
      //       }
      //       // console.log('candidateJSON', JSON.parse(candidateJSON))
      //       // console.log('candidateJSON', typeof candidateJSON)
      //     });
      //   }
      // );

      // socket.on(
      //   socketEvents.webrtc.addAnswerCandidate,
      //   (call_id, candidateJSON) => {
      //     calls.forEach((call) => {
      //       if (call._id == call_id) {
      //         call.answerCandidate.push(candidateJSON);
      //         socket
      //           .to(call.offerBy)
      //           .emit(
      //             socketEvents.webrtc.answerCandidateAdded,
      //             candidateJSON
      //           );
      //       }
      //     });
      //   }
      // );
      // *******************************  LATEST WEBRTC CODE END   ****************************************
    });

    const chatIO = io.of("/chat");

    // console.log('chatIO   ', chatIO)

    return { socketIO: io, chatIO };
  };
}

export default new Socket();
