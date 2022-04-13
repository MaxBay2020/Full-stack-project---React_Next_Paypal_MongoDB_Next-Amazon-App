// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connect from "../../db/config/mongoDB-config";

export default async function handler(req, res) {
  await connect()
  res.status(200).json({ name: 'John Doe' })
}
