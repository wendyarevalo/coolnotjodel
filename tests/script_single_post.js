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
  let url = "http://127.0.0.1:7777/posts/1";
  http.get(url);
}
