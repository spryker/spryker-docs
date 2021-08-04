---
title: About Spryker Documentation
originalLink: https://documentation.spryker.com/v3/docs/about-documentation
redirect_from:
  - /v3/docs/about-documentation
  - /v3/docs/en/about-documentation
---

Spryker Documentation is a central hub for knowledge and information about the [Spryker Commerce OS](https://documentation.spryker.com/v4/docs/about-spryker#what-is-the-spryker-commerce-os--scos--). It details the aspects involved with setting up and using Spryker for your project. 

We try to organize our documentation in such a way that it would be easy to find and utilize for various target users. To achieve this, we do the following:

* [Split documentation](https://documentation.spryker.com/preview/v4/docs/about-documentation##documentation-breakdown) into documentation for specific target groups and tasks they want to accomplish.
* Separate feature documentation into articles for various [personas](https://documentation.spryker.com/v4/docs/about-documentation#personas): Developer, Back-Office User, and Shop User.
* Version documentation according to the [product releases](/docs/scos/dev/about-spryker/202001.0/releases/release-notes/release-notes). To select a version for a specific product release, choose the version in the green dropdown on the right of each article.
*	Use [tags](https://documentation.spryker.com/v4/docs/about-documentation#tags) to distinct documentation by product versions and help you understand whether the documentation refers to B2B or B2C features.
* Use [In-App assistant](#inapp) to allow finding documentation faster.

## Documentation Breakdown
The Spryker documentation is broken into the following sections:
**[About](/docs/scos/dev/about-spryker/202001.0/about-spryker)**: Is for people who are thinking about adopting the Spryker Commerce OS. Here you will find all the information you need to help you make your decision. This section also contains the Spryker release notes, documentation updates, and news.
**[Features](https://documentation.spryker.com/v4/docs/features)**: Contains descriptions of all Spryker features categorized into Capabilities. Feature overview pages contain a list of tasks and articles relevant for Developers, Back Office Users, and Shop Users. See Personas for more information about these target groups.
**[User Guides](/docs/scos/dev/user-guides/201907.0/about-user-guid)**: Meant primarily for the end-users who need assistance navigating and using features of the Spryker Back Office and Storefront.
**[Developer Guides](/docs/scos/dev/developer-guides/202001.0/about-developer)**: Meant for the developers and contain instructions on how to install and configure Spryker for your project. This section will also help you understand the technical essentials and concepts of the Spryker Commerce OS.
**[Glue API](/docs/scos/dev/glue-api/202001.0/glue-rest-api)**: Provides an overview of the Glue Rest API feature resources and general information on the Glue API infrastructure. These guides are meant both for developers and the API users.
**[Technology Partners](https://documentation.spryker.com/v4/docs/partner-integration)**: Here, the developers will find the instructions on how to integrate third-party technology partners into your Spryker project.
**[Migration and Integration](/docs/scos/dev/migration-and-integration/201907.0/about-migration)**: Holds feature integration and module migration guides for the developers.
**[Tutorials](/docs/scos/dev/tutorials/202001.0/about-tutorials)**: Contains step-by-step instructions on how to perform all types of technical tasks with the Spryker Commerce OS. This section is meant for developers.

## Personas
In our documentation, we refer to the following personas: 

* Developer
* Back Office User
* Shop User 

We also use these personas to categorize articles related to individual features. See [Business on Behalf feature summary page](/docs/scos/dev/features/202001.0/company-account-management/business-on-behalf/business-on-beh) for example.
The table below shows what specific roles each persona includes and what each role is up to:

<table>
    <thead>
        <tr>
            <th>Persona</th>
            <th>Includes roles</th>
            <th>Role description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=4>Developer</td>
                   </tr>
            <tr>
            <td>Backend Developer</td>
            <td>Their main tasks are the development and update of the backend part for the new and existing features.</td>
        </tr>
        <tr>
            <td>Frontend Developer</td>
            <td>Their main tasks are the development and update of the frontend part for the new and existing features. </td>
        </tr>
        <tr>
            <td>DevOps</td>
            <td>Their main tasks is the upkeep of all business critical systems, especially websites and systems available for public access, making sure all business- critical systems are available, reliable, and work as intended.</td>
        </tr>
        </tbody>
      <tbody>
        <tr>
            <td rowspan=8>Back Office User</td>
            <td >Spryker Administrator</td>
            <td>The Spryker Administrator is responsible fort he entire setup and management of the E-commerce system: stores creation and configuration, payment methods, warehouses setup etc. Most of this work is done in Spryker Back-Office, but they may have to talk to developers in some cases to have things done.
</td>
        </tr>
        <tr>
            <td>Marketing Content Manager</td>
            <td>Responsible for managing content in online store and apps to increase sales.</td>
        </tr>
        <tr>
            <td>Merchant Fulfillment Manager </td>
            <td>Responsibilities:<ul>
                <li>Accept/reject new orders</li>
                <li>Approve/verify/watch payment for the orders</li>
                <li>Manage information transfer between the commerce system and the fulfillment provider software</li>
                <li>Watch fulfillment process via dashboard or directly inside the warehouses</li>
                <li>Report to Customer Service when a problem arises for an order</li>
                <li>Process returns</li>
                </ul>
</td>
        </tr>
        <tr>
            <td>Fulfillment / Order Manager</td>
            <td>Responsibilities:<ul>
                <li>Accept/reject new orders</li>
                <li>Approve/verify/watch payment for the orders</li>
<li>Manage information transfer between the commerce system and the fulfillment provider software</li>
                <li>Watch fulfillment process via dashboard or directly inside warehouses</li>
                <li>Report to Customer Service when a problem arise for an order</li></ul>
 </td>
        </tr>
        <tr>
            <td>Product Catalog Manager</td>
            <td>A Category Manager gathers insights about how customers perceive product categories and products by analyzing customer behavior in the frontend. He/she manages prices and promotions for products. </td>
             <tr>
            <td>Merchant Catalog Manager</td>
            <td>Responsibilities:<ul>
                <li>Creation and management of offers and products</li>
                <li>Management of prices for products and offers</li>
                <li>Assigning products to categories</li>
                <li>All merchandising operations like creating bundles, defining product options, or assigning labels</li>
                </ul>
</td>
        </tr>
             <tr>
            <td>Marketplace Administrator</td>
            <td>A marketplace operator is a company that offers a platform (online marketplace) to other third parties (merchants: retailers or wholesalers). An online marketplace is a type of e-commerce site where products are delivered and fulfilled by multiple merchants, whereas customer transactions are processed by the marketplace operator. The marketplace operator can have own physical or digital inventory (Amazon, Zalando, Apple) but it is not a must (Ebay, Idealo)</td>
        </tr>
                              <tr>
            <td>DevOps</td>
            <td>Their main tasks is the upkeep of all business-critical systems, especially websites and systems available for public access, making sure all business- critical systems are available, reliable, and work as intended.</td>
        </tr>
              </tbody>
         <tbody>
        <tr>
            <td rowspan=2>Shop User</td>
            <td >B2C Buyer</td>
            <td>A person who visits a shop and can buy products/services from it.</td>
        </tr>
        <tr>
            <td>B2B Buyer</td>
            <td>A person (impersonating a Company) buying products/services from a B2B Company.</td>
        </tr>
        <tr>
        </tr>
        </tbody>
</table>

## Tags
Tags help you to easier find documentation which is relevant for you. Tags are displayed on the right of the article, under the Table of Contents.
We use the following tags:

* **B2B Shop**: Feature/topic in question is applied to [B2B Demo Shop](https://documentation.spryker.com/v4/docs/demoshops#b2b-demo-shop).
* **B2C Shop**: Stands for [B2C Demo Shop](https://documentation.spryker.com/v4/docs/demoshops#b2c-demo-shop) features / topics.
* **Demoshop**: Signifies that feature/topic refers to the [Legacy Demoshop](https://documentation.spryker.com/v4/docs/about-spryker#what-is-the--legacy-demoshop---) only.
* **Versions** (201811.0, 201903.0, 201907.0 etc.):  Indicate what [product version\(s\)](/docs/scos/dev/about-spryker/202001.0/releases/release-notes/release-notes) the feature described in the document relates to. 
{% info_block infoBox %}
You can filter out the documents by specific product versions. For this, select the version in the top right green dropdown.
{% endinfo_block %}
<a name="inapp"></a> 
<!---* **In-App Assistant**: Widget on the main page of the Spryker documentation website that allows you to find top search articles quickly. To open the In-App Assistant, click on a blue book icon in the bottom left corner:  

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker+Documentation/InApp+Assistant.png){height="" width=""}-->

## Feedback

### Sending your Feedback
We are striving to improve our documentation, make it easier for you to find the necessary articles, and provide you with all the information you need. You can help us with that by sending your comments and suggestions to [academy@spryker.com](mailto:academy@spryker.com)

### Rating Articles
Your feedback is very important and much valued! Let us know what you think by clicking **Yes** or **No** for **Was this article helpful?** at the end of every article.

## Contributing to the Documentation
We at Spryker aim to constantly improve the content we provide our customers and partners with. You can get involved in improving the Spryker documentation by reporting issues and editing documentation via pull requests on GitHub.
{% info_block infoBox %}
To report issues and fix documentation, you need a [GitHub account](https://github.com/join
{% endinfo_block %}. Make sure you are logged in to proceed with issue reports and pull requests.)
### Reporting Issues
To report a documentation issue, do the following:
1.	On an article page, click **Edit or Report** under the title of the article.
2.	In the Spryker documentation GitHub repository, click **Issues** tab.
3.	Click **New issue** on the right.
4.	Fill in the required information and click **Submit issue**.

### Editing Documentation
To edit a page directly on GitHub, do the following:
1.	On an article page, click **Edit or Report** under the title of the article.
2.	Fork the repository to propose changes.
3.	Click **Edit this file** and make the changes.  

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker+Documentation/Edit+on+GitHub.png){height="" width=""}
{% info_block infoBox %}
Spryker documentation is written using Markdown. If you don’t know Mardown yet, check the [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/
{% endinfo_block %}. )
4.	Once done, select **Create a new branch for this commit and start a pull request**. At the bottom of the page, give your branch a name and click **Propose file change**.

That’s it! Your Pull Request has been created. Our Documentation team will review it, and once approved, your changes will be merged and available on the documentation website.


<font size="2"> *All terms and regulations are provided in the [Disclaimer](https://github.com/spryker/spryker-documentation).*</font> 

