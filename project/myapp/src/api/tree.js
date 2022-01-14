let tid = 0;
export const getTreeById = (rank) => {
	tid++;
	return [
		{
			id: "",
			title: `a-${tid}`,
			rank: rank + 1,
		},
		{
			id: "",
			title: `b-${tid}`,
			rank: rank + 1,
		},
	];
};
