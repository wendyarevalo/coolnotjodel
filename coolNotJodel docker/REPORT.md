# Project 2 report
# Cool code grader 😎

## Instructions ✅

### Run the containers 🚢

Once you downloaded and extracted the .zip to your computer, open a terminal and make sure your Docker daemon is running, then build the grader image with the `build.sh` script or by running the command `docker build -t grader-image .` in the "api/grader-image" folder.

After that, make sure you are in the root folder (`cd coolgrader`), and run the following command:

`docker compose up --build`

This will create 5 containers under `cool-grader`:
1. __web__, which is nginx.
2. __ui__, which has the front end with astro.
3. __api__, which has the back end with deno.
4. __flyway__, in charge of the migrations of the DB.
5. __dab-p2-database-459c5113-24bf-4cb6-acf3-a75ab3a19632__, a postgreSQL database.

Before running anything make sure __flyway__ has finished its execution. If it has been some (long) time and it is still running, stop __JUST__ flyway container and run it again. This is a bug of docker, even if it's marked as a dependency it does not mean the migrations have been run. 

### Try the app 🧑🏻‍💻

After flyway completed the migrations (and it is off), you can try the functionality by opening a browser and going to `http://localhost:7800`.

If you're shown an error saying:

<span style="color:red">__Unexpected token < in JSON at position 0__</span>

Please stop __ALL__ the containers and run them again (wait until flyway has run migrations). This is still part of an error in the DB.

Chose an exercise, send some code and wait for your result.

### Run the tests.

*K6*

If you want to run K6 tests make sure you are still in the right directory (`cd coolgrader`) and enter the folder with the scripts:

`cd tests``

And ake sure you have K6 image by running:

`docker pull grafana/k6``

Then, to test the main page run:

`docker run --rm -i grafana/k6 run - <script_main.js`

And the exercise saving by running:

`docker run --rm -i grafana/k6 run - <script_send_exercise.js`

*Lighthouse*

Go to your Chrome browser, enter the main page `http://localhost:7800`, run lighthouse tests, and wait for results.

For an exercise, just enter any exercise page you'd like, i.e.: `http://localhost:7800/exercises/1`, run lighthouse tests, and wait for results.

## Test Results 💯

The parameters of K6 tests are: 100 concurrent users for 10 seconds. 
Lighthouse tests results are for navigaion in desktop.
All tests were run individually.

### Main page

*K6*
>data_received..................: 1.3 MB 115 kB/s
>
>data_sent......................: 19 kB  1.6 kB/s
>
>http_req_blocked...............: avg=20.06ms  med=478.29µs p(95)=68.56ms  p(99)=78.11ms
>
>http_req_connecting............: avg=10.67ms  med=0s       p(95)=42.84ms  p(99)=49.78ms
>
>http_req_duration..............: avg=4.47s    med=4.44s    p(95)=4.93s    p(99)=4.94s
>
>{ expected_response:true }...: avg=4.47s    med=4.44s    p(95)=4.93s    p(99)=4.94s
>
>http_req_failed................: 0.00%  ✓ 0         ✗ 204
>
>http_req_receiving.............: avg=132.89ms med=111.08ms p(95)=204.15ms p(99)=262.66ms
>
>http_req_sending...............: avg=2.48ms   med=479.16µs p(95)=10.94ms  p(99)=17.8ms
>
>http_req_tls_handshaking.......: avg=0s       med=0s       p(95)=0s       p(99)=0s
>
>http_req_waiting...............: avg=4.33s    med=4.32s    p(95)=4.87s    p(99)=4.88s
>
>http_reqs......................: 204    17.999704/s
>
>iteration_duration.............: avg=5.49s    med=5.44s    p(95)=6s       p(99)=6s
>
>iterations.....................: 204    17.999704/s
>
>vus............................: 100    min=100     max=100
>
>vus_max........................: 100    min=100     max=100

*Lighthouse*

