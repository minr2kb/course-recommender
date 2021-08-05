const fs = require("fs");

fs.readFile("./2021S_CourseList.json", "utf-8", function (err, data) {
	const result = {};

	const json = JSON.parse(data);

	json.forEach(element => {
		const course = element.major + String(element.number);
		result[course] = element;
	});

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
