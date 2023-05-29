import  express  from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors"
import{PORT} from "./config.js" 
 
const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {origin: "*"}
})

io.on('connection', (socket) => {
    console.log('Se conectó un cliente');
  
    socket.on('chat_message', (data) => {
      io.emit('chat_message', data);
    });
  });

app.use(morgan("dev"))

server.listen(PORT);
console.log("Server esta activo", PORT)
