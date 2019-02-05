require("dotenv").config();

const mqtt = require("mqtt");

const client = mqtt
  .connect(process.env.borkerURL)
  .on("error", error => console.log(error))
  .on("message", (topic, message) =>
    console.log(`[${topic}] ${message.toString()}`)
  )
  .on("connect", () => {
    client.publish(
      "reader/card",
      JSON.stringify({
        BitCount: 35,
        CardType: "Test Card",
        FacilityCode: 999,
        CardCode: 012346
      })
    );

    client.end();
  })
  .subscribe("reader/#");
