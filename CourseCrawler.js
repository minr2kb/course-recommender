const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const majors = ["ams", "bus", "cse", "mec", "tsm"];

majors.forEach(major => {
	const getHtml = async () => {
		try {
			return await axios.get(
				"https://www.stonybrook.edu/sb/bulletin/current/academicprograms/" +
					major.toLowerCase() +
					"/courses.php"
			);
		} catch (error) {
			console.error(error);
		}
	};

	getHtml()
		.then(html => {
			let CourseList = {};
			const $ = cheerio.load(html.data);
			const $BodyList = $("div.column_2_text").children("div.course");

			$BodyList.each(function (i, elem) {
				const eleNum = $(this).children().length;
				const SBC = [];
				const prereq = [];
				let SBC_type = "";

				if ($(this).text().includes("SBC")) {
					$(this)
						.find("a")
						.each(function (i, elem) {
							SBC[i] = $(elem).text();
						});
					SBC_type = "full";
				} else if ($(this).text().includes("Partially")) {
					$(this)
						.find("a")
						.each(function (i, elem) {
							SBC[i] = $(elem).text();
						});
					SBC_type = "partial";
				}

				for (let i = 3; i < 5; i++) {
					let text = $(this)
						.find("p:nth-child(" + i.toString() + ")")
						.text();
					if (text.includes("Pre") && !text.includes("Adv")) {
						let text = $(this)
							.find("p:nth-child(" + i.toString() + ")")
							.text();
						text.substring(text.indexOf(":") + 2, text.length)
							.trim()
							.split("; ")
							.forEach(element => {
								prereq.push(element);
							});
					}
				}

				var major = $(this).find("h3").text().substring(0, 3);
				var number = $(this).attr("id");

				CourseList[major + number] = {
					major: major,

					number: parseInt(number),

					title: $(this).find("h3").text().split(": ")[1],

					prereq: prereq,

					credit: $(this)
						.find("p:nth-child(" + (eleNum - 1) + ")")
						.text()
						.split(" ")[0]
						.split("-")
						.map(elem => parseInt(elem)),

					SBC: SBC,

					SBC_type: SBC_type,
				};
			});
			const data = CourseList;
			return data;
		})
		// .then(res => log(res));
		.then(res =>
			fs.writeFile(
				"./courses/" + major.toUpperCase() + ".json",
				JSON.stringify(res),
				"utf8",
				function (error, data) {
					if (error) {
						throw error;
					}
					console.log(
						"ASync Write Complete: " + major.toUpperCase() + ".json"
					);
				}
			)
		);
});
