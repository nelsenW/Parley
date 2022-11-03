import { createConsumer } from "@rails/actioncable";
let wsUrl 
if (process.env.NODE_ENV !== "production"){
    wsUrl = "ws://localhost:3000/cable"
} else {
    wsUrl = "wss://parley.onrender.com/cable"
}
export default createConsumer(wsUrl);

// "ws://localhost:3000/cable"