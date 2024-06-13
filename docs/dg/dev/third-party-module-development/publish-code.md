---
title: How to publish module on GitHub
description: How to publish module on GitHub
last_updated: Jun 7, 2024
template: howto-guide-template

---

# Guide to Publishing Code to GitHub

GitHub is a popular platform for hosting and sharing code repositories. Follow these steps to publish your code to GitHub:

## 1. Create a GitHub Account

If you haven't already, sign up for a GitHub account at [github.com](https://github.com/).

## 2. Install Git

Git is a version control system used to manage and track changes in your code. Install Git from [git-scm.com](https://git-scm.com/) if you haven't already.

## 3. Set Up Git

Configure Git with your username and email address:

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

## 4. Create a New Repository

- Log in to GitHub and click on the "+" icon in the top-right corner.
- Select "New repository."
- Name your repository and add a description.
- Choose if the repository will be public or private.
- Click "Create repository."

## 5. Initialize a Local Git Repository

Navigate to your project directory in your terminal and initialize a Git repository:

```bash
cd /path/to/your/project
git init
```

## 6. Add Your Files

Add your project files to git:

```bash
git add .
```

## 7. Commit Your Changes

Commit your changes with a descriptive message:

```bash
git commit -m "Initial commit"
```

## 8. Link Your Local Repository to GitHub

Link your local repository to the GitHub repository you created:

```bash
git remote add origin https://github.com/your-username/your-repository.git
```

## 9. Push Your Code to GitHub

Push your code to GitHub:

```bash
git push -u origin master
```

## 10. Verify Your Code on GitHub

Refresh your GitHub repository page to see your code published.

Congratulations! You have successfully published your code to GitHub.