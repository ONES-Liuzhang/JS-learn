let taskList = [];
let totalTaskCount = 0; // 任务数量计数器
let currentTaskNumber = 0; // 记录目前位置处理的任务数量
let taskHandle = null; // 当前处理的任务的引用

let logFragment = null; // 一个DocumentFragment，用于储存每一帧需要添加到log中的渲染内容
let statusRefreshScheduled = false; // 用于跟踪我们是否已经为即将到来的帧安排了状态显示框的更新，因此我们每帧只执行一次
function enqueueTask(taskHandler, taskData) {
	taskList.push({
		handler: taskHandler,
		data: taskData,
	});

	totalTaskCount++;

	if (!taskHandle) {
		taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
	}

	scheduleStatusRefresh();
}

function runTaskQueue(deadline) {
	while (
		(deadline.timeRemaining() > 0 || deadline.didTimeout) &&
		taskList.length
	) {
		let task = taskList.shift();
		currentTaskNumber++;

		task.handler(task.data);
		scheduleStatusRefresh();
	}

	if (taskList.length) {
		// 浏览器的空闲时间用完了，但是队列函数还没有执行完成，重新调用requestIdleCallback，将队列加入到下一次浏览器空闲时间
		taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
	} else {
		// 浏览器空闲时间内执行完了函数队列，调用enqueueTask添加任务时，重新调用requestIdleCallback
		taskHandle = 0;
	}
}

// 更新progress状态
function scheduleStatusRefresh() {
	requestAnimationFrame(updateDisplay); // 浏览器下次重绘之前执行updateDisplay
}

// 真正的DOM操作，来绘制进度条
function updateDisplay() {
	let scrolledToEnd =
		logElem.scrollHeight - logElem.clientHeight <= logElem.scrollTop + 1;

	if (totalTaskCount) {
		if (progressBarElem.max != totalTaskCount) {
			totalTaskCountElem.textContent = totalTaskCount;
			progressBarElem.max = totalTaskCount;
		}

		if (progressBarElem.value != currentTaskNumber) {
			currentTaskNumberElem.textContent = currentTaskNumber;
			progressBarElem.value = currentTaskNumber;
		}
	}

	if (logFragment) {
		logElem.appendChild(logFragment);
		logFragment = null;
	}

	if (scrolledToEnd) {
		logElem.scrollTop = logElem.scrollHeight - logElem.clientHeight;
	}

	statusRefreshScheduled = false;
}

function log(text) {
	if (!logFragment) {
		logFragment = document.createDocumentFragment();
	}

	const el = document.createElement("div");
	el.textContent = text;
	logFragment.appendChild(el);
}

function logTaskHandler(data) {
	log("<strong>Running task #" + currentTaskNumber + "</strong>");

	for (i = 0; i < data.count; i += 1) {
		log((i + 1).toString() + ". " + data.text);
	}
}

function decodeTechnoStuff() {
	totalTaskCount = 0;
	currentTaskNumber = 0;
	updateDisplay();

	let n = getRandomIntInclusive(100, 200);

	for (i = 0; i < n; i++) {
		let taskData = {
			count: getRandomIntInclusive(75, 150),
			text: "This text is from task number " + (i + 1).toString() + " of " + n,
		};

		enqueueTask(logTaskHandler, taskData);
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

document
	.getElementById("startButton")
	.addEventListener("click", decodeTechnoStuff, false);
