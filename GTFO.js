/** @param {NS} ns **/
export async function main(ns) {
	let recovered = 0;

	function getOwnedStocks() {
		const stockSymbols = ns.stock.getSymbols();
		const stocks = [];
		for (const sym of stockSymbols) {
			const pos = ns.stock.getPosition(sym);
			const stock = {
				sym,
				longShares: pos[0],
				shortShares: pos[2],
			};
			stocks.push(stock);
		}
		return stocks;
	}

	function sellStocks(stocks) {
		for (const stock of stocks) {
			if (stock.longShares > 0) {
				const salePrice = ns.stock.sellStock(stock.sym, stock.longShares);
				recovered += salePrice;
			}
			if (stock.shortShares > 0) {
				const salePrice = ns.stock.sellStock(stock.sym, stock.shortShares);
				recovered += salePrice;
			}
		}
	}

	const homeServ = "home";
	const trader = "Stocks.js";

	if (ns.scriptRunning(trader, homeServ)) {
		ns.scriptKill(trader, homeServ);
	}

	const stocks = getOwnedStocks();
	sellStocks(stocks);

	ns.tprint(`Total money recovered : ${ns.formatNumber(recovered)}`);

	// Close all home scripts
	ns.killall();
}
