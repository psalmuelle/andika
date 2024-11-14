import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_SECRET_KEY!
);

export default mailjet;
