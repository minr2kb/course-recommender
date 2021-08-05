const AMS = require("./AMS_major");

//API Key
//7c897ef8-b27a-4c87-9f92-1b46b3433f4d
//Secret
//PmyYhRGATgzYtkbpNoHoIVWyt0fvArXh
//App ID
//86263d68-8730-43d0-9b0a-36bd2ea47486

const user = {
	name: "Kyungbae Min",
	major: "AMS",
	minor: "CS",
	spec: "",
	grade: 3,
	math: 8,
	wrt: 2,
	courses: {
		AMS161: ["19S", "A"], //QPS
		AMS210: ["19S", "A"], //STEM+
		AMS310: ["19F", "A"], //STEM+
		AMS301: ["19F", "A"], //STEM+
		WAE192: ["19S", "A"],
		CSE214: ["20F", "A"],
		WAE194: ["19F", "A"],
		CSE101: ["19S", "A"], //TECH
		CSE114: ["19F", "A"], //TECH
		CSE215: ["20S", "A"],
		BIO201: ["19S", "A"], //SNW
		SOC247: ["20S", "A"], //DIV, SBS
		KOR220: ["20S", "P"], //HUM, GLO, LANG
		CSE316: ["21F", "B+"], //ESI, EXP+, SBS+, STEM+
		// CSE416: ["21F", "B+"],
	},
};
AMS.SBC(user).then(data => console.log(data));

// for (const [key, value] of Object.entries(test)) {
//   console.log(test[key]);
// }

const test = {
	AMS161: {
		major: "AMS",
		number: 161,
		title: "Applied Calculus II",
		prereq: {
			majorOnly: "",
			minorOnly: "",
			higher: ["C", "AMS151", "MAT131", "MAT141"],
			grade: 1,
			mathLevel: 7,
			permission: false,
			course: [],
		},
		//   "C or higher in AMS 151 or MAT 131 or 141, or level 7 on the mathematics placement examination"
		credit: [3],
		SBC: ["QPS"],
		SBC_type: "full",
	},
};
