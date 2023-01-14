import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1000,
    duration: '10s',
    summaryTrendStats: ["avg","med", "p(95)", "p(99)"],
};

export default function (){
    let url = 'http://host.docker.internal:7800/';
    http.get(url);
    sleep(1);
}