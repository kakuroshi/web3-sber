const abi = [
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_code_word",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "accept_the_transfer",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_user",
				type: "address",
			},
		],
		name: "addAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
		],
		name: "addCategory",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "golosToUp",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "refuse_transfer_sender",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_recipient",
				type: "address",
			},
			{
				internalType: "bytes32",
				name: "_code_word",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "_category",
				type: "uint256",
			},
		],
		name: "send_money",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "admins",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "allUsers",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "applications",
		outputs: [
			{
				internalType: "address",
				name: "applicant",
				type: "address",
			},
			{
				internalType: "bool",
				name: "status",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "categories",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "get_transfers",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "recipient",
						type: "address",
					},
					{
						internalType: "address",
						name: "sender",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "category",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "status_accept",
						type: "bool",
					},
					{
						internalType: "bool",
						name: "end_transfer",
						type: "bool",
					},
					{
						internalType: "bytes32",
						name: "code_word",
						type: "bytes32",
					},
				],
				internalType: "struct sber.Transfer[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "transfers",
		outputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address",
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "category",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "status_accept",
				type: "bool",
			},
			{
				internalType: "bool",
				name: "end_transfer",
				type: "bool",
			},
			{
				internalType: "bytes32",
				name: "code_word",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "viewAdmins",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "viewApplications",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "applicant",
						type: "address",
					},
					{
						internalType: "address[]",
						name: "golosa",
						type: "address[]",
					},
					{
						internalType: "bool",
						name: "status",
						type: "bool",
					},
				],
				internalType: "struct sber.upAdmin[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "viewCategories",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
				],
				internalType: "struct sber.Category[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_user",
				type: "address",
			},
		],
		name: "viewUserInf",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "role",
						type: "uint256",
					},
				],
				internalType: "struct sber.User",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "viewUsers",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

export default abi;
