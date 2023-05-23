/** @param {NS} ns **/
export async function main(ns) {

	let list = [
		'Analyst.js',
		'Begin.js',
		'Combatant.js',
		'Deploy.js',
		'GTFO.js',
		'Hack.js',
		'Launch.js',
		'Locate.js',
		'Nodes.js',
		'Observatory.js',
		'Servers-Lite.js',
		'Stocks.js',
		'Stop.js',
		'Strategist.js',
		'Targets.js',
		'Virus-Manual.js',
		'Virus-V2.js',
		'Virus.js',
		'grow-Virus.js',
		'hack-Virus.js',
		'port-utils.js',
		'queue-service.js',
		'utils.js',
		'weaken-Virus.js'
	];

	for (const script of list) {
		ns.tprintf('Pulling ' + script + ' off gitHub');
		await ns.wget('https://raw.githubusercontent.com/Trevor1800/BitScript/main/' + script, script, "home");
	}

}
