import express from "express";
import schedule from "node-schedule";

const app = express();

const print = () => console.log("hey", new Date());
const print2 = () => console.log("what", new Date());

const sample = schedule.scheduleJob(`0 * * * * *`, print);

const sample2 = sample.cancelNext(true);

const sample3 = schedule.scheduleJob(`30 * * * * *`, print2);
const sample4 = schedule.scheduleJob(`0 * * * * *`, print);
sample;

app.listen(1111, () => {
	console.log("cron test server is running");
});
