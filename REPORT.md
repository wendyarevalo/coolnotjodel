# Project 3 report

# Not jodel but cool anyway 😎

## Instructions ✅

### Minikube

You can get minikube directly on their site. Here are the steps I followed for
Mac M1 (Docker needs to be running):

1. Get minikube with curl:
   `curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64`
2. Install minikube:
   `sudo install minikube-darwin-arm64 /usr/local/bin/minikube`
3. Add a host in etc/hosts for minikube:
   `mkdir -p ~/.minikube/files/etc echo 127.0.0.1 my.kube > ~/.minikube/files/etc/hosts`
4. Start minikube: `minikube start --driver=docker`
5. Enable addons: `minikube addons enable metrics-server`
   `minikube addons enable ingress`
6. Start the dashboard: `minikube dashboard`
7. In a separate terminal start the tunnel: `sudo minikube tunnel`

### Deploy the project

Once you downloaded and extracted the .zip to your computer, open a terminal and
make sure your Docker daemon is running. Make sure you are in the root folder
(`cd coolnotjodel`), and run the following commands for building each image:

1. PG Cloud Native:
   `kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.18/releases/cnpg-1.18.0.yaml`
2. Flyway migrations:
   `minikube image build my-flyway-migrations -t my-flyway-migrations .`
3. Deno API: `minikube image build my-api -t my-api .`
4. Astro UI: `minikube image build my-ui -t my-ui .`

After all the images are built, apply kubernetes configurations.

<span style="color:orange"> NOTE: Follow the specified order and wait until
each of them has been successfully deployed in the dashboard, this will prevent
errors</span>

1. Database: `kubectl apply -f kubernetes/my-database-config.yaml`
2. Migration job: `kubectl apply -f kubernetes/my-database-migration-job.yml`
3. API and UI: `kubectl apply -f kubernetes/app`

This will create 2 database clusters that will be fed with the migration job.
An API app deployment with 1 pod and a service, and a UI app with 1 pod and a
service.

### Autoscaling

Autoscaling was set to have a minimum of 1 pod and maximum of 3 when the cpu
utilisation is bigger than 25%. To add autoscaling to the apps, run the following
commands. If you want to make them auto-scale, run K6 tests, after they're done
it will take some time to downscale, be patient 😊

1. API app
   `kubectl autoscale deployment my-api-app --min=1 --max=3 --cpu-percent=25`
2. UI app
   `kubectl autoscale deployment my-ui-app --min=1 --max=3 --cpu-percent=25`

### Try the app 🧑🏻‍💻

You can now access the app in `http://127.0.0.1`.

I recommend opening the developer tools and monitor the console, Astro dev fails
sometimes due to unknown reasons, just refresh the page until there are no
errors in the window nor in the console.

The project fulfills all the basic and merit requirements, feel free to test
them out.

### Run the tests.

<span style="color:green"> K6 </span>

If you want to run K6 tests make sure you are still in the right directory
(`cd coolnotjodel`) and enter the folder with the scripts:

`cd tests`

I used k6 locally to be able to access the apps. All tests are intended to make
the apps autoscaling, using thresholds for http_req_duration and http_req_failed.

To test the main page run:

`k6 run - <script_main.js`

Individual post page:

`docker run --rm -i grafana/k6 run - <script_single_post.js`

Saving post:

`docker run --rm -i grafana/k6 run - <script_save_post.js`

Saving response:

`docker run --rm -i grafana/k6 run - <script_save_response.js`

Upvote:

`docker run --rm -i grafana/k6 run - <script_upvote.js`

Down-vote:

`docker run --rm -i grafana/k6 run - <script_downvote.js`

<span style="color:green"> Lighthouse </span>

Go to your Chrome browser (incognito recommended), enter the main page
`http://127.0.0.1`, run lighthouse tests, and wait for results.

For a single post, just enter any post page you'd like, i.e.:
`http://127.0.0.1/post/15`, run lighthouse tests, and wait for results.

## Test Results 💯

The parameters of K6 stress tests were:

3 stages:

1. duration: "2m", target: 5.
2. duration: "5m", target: 10.
3. duration: "2m", target: 5

Testing thresholds for http_req_duration less than 300 ms, and http_req_failed
less than 0.01 percent.

Lighthouse tests results are for navigation in desktop. All tests were run
individually.

### Main page

_K6_

> ✗ http_req_duration..............: avg=35.22ms med=19.97ms p(95)=85.59ms
> p(99)=159.2ms { expected_response:true }...: avg=35.22ms med=19.97ms
> p(95)=85.59ms p(99)=159.2ms
>
> ✓ http_req_failed................: 0.00% ✓ 0 ✗ 95078
>
> iterations.....................: 95078 176.059326/s
> 
> vus............................: 6 min=1 max=10 
> 
> vus_max........................: 10 min=10 max=10

