import http from "k6/http";

export const options = {
  stages: [
    { duration: "2m", target: 5 },
    { duration: "5m", target: 10 },
    { duration: "2m", target: 5 },
  ],
  thresholds: {
    http_req_duration: ["p(99.9)<300"],
    http_req_failed: ["rate<0.001"],
  },
  summaryTrendStats: ["avg", "med", "p(95)", "p(99)"],
};

export default function () {
  let url = "http://127.0.0.1:7778/api/downvote";
  const params = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  };
  let data = JSON.stringify({
    "post_id": 10,
  });
  http.patch(url, data, params);
}
