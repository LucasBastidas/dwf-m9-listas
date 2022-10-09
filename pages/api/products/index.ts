import { NextApiRequest, NextApiResponse } from "next";
import { products } from "../../../lib/algolia";
import methods from "micro-method-router";

function getLimitAndOffset(req: NextApiRequest, maxLimit, totalItems) {
	const queryLimit = parseInt(req.query.limit as string);
	const queryOffset = parseInt(req.query.offset as string);

	const limit = queryLimit <= maxLimit ? queryLimit : maxLimit;
	const offset = queryOffset < totalItems ? queryOffset : 0;

	return {
		limit,
		offset,
	};
}

export default methods({
	async post(req: NextApiRequest, res: NextApiResponse) {
		const query = req.query.q;
		const queryOffset = req.query.offset;
		const totalHits = await (await products.search("", {})).nbHits;
		const results = await products.search(query as string, {
			hitsPerPage: parseInt(req.query.limit as string),
			// offset: parseInt(queryOffset as string),
		});
		const { limit, offset } = getLimitAndOffset(req, 10, totalHits);

		res.send({
			results: results.hits,
			pagination: {
				offset,
				limit,
				totalHits,
			},
		});
		// res.send({ limit, offset, totalHits });
	},
});