_Lighthouse_

> Performance 100/100

    >   First Contentful Paint: 0.5 s
    >
    >   Time to Interactive: 0.5 s
    >
    >   Speed Index: 0.5 s
    >
    >   Total Blocking Time: 0 ms
    >
    >   Largest Contentful Paint: 0.5 s
    >
    >   Cumulative Layout Shift: 0

### Single post page

_K6_

> ✓ http_req_duration..............: avg=14.51ms med=6.33ms p(95)=62.36ms
> p(99)=85.62ms { expected_response:true }...: avg=14.51ms med=6.33ms
> p(95)=62.36ms p(99)=85.62ms
>
> ✓ http_req_failed................: 0.00% ✓ 0 ✗ 229911
>
> iterations.....................: 229911 425.741881/s
> 
> vus............................: 6 min=1 max=10
> 
> vus_max........................: 10 min=10 max=10

_Lighthouse_

> Performance 100/100

    >   First Contentful Paint: 0.5 s
    >
    >   Time to Interactive: 0.5 s
    >
    >   Speed Index: 0.5 s
    >
    >   Total Blocking Time: 0 ms
    >
    >   Largest Contentful Paint: 0.5 s
    >
    >   Cumulative Layout Shift: 0

### API New Post

_K6_

> ✓ http_req_duration..............: avg=11.69ms med=7.1ms p(95)=39.41ms
> p(99)=67.02ms { expected_response:true }...: avg=11.69ms med=7.1ms
> p(95)=39.41ms p(99)=67.02ms
>
> ✓ http_req_failed................: 0.00% ✓ 0 ✗ 284351
>
> iterations.....................: 284351 526.521684/s
> 
> vus............................: 6 min=1 max=10
> 
> vus_max........................: 10 min=10 max=10

### API new response for post

_K6_

> ✓ http_req_duration..............: avg=10.75ms med=6.88ms p(95)=33.89ms
> p(99)=60.16ms { expected_response:true }...: avg=10.75ms med=6.88ms
> p(95)=33.89ms p(99)=60.16ms
>
> ✓ http_req_failed................: 0.00% ✓ 0 ✗ 308921
>
> iterations.....................: 308921 572.032006/s
> 
> vus............................: 6 min=1 max=10
> 
> vus_max........................: 10 min=10 max=10

### API upvote a post

_K6_

> ✓ http_req_duration..............: avg=10.98ms med=7.92ms p(95)=31.96ms
> p(99)=54.04ms { expected_response:true }...: avg=10.98ms med=7.92ms
> p(95)=31.96ms p(99)=54.04ms
>
> ✓ http_req_failed................: 0.00% ✓ 0 ✗ 303352
>
> iterations.....................: 303352 561.715962/s
> 
> vus............................: 6 min=1 max=10
> 
> vus_max........................: 10 min=10 max=10

### API down-vote a post

_K6_

> ✓ http_req_duration..............: avg=10.63ms med=7.16ms p(95)=32.57ms
> p(99)=52.42ms { expected_response:true }...: avg=10.63ms med=7.16ms
> p(95)=32.57ms p(99)=52.42ms
>
> ✓ http_req_failed................: 0.00% ✓ 0 ✗ 313420
>
> iterations.....................: 313420 580.254888/s
> 
> vus............................: 6 min=1 max=10
> 
> vus_max........................: 10 min=10 max=10

## Reflection on results 🔍

Lighthouse results for tha main page and single post page are excellent, showing
that static sites are faster than non-static ones, even though there is some
fetching it is not affecting performance. The infinite scroll also helps to not
doing a super long request to the back end (I know that if the single post page
had thousands of responses the performance would decrease significantly)

K6 results for the main page didn't pass the threshold of 300 ms, but it is
still a good average, maybe it took some time for the pod replicas to work properly.

All the other results in k6 look excellent to me, showing that the app is ready
to work under stress.

## Suggestions for improving performance 🪄

Here are some things I would like
to do for improvement:

1. I would like to test the app with more concurrent users and see how it
   behaves in order to have much more idea on what to improve.
2. I would like to test Astro in production mode instead of dev, I think it is
   not as reliable in that mode.
3. Making a better UI would be the next thing, I think there is room for
   improvement to do things more smooth.
4. I will also include the infinite scroll in the single page with responses to
   decrease the number of results retrieved at a time.
5. I would use a pub/sub service instead of Server Sent Events to know if there
   were changes in the backend.