>Performance 100/100
>
>       First Contentful Paint: 0.5 s
>
>       Time to Interactive: 0.5 s
>
>       Speed Index: 0.5 s
>
>       Total Blocking Time: 0 ms
>
>       Largest Contentful Paint: 0.5 s
>
>       Cumulative Layout Shift: 0

### Exercise API

*K6*
>data_received..................: 288 kB 26 kB/s
>
>data_sent......................: 240 kB 22 kB/s
>
>http_req_blocked...............: avg=1.74ms   med=6.25µs  p(95)=8.87ms   p(99)=48.28ms
>
>http_req_connecting............: avg=1.14ms   med=0s      p(95)=6.39ms   p(99)=29.47ms
>
>http_req_duration..............: avg=74.78ms  med=1.97ms  p(95)=543.67ms p(99)=894.25ms
>
>{ expected_response:true }...: avg=149.56ms med=24.61ms p(95)=796.35ms p(99)=910.76ms
>
>http_req_failed................: 50.00% ✓ 898        ✗ 898
>
>http_req_receiving.............: avg=702.22µs med=64.27µs p(95)=1.98ms   p(99)=7.6ms
>
>http_req_sending...............: avg=588.77µs med=27.72µs p(95)=1.32ms   p(99)=15.12ms
>
>http_req_tls_handshaking.......: avg=0s       med=0s      p(95)=0s       p(99)=0s
>
>http_req_waiting...............: avg=73.49ms  med=1.71ms  p(95)=522.42ms p(99)=891.09ms
>
>http_reqs......................: 1796   163.195441/s
>
>iteration_duration.............: avg=1.16s    med=1.02s   p(95)=1.84s    p(99)=1.92s
>
>iterations.....................: 898    81.59772/s
>
>vus............................: 30     min=30       max=100
>
>vus_max........................: 100    min=100      max=100

*Lighthouse*

>Performance 100/100
>
>       First Contentful Paint: 0.5 s
>
>       Time to Interactive: 0.5 s
>
>       Speed Index: 0.5 s
>
>       Total Blocking Time: 0 ms
>
>       Largest Contentful Paint: 0.5 s
>
>       Cumulative Layout Shift: 0


## Reflection on results 🔍

The results for both main and api in Lighthouse are excellent, showing that static sites are faster than non-static ones. Working with Astro was easy and fast to learn.

The results with K6 aren't as good as with Lighthouse for the following reasons:

1. In the main page there's a request to get the exercises that the user has solved, which makes the duration a little longer oposed to having static data. But overall it was a good result.

2. In the exercise API results it is shown that 50% of the requests are failing, that is because the redirection in the API sends to localhost:7800, which is not in the scope of the k6 container, the other 50% are passing because in the script the route is specified as host.docker.internal:7800. 
The code is being saved and graded when it is needed, and when there is a result already it redirects to the result page only.
Apart from that, results are good overall.
One downside about k6 results is that if more vus are used more calls start failing because the pool in deno cannot support that many concurrent users.

## Suggestions for improving performance 🪄

The first thing I would change in my code is the queue I am using to handle the submissions to the grader, I am currently using Deno's queue (https://deno.land/x/queue@1.2.0) but the documentation does not specify how many nodes the queue can handle. I used it because it was easy to implement and it looks like there's no need to pop the elements manually. After they finish the execution they seem to go away.

I did not use a cache mechanism, instead I checked in the database if the exercise was solved before, so the user is shown the grade instead of the editor, and even when the user manually access the url of the editor (i.e localhost:7800/exercises/1) and the exercise is solved already it does not send the code to the grader. I see the benefits of using cache though, it is faster than checking in the database, but the downside is that if the cache is in the front end then the user might be able to modify their results.

Lastly, something that I did not like about astro is that there is no way to auto-grow the list of exercises, because it is not dynamic, meaning that I cannot loop over the results to create one element at a time. The same applies to query parameters in URLs, as we are using the static version, the parameters do not exist in the page! I used their recommendation of using path variables (i.e /exercises/[exId]), but in my opinion that is not scalable at all.