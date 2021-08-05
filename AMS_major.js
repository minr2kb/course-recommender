const fs = require("fs");

module.exports = {
	SBC: function (user) {
		return new Promise(function (resolve, reject) {
			const SBC = {
				ARTS: 0,
				GLO: 0,
				HUM: 0,
				QPS: 0,
				SBS: 0,
				SNW: 0,
				TECH: 0,
				USA: 0,
				WRT: 0,
				STAS: 0,
				CER: 0,
				ESI: 0,
				DIV: 0,
				SPK: 0,
				WRTD: 0,
				"EXP+": 0,
				"HFA+": 0,
				"SBS+": 0,
				"STEM+": 0,
			};
			const partial = [];
			const result = {};

			fs.readFile(
				"./courses/allCoursesList.json",
				"utf-8",
				(err, data) => {
					const db = JSON.parse(data);
					const coursesTaken = Object.keys(user.courses);

					if (coursesTaken.includes("CSE316")) {
						if (coursesTaken.includes("CSE416")) {
							coursesTaken.pop("CSE416");
						} else {
							partial.push("CSE416");
							coursesTaken.pop("CSE316");
						}
					}
					if (coursesTaken.includes("EST440")) {
						if (coursesTaken.includes("EST441")) {
							coursesTaken.pop("EST441");
						} else {
							partial.push("EST441");
							coursesTaken.pop("EST440");
						}
					}
					if (coursesTaken.includes("MEC440")) {
						if (coursesTaken.includes("MEC441")) {
							coursesTaken.pop("MEC441");
						} else {
							partial.push("MEC441");
							coursesTaken.pop("MEC440");
						}
					}
					if (coursesTaken.includes("CSE305")) {
						if (coursesTaken.includes("CSE306")) {
							coursesTaken.pop("CSE306");
						} else {
							partial.push("CSE306");
							coursesTaken.pop("CSE305");
						}
					}
					if (coursesTaken.includes("CSE306")) {
						if (coursesTaken.includes("CSE305")) {
							coursesTaken.pop("CSE305");
						} else {
							partial.push("CSE305");
							coursesTaken.pop("CSE306");
						}
					}

					coursesTaken.forEach(course => {
						if (
							user.courses[course][1] != "Q" &&
							user.courses[course][1] != "NC" &&
							user.courses[course][1] != "F" &&
							(user.courses[course][1] != "P" ||
								user.courses[course][0] == "20S")
						) {
							db[course].SBC.forEach(sbc => {
								SBC[sbc] = 1;
							});
						}
					});
					if (
						SBC["EXP+"] +
							SBC["HFA+"] +
							SBC["SBS+"] +
							SBC["STEM+"] >=
						3
					) {
						SBC["EXP+"] = 1;
						SBC["HFA+"] = 1;
						SBC["SBS+"] = 1;
						SBC["STEM+"] = 1;
					}
					result["SBC"] = SBC;
					result["partial"] = partial;
					resolve(result);
				}
			);
		});
	},
	majorCheck: function (user) {},
	minorCheck: function (user) {},
};
