async function processPromises(promises, maxConcurrent) {
  const results = [];
  let currentIndex = 0;
  let runningCount = 0;

  while (currentIndex < promises.length) {
    if (runningCount < maxConcurrent) {
      const currentPromise = promises[currentIndex];
      currentIndex++;
      runningCount++;

      // 处理当前Promise
      const result = await currentPromise;

      // 将结果存入数组
      results.push(result);

      runningCount--;
    } else {
      // 当前并发数已满，等待一个Promise完成后继续执行
      await Promise.race(promises.slice(currentIndex, currentIndex + runningCount));
    }
  }

  return results;
}

// 示例使用
const promise1 = new Promise((resolve) => setTimeout(() => resolve("Promise 1"), 2000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Promise 2"), 1500));
const promise3 = new Promise((resolve) => setTimeout(() => resolve("Promise 3"), 1000));
const promise4 = new Promise((resolve) => setTimeout(() => resolve("Promise 4"), 500));
const promise5 = new Promise((resolve) => setTimeout(() => resolve("Promise 5"), 100));
const promise6 = new Promise((resolve) => setTimeout(() => resolve("Promise 6"), 800));
const promise7 = new Promise((resolve) => setTimeout(() => resolve("Promise 7"), 600));
const promise8 = new Promise((resolve) => setTimeout(() => resolve("Promise 8"), 400));
const promise9 = new Promise((resolve) => setTimeout(() => resolve("Promise 9"), 1200));
const promise10 = new Promise((resolve) => setTimeout(() => resolve("Promise 10"), 300));

const promises = [promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8, promise9, promise10];

processPromises(promises, 3)
  .then((results) => {
    console.log(results);
    // 在这里处理结果
  })
  .catch((error) => {
    console.error(error);
    // 处理错误
  });
