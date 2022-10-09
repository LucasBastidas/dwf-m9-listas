import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { airtableBase } from "../../lib/airtable";
import { products } from "../../lib/algolia";

export default methods({
	async post(req: NextApiRequest, res: NextApiResponse) {
		airtableBase("Furniture")
			.select({})
			.eachPage(
				function page(records, fetchNextPage) {
					const results = records.map((r) => {
						return {
							...r.fields,
							objectID: r.id,
						};
					});
					products.saveObjects(results);

					fetchNextPage();
					console.log("OTRA PAG");
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		res.status(200).send("sync");
	},
});
