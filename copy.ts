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
let routinee: any;
let loutine: any;

try {
	// mongooseConfig();
	const app = express();

	const log = () => {
		console.log("active!");
	};
	const log2 = () => {
		console.log("active2!");
	};
	const log3 = () => {
		console.log("active3!");
	};
	const log4 = () => {
		console.log("active4!");
	};

	const test = () => {
		console.log("cron set again");
		routine = schedule.scheduleJob(`10 * * * * *`, log);
		routinee = schedule.scheduleJob("20 * * * * *", log2);
	};

	const dailyRepeat = () => {
		console.log("daily routine start!");
		schedule.scheduleJob("0 * * * * *", () => {
			// console.log("who are you", routine);
			if (!routine) {
				console.log("cron didn't set. I will set again");
			} else {
				routine.cancel();
				routinee.cancelNext(true);
				console.log("cron schedule reset!");
			}
			test();
			loutine = schedule.scheduleJob("30 * * * * *", log3);
			loutine.cancel();
			loutine = schedule.scheduleJob("40 * * * * *", log4);
		});
	};

	dailyRepeat(); //실행 예약하기

	app.listen(3333, () => {
		console.log("Data scraping servering is running");
	});
} catch (err) {
	console.error("Scraping Server running problem : ", err);
}
