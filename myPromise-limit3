function requestFn(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(params.user + " success");
    }, 1000);
  });
}

function allRequestSuccess(data) {
  console.info(data)
}

async function processPromise(requestParamsList, limit) {
  let chunks = [];
  let resolveData = [];

  for (let i = 0; i < requestParamsList.length; i += limit) {
    chunks.push(requestParamsList.slice(i, i + limit));
  }

  for (const chunk of chunks) {
    await Promise.all(chunk.map((params) => requestFn(params)))
      .then((chunkResolveData) => {
        resolveData = [...resolveData, ...chunkResolveData];
      })
      .catch((error) => {
        resolveData = [
          ...resolveData,
          ...Array.from({ length: limit }, () => ""),
        ];
        console.error("request error:", error);
      });
  }

  allRequestSuccess(resolveData);
}

let requestParamsList = [
  { user: "n1" },
  { user: "n2" },
  { user: "n3" },
  { user: "n4" },
  { user: "n5" },
  { user: "n6" },
  { user: "n7" },
  { user: "n8" },
  { user: "n9" },
];

(async () => {
  console.info('request start')
  await processPromise(requestParamsList, 2);
})();
