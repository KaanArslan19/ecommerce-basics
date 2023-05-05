import { getServerSession } from "next-auth/next";

import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { authOptions } from "./[...nextauth]";
async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession({ req: req, res: res, authOptions });
  console.log("Session: ", session);

  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
    return;
  }
  let client;

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
  const usersCollection = client.db().collection("users");

  let user;
  try {
    user = await usersCollection.findOne(
      { email: userEmail },
      { email: 1, password: 1 }
    );
    console.log("User Info:", user);
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "User not Found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(newPassword);
  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
