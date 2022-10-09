import type { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
	const { limit } = req.query;
	const { offset } = req.query;
	const finalLimit = parseInt(limit as string) < 100 ? limit : 100;
	// const finalOffset = parseInt(offset as string) < 100?offset : 100;
	return res.status(200).send("hola " + finalLimit + " " + offset);
}
