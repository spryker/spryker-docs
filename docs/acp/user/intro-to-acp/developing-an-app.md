---
title: Developing an app
Descriptions: Learn how to develop an app
template: howto-guide-template
---

To develop an app, follow the instructions in this document.

## Prerequisites

- You have completed the [thought process](#thought-process) for your App.
- [Installed Spryker SDK](https://docs.spryker.com/docs/sdk/dev/spryker-sdk.html#installation).
- You have an empty GitHub repository.
- You have a local project directory where you want to work, for example `/www/my-app`.
 
## Thought process
First, think about what your app should be capable of: what features it will bring, and what data will be exchanged, not only to you but also to those interested in your app functionality. For example, what messages could be of interest for others, and what API endpoints you should provide. 

### API-first
It's strongly recommended that apps follow the API-first approach. API-first means that your app is centered on the API. It should be possible to perform every action via the scripting language and every piece of functionality should be available for other systems to leverage. For more information on the API-first approach, see [this blogpost](https://www.algolia.com/blog/product/the-5-principles-of-api-first-development-and-what-does-api-first-even-mean/).
You need to have a clear understanding of what your app API will provide to others and always keep that in mind when you design your app.

### Schema-first

Before you start with the development, you should design your API schema files first. Depending on your requirements, you will have an OpenAPI or an AsyncAPI schema file. In this step you define the SyncAPI endpoints your App will provide to others and/or which messages you will emit or consume as well as the data you expect to work with.

Read more about AsyncAPI schema design in this blog post 

 

Read more about OpenAPI schema design https://swagger.io/resources/articles/best-practices-in-api-design/

You can use the following tools to design your APIs: