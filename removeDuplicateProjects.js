const fs = require('fs');
const readline = require('readline');
const path = require('path');

let dirPath = './pages'; // .mdx文件所在的文件夹路径
let files = fs.readdirSync(dirPath);

// 读取已有的项目名称
let projectFile = 'projects.txt';
let existingProjects = new Set(fs.existsSync(projectFile) ? fs.readFileSync(projectFile, 'utf-8').split('\n') : []);

files.forEach((file) => {
	if (path.extname(file) === '.mdx') {
		let filePath = path.join(dirPath, file);
		parseFile(filePath);
	}
});

function parseFile(filePath) {
	let newLines = '';
	let temp = '';
	let deleteNextNLines = 0;

	let readInterface = readline.createInterface({
		input: fs.createReadStream(filePath),
		output: process.stdout,
		console: false
	});

	readInterface.on('line', function (line) {
		if (line.startsWith('###')) {
			let project = line.match(/\[(.*?)\]/);
			if (Array.isArray(project)) {
				if (!existingProjects.has(project[1])) {
					existingProjects.add(project[1]);
					temp += line + '\n';
				} else {
					temp = '';
					deleteNextNLines = 3;
				}
			}
		} else if (deleteNextNLines > 0) {
			deleteNextNLines--;
		} else {
			newLines += temp + line + '\n';
			temp = '';
		}
	});

	readInterface.on('close', function () {
		fs.writeFileSync(filePath, newLines);
		fs.writeFileSync(projectFile, Array.from(existingProjects).join('\n'));
	});
}
