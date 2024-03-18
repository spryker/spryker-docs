



Depending on the setup your team requested during the onboarding, you should have the following cloud environments:

* Optional: Development
* Staging
* Production

The various cloud environments are used for developing your project and running the live shop. For more details about cloud environments, see [Environments overview](/docs/ca/dev/environments-overview.html).

Your repository needs to be connected to one of the environments to push your local changes to the cloud, usually the development or staging environment. When you push some changes, depending on your CI/CD setup, the changes are either deployed automatically or you might need to deploy them manually. Once the changes are deployed, you'll be able to see them on the staging website.

* For instructions on connecting your repository to cloud environments, see [Connect a code repository](/docs/ca/dev/connect-a-code-repository.html).

* For instructions on configuring CI/CD pipelines, see [Configure deployment pipelines](/docs/ca/dev/configure-deployment-pipelines/configure-deployment-pipelines.html).

* For instructions on deploying changes manually, see [Deploy in a staging environment](/docs/ca/dev/deploy-in-a-staging-environment.html).
