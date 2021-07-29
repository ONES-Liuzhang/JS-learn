// 下载兼容的例子
function download(data) {
	let adapter = data.adapter || defaultAdapter;
	return adapter(data);
}

function IEDownloadAdapter(data) {
	const { fileName, blob } = data;
	// 用IE的方式下载
}

function normalDownloadAdapter(data) {
	const { fileName, blob } = data;
	// 用a标签的方式下载
}

const defaultAdapter = getDefaultAdapter();

function getDefaultAdapter() {
	if (isIE) {
		return IEDownloadAdapter;
	} else {
		return normalDownloadAdapter;
	}
}
