---
title: Environment scaling
description: Learn how Spryker's environment scaling adjusts resources dynamically to meet load demands, with strategies for vertical and horizontal scaling to ensure performance.
last_updated: MAy 23, 2024
template: concept-topic-template
---

Production environments, unlike staging environments, are equipped with auto-scaling capabilities. This enables the resources used by the application to dynamically scale up or down based on the current load. This document uses the checkout analogy as an example to explain the types of scaling.

## General considerations

- While all production environments offer some form of automatic scaling by default, environments must be optimized for your work load. To do it, schedule a load test by creating a "Announce High Load/Traffic" case at the [support portal](https://support.spryker.com). Plan for at least three days of lead time.
- Load tests are usually performed in rounds. After deploying a typical infrastructure configuration for the size of your project, we'll ask you to perform load testing. The results are analyzed and the environment is dialed in. This pattern is repeated until the environment is configured to support the expected load. For a good result, two to three rounds are needed.
- We don't recomment load testing in live production environments because this can affect the experience of your visitors. Instead, book a production-like environment or upgrade one of your non-production environments to perform the tests.

## Cloud architecture

EC2 hosts are used to deploy Docker containers. One host generally has multiple containers running with Spryker services, such as Yves and BackGW. The containers may only reserve up to the configured amount of CPU and RAM of the host machine. Additional hosts, up to a configured maximum number of hosts, are deployed as needed so that more containers can be placed on them in scaling events.

## Vertical scaling

In vertical scaling, we are making something "bigger". In the checkout analogy, we are "deploying" a more experienced sales clerk who has a higher "throughput" and can process more clients. In our cloud infrastructure, components that currently don't support horizontal auto-scaling are scaled vertically based on alert conditions. This applies to services such as Redis, OpenSearch, RabbitMQ, Jenkins, and RDS. Vertical scaling is also used in "task definitions". This is a configuration that determines how much CPU and RAM is available to Docker containers for services. As described in the following sections, services such as Yves are also horizontally auto-scaled by deploying more Yves containers. The containers themselves can be vertically scaled by configuring the CPU and RAM they are allowed to reserve on the host.

## Horizontal scaling

In horizontal scaling, we are "adding more of the same" to a resource to balance out load across multiple processors. In the checkout analogy, horizontal scaling means opening another checkout line. We "deploy" another clerk so they can open up another checkout line, and the waiting customers can spread out over the two lines.

The cloud infrastructure is set up in a way that provides horizontal autoscaling based on AWS native ECS Service Auto Scaling. Horizontal autoscaling is currently configured for Spryker services, such as Yves, Glue, Back Office, BackGW, and BackAPI, and enables these services to horizontally scale based on load. This is guard-railed by a setting that determines the minimum, desired, and maximum numbers of members of a service scaling group. A load balancer in front of each service is responsible for distributing the load across these services.

### Step scaling

There is an autoscaling configuration that has a service-level CPU threshold configured for a "scale up" (often 50%) and "scale down" (often 25%) scenario. If the scale up threshold is exceeded by a service, more containers of that service are deployed until the maximum number of members of a scaling group is reached. If the load subsides, containers are deprovisioned until the desired amount. Even if there is no load, the container count will never be deprovisioned below the minimum number of scaling group members. There is a lot of logic inside the ECS Auto Scaling feature. For an entry article on this topic, see [Automatically scale your Amazon ECS service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html).

You can test autoscaling by applying load to the aforementioned services of your application. The application will automatically scale, which might visible by by "steps" in your monitoring—response time climbing until a new container is provisioned, which will make it fall again. You should also be able to see new containers being deployed when checking the ECS overview of the service you are load testing.

Because autoscaling is guard-railed by a maximum number of scaling group members, we recommend load and performance testing before going live, so that this maximum number can be dialed in more easily. While our monitoring team can adjust these settings on the fly as well, we recommend applying a realistic load to the application (containing the data you want to use in production) before going live. This  also helps adjust the container CPU and memory budget, which determines how much CPU and memory each service "gets" compared to other containers. This helps to further optimize the setup.

There's an inherent delay in horizontal scaling on application tasks. So, try to avoid significant load spikes by spreading out expected load as much as possible, for example–by staggering marketing email campaigns. While testing with high requests per minute without "warmup" (gradually ramping up the traffic over several minutes to allow step scaling to deploy now tasks) is generally a good way to test whether the autoscale guardrails are set correctly, the application will need to be prepared on our side for this testing scenario - we temporary deploy the maximum count of tasks configured for your environment. You can mention this as a comment in your Load Event Announcement. Without it, expect timeouts during your load test if it's significant enough to overwhelm the vertical scaling buffers configured for the environment.

## Example load test

1. Warm-up period (0-10 minutes):
- Traffic: Start with 10-20% of the expected peak traffic.
- Purpose: Gradually ramp up the load to avoid sudden spikes and allow the system to stabilize.

2. Scale-up period (10-20 minutes):
- Traffic: Ramp up the traffic to 50% of the expected traffic peak.
- Purpose: The vertical buffer should now be overwhelmed and horizontal autoscaling will provide additional containers to spread out the load.

3. Peak load period (20-30 minutes):
- Traffic: Increase to 80-100% of the expected peak traffic.
- Purpose: Test the system's ability to handle maximum load and trigger auto-scaling.

4. Break period (30-40 minutes)
- Traffic: Reduce to 10-20% of the peak traffic.
- Purpose: Allow the system to scale down and observe how it handles reduced load.

Repeat steps 1-4 two times and check your results.

## Additional notes

The upper limit for both host and container counts protects us from excessive costs caused by DDOS attacks and similar threats. It  also protects connected infrastructure components from being affected by load spikes. This prevents load-based attacks on your projects through our infrastructure.

To dial in appropriate max levels, a load test prior to going live is mission critical. In this load test, you help to establish expected (normal) load as well as peak load for your environment. After that, a buffer is applied, and the max numbers for containers and hosts will be set. If an application is continuously under heavy load, it indicates that the configured maximum is not enough. Our monitoring team is alerted about such events and can increase the limits on the fly.

Load testing is also crucial because horizontal scaling doesn't happen in real-time and sets in with a delay. It can take some minutes for new containers to be deployed, especially if that means a new EC2 host needs to be deployed onto which new containers can be placed. So, scaling events are only a tool to catch variances in load in a delayed manner. By load testing your application, the task definitions of your services can be adjusted so that services that are bottlenecking your applications are assigned more resource budget from the get-go. This will result in fewer autoscaling events as the bottleneck can deal with more traffic before scaling needs to happen. Variances in your load will therefore lead to less "corrective action", which makes for a more consistent and smoother experience during peak load.

Generally, "spiky" load profiles should be avoided where possible. Marketing activities, such as mass emails with direct links to offers, often lead to immense load spikes. Mostly not because many users might click the link at the same time, but because many email providers open links contained in email messages to do security checks on them. Depending on the scale of your campaign, this can lead to serious spikes in your application. Staggering campaigns, even if you are only reducing the number of emails sent per second, can already help even out the load and let the application to scale out.

## Conclusion

Spryker cloud uses a sophisticated scaling strategy that leads to a performant and smooth experience for your users. To take advantage of this strategy, make sure to load test your application before go-live and when you adjust the application in meaningful ways.
