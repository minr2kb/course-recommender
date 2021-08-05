const fs = require("fs");

fs.readFile("./allCourses_SUNY.json", "utf-8", (err, data_all) => {
	fs.readFile("./AMS.json", "utf-8", (err, data_ams) => {
		fs.readFile("./CSE.json", "utf-8", (err, data_cse) => {
			fs.readFile("./BUS.json", "utf-8", (err, data_bus) => {
				fs.readFile("./MEC.json", "utf-8", (err, data_mec) => {
					fs.readFile("./TSM.json", "utf-8", (err, data_tsm) => {
						const result = {};
						const ALL = JSON.parse(data_all);
						const AMS = JSON.parse(data_ams);
						const CSE = JSON.parse(data_cse);
						const BUS = JSON.parse(data_bus);
						const MEC = JSON.parse(data_mec);
						const TSM = JSON.parse(data_tsm);
						Object.assign(result, ALL, AMS, CSE, BUS, MEC, TSM);

						for (const key in result) {
							if (result[key].number >= 500) {
								delete result[key];
							}
						}

						fs.writeFile(
							"./allCoursesList.json",
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
				});
			});
		});
	});
});
