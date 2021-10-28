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
let power = 1;

try {
	// mongooseConfig();
	const app = express();

	const router = express.Router();

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use(router);

	const log = () => {
		console.log("active!", new Date());
	};
	const log2 = () => {
		console.log("active2!", new Date());
	};
	const log3 = () => {
		console.log("active3!", new Date());
	};
	const log4 = () => {
		console.log("active4!", new Date());
	};

	const test = () => {
		if (power) {
			console.log("cron set again");
			routine = schedule.scheduleJob(`10 * * * * *`, log);
			routinee = schedule.scheduleJob("20 * * * * *", log2);
		} else {
			console.log("power off, now schedule will not call again");
		}
	};

	const dailyRepeat = () => {
		console.log("daily routine start!");
		schedule.scheduleJob("0 * * * * *", () => {
			// console.log("who are you", routine);
			if (!routine) {
				console.log("cron didn't set. I will set again");
			} else {
				routine.cancel(); //매번 하나 취소
				routinee.cancelNext(true); //처음 하나만 취소
				console.log("cron schedule reset!");
			}
			test();
			loutine = schedule.scheduleJob("30 * * * * *", log3);
			loutine.cancel(); //실행 되자마자 취소
			loutine = schedule.scheduleJob("40 * * * * *", log4); //취소가 안되고 있음
		});
	};

	//실행 후 한번만 정지되고 일반 함수 실행 때문에 다음턴에는 다시 실행됨
	router.get("/1", (req, res) => {
		console.log("action accepted");
		routine.cancel();
		console.log("action done");

		res.status(200).json({ message: "action done" });
	});

	//이제 test 내부에서 schedule 도는건 꺼짐, 0초에 반복되는건 지속
	//외부 스케줄은 stop 못함
	router.get("/2", (req, res) => {
		console.log("action accepted");
		power = 0;
		console.log("action done");
		res.status(200).json({ message: "action done" });
	});

	dailyRepeat(); //실행 예약하기

	app.listen(3333, () => {
		console.log("Data scraping servering is running");
	});
} catch (err) {
	console.error("Scraping Server running problem : ", err);
}
