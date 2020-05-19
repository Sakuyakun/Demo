// best-time-to-buy-and-sell-stock-ii 动态规划解法

const dp = function (prices) {
  let len = prices.length
  if (len < 2) return 0

  // cash：持有现金
  // hold：持有股票
  // 状态数组转移：cash → hold → cash → hold → cash → hold → cash
  let cash = []
  let hold = []

  cash[0] = 0
  hold[0] = -prices[0]

  for (let i = 1; i < len; i++) {
    // 前一天的现金 对比 前一天持有股票，今天卖出后的现金
    cash[i] = Math.max(cash[i - 1], hold[i - 1] + prices[i])
    // 前一天持有的股票 对比 前一天不持有股票，今天买入的现金
    hold[i] = Math.max(hold[i - 1], cash[i - 1] - prices[i])
  }

  return cash[len - 1]
}

console.log(dp([7,1,5,3,6,4]))
