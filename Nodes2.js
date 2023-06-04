function getCheapest(ns, node)
{
    let minCost = Infinity;
    let minAction = () => false;
    for (const [cost, action] of [[ns.hacknet.getLevelUpgradeCost(node, 1), () => ns.hacknet.upgradeLevel(node, 1)],
                                  [ns.hacknet.getRamUpgradeCost(node, 1), () => ns.hacknet.upgradeRam(node, 1)],
                                  [ns.hacknet.getCoreUpgradeCost(node, 1), () => ns.hacknet.upgradeCore(node, 1)],
                                  [ns.hacknet.getCacheUpgradeCost(node, 1), () => ns.hacknet.upgradeCache(node, 1)]]) {
        if (cost < minCost) {
            minCost = cost;
            minAction = action;
        }
    }
    return [minCost, minAction];
}
 
export async function main(ns)
{
    while (true) {
        let minCost = ns.hacknet.getPurchaseNodeCost();
        let minAction = () => ns.purchaseNode();
        for (let i=0; i < ns.hacknet.numNodes(); i++) {
            const [cost, action] = getCheapest(ns, i);
            if (cost < minCost) {
                minCost = cost;
                minAction = action;
            }
        }
        if (!minAction()) {
            await ns.sleep(30000);
        }
    }
}