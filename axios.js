const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
	try {
		return await axios.get(
			"ftp://ftp.swpc.noaa.gov/pub/lists/ace/20210803_ace_sis_5m.txt"
		);
	} catch (error) {
		console.error(error);
	}
};

getHtml().then(html => {
	console.log(html);
});
// .then(res => log(res));
