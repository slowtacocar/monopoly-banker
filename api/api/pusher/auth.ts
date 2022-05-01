import Pusher from "pusher";
import cors from "cors";
import * as crypto from "crypto";
import { VercelRequest, VercelResponse } from "@vercel/node";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: "60c1a31d88a4027bb74e",
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true,
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  cors()(req, res, async (err) => {
    if (err) {
      throw err;
    } else {
      const data = await pusher.get({
        path: `/channels/${req.body.channel_name}/users`,
      });
      console.log(data);
      const auth = pusher.authenticate(
        req.body.socket_id,
        req.body.channel_name,
        {
          user_id: crypto.randomUUID(),
          user_info: {
            publicKey: req.body.publicKey,
            name: req.body.name,
            isHost: !data || data.length === 0,
          },
        }
      );
      res.status(200).json(auth);
    }
  });
}
