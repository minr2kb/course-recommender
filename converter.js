const fs = require("fs");

fs.readFile("csvjson.json", "utf-8", function (err, data) {
	function convert(json) {
		for (var i = 0; i < json.length; i++) {
			if (typeof json[i].credit == "number") {
				json[i].credit = [json[i].credit];
			} else {
				json[i].credit = json[i].credit.split(" to ");
				json[i].credit[0] = parseInt(json[i].credit[0]);
				json[i].credit[1] = parseInt(json[i].credit[1]);
			}

			var sbc = json[i].SBC;
			if (sbc.length > 0) {
				if (sbc.startsWith("Partial")) {
					sbc = sbc.split(": ")[1];
					json[i].SBC_type = "Partial";
				} else {
					json[i].SBC_type = "full";
				}
				json[i].SBC = sbc.replace(";", ",").split(", ");
			} else {
				json[i].SBC = [];
				json[i].SBC_type = "";
			}

			if (typeof json[i].section == "number") {
				json[i].section = String(json[i].section);
			}

			var date = json[i].date;
			var arr = [];
			if (date != "APPT" && date != "TUT") {
				if (date.includes("M")) {
					arr.push("M");
				}
				if (date.includes("TU")) {
					arr.push("TU");
				}
				if (date.includes("W")) {
					arr.push("W");
				}
				if (date.includes("TH")) {
					arr.push("TH");
				}
				if (date.includes("F")) {
					arr.push("F");
				}
			}
			json[i].date = arr;
		}

		var filtered_json = json.filter(
			course => course.cmp != "REC" && course.id != ""
		);

		var only = [filtered_json[0]];

		for (var i = 0; i < filtered_json.length - 1; i++) {
			if (filtered_json[i].number != filtered_json[i + 1].number) {
				only.push(filtered_json[i + 1]);
			}
		}
		const result = {};

		only.forEach(element => {
			const course = element.major + String(element.number);
			result[course] = element;
		});

		return result;
	}

	var result = convert(JSON.parse(data));

	//   console.log(result);
	fs.writeFile(
		"./courses/2021S_Courses.json",
		JSON.stringify(result),
		"utf8",
		function (error, data) {
			if (error) {
				throw error;
			}
			console.log("ASync Write Complete");
		}
	);
});
