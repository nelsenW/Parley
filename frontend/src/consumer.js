import { createConsumer } from "@rails/actioncable";
export default createConsumer("ws://localhost:3000/cable");