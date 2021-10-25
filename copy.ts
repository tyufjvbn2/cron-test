import express from "express";
import schedule from "node-schedule";
// import { run } from "./machine/scrap";
// import { create } from "./machine/create";
// import { update } from "./machine/update";
// import { repeater } from "./machine/repeat";
// import { ScrapDataInterface } from "./interface/interface";
// import { resDataStructure } from "./interface/interface";
// const mongooseConfig = require("./config/config");

// let daily
let routine: any;

try {
	// mongooseConfig();
	const app = express();

	const log = () => {
		console.log("active");
	};

	const test = () => {
		console.log("cron set again");
		routine = schedule.scheduleJob(`10 * * * * *`, log);
	};

	const dailyRepeat = () => {
		console.log("daily routine start!");
		schedule.scheduleJob("0 * * * * *", () => {
			// console.log("who are you", routine);
			if (!routine) {
				console.log("cron didn't set. I will set again");
				test();
			} else {
				routine.cancel();
				console.log("cron schedule reset!");
				test();
			}
		});
	};

	dailyRepeat(); //실행 예약하기

	app.listen(3333, () => {
		console.log("Data scraping servering is running");
	});
} catch (err) {
	console.error("Scraping Server running problem : ", err);
}
