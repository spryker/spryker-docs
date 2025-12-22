---
title: Development tools
description: Complete suite of development tools provided by Spryker for debugging, profiling, code quality assurance, and AI-assisted development.
last_updated: December 15, 2025
template: concept-topic-template
keywords: development tools, debugging, profiling, code quality, static analysis, xdebug, web profiler, phpstan, architecture sniffer, ai assistant
---

Spryker provides a comprehensive suite of development tools that cover every aspect of the development lifecycle—from debugging and performance profiling to code quality assurance and AI-assisted development. These integrated tools ensure developers have everything needed to build, maintain, and scale high-quality e-commerce applications efficiently.

## Why development tools are essential

Modern e-commerce development demands robust tooling to manage complexity, ensure code quality, and maintain high performance. Quality development tools provide:

- **Faster debugging**: Identify and fix issues quickly with proper debugging and profiling tools
- **Code quality**: Maintain high standards through automated static analysis and architectural validation
- **Performance optimization**: Profile application performance and identify bottlenecks before they reach production
- **Developer productivity**: Accelerate development with AI-assisted coding and automated quality checks
- **Upgradability**: Ensure your project follows best practices, making upgrades smoother and less risky
- **Team consistency**: Enforce coding standards and architectural patterns across the entire development team

Without proper development tools, projects accumulate technical debt, suffer from performance issues, and become increasingly difficult to maintain and upgrade.

## Spryker's complete development toolkit

Spryker provides an integrated ecosystem of development tools, eliminating the need to search for, evaluate, and configure third-party solutions. All tools are pre-configured to work seamlessly with Spryker's architecture and development workflow.

### Debugging tools

**Xdebug integration**

Spryker includes Xdebug support for interactive debugging and profiling:

- **Step-through debugging**: Set breakpoints, inspect variables, and trace code execution
- **Performance profiling**: Identify slow functions and performance bottlenecks

Documentation:
- [Configure Xdebug](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html)
- [Set up XDebug profiling](/docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/set-up-xdebug-profiling.html)

### Performance profiling tools

**WebProfiler**

WebProfiler is available for all Spryker application layers:

- [Web Profiler Widget for Yves](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html) - Storefront profiling
- [Web Profiler for Backend Gateway](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-backend-gateway.html) - API Gateway profiling
- [Web Profiler for Zed](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-zed.html) - Back Office profiling

### Code quality tools

Spryker provides a complete suite of code quality tools tailored to e-commerce development and Spryker's architecture:

**PHPStan - Static analysis**

PHPStan performs type checking and code analysis to catch bugs before runtime:

- Type safety validation
- Dead code detection
- Incorrect method calls identification
- Configuration: Pre-configured for Spryker projects at level 6

[PHPStan documentation](/docs/dg/dev/sdks/sdk/development-tools/phpstan.html)

**Code Sniffer - Code style enforcement**

Ensures consistent code formatting and adherence to coding standards:

- PSR-12 compliance
- Spryker-specific coding standards
- Automatic code style fixing capabilities
- IDE integration for real-time feedback

[Code Sniffer documentation](/docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html)

**Architecture Sniffer - Spryker architecture validation**

Validates that your code follows Spryker's architectural patterns and conventions:

- Layer separation enforcement (Yves, Zed, Client, Service)
- Module dependency validation
- Plugin architecture compliance
- Facade pattern adherence

[Architecture Sniffer documentation](/docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html)

**Project Architecture Sniffer - Project-specific validation**

Extends Architecture Sniffer with project-level rules and best practices:

- Project-specific architectural patterns
- Custom business logic validation
- Integration pattern compliance
- Upgradability checks

[Project Architecture Sniffer documentation](/docs/dg/dev/sdks/sdk/development-tools/project-architecture-sniffer.html)

**Evaluator - Upgradability and compatibility checks**

Validates project compatibility with Spryker core and checks upgrade readiness:

- Core module compatibility validation
- Deprecated feature detection
- Breaking change identification
- Upgrade path recommendations

[Evaluator tool documentation](/docs/dg/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html)

### AI-assisted development tools

Spryker embraces AI technology to accelerate development and improve code quality:

**AI Assistant**

AI-powered development assistance for Spryker projects:

- Code generation for Spryker modules and patterns
- Best practice recommendations
- Documentation lookup and integration assistance
- Common task automation

[AI Assistant documentation](/docs/dg/dev/ai/ai-assistants/ai-assistants.html)

**AI Dev Tool**

Advanced AI development capabilities integrated into the development workflow:

- Intelligent code suggestions
- Architectural pattern guidance
- Automated refactoring recommendations
- Context-aware documentation

[AI Dev Tool documentation](/docs/dg/dev/ai/ai-dev/ai-dev-overview.html)

## Integrated development workflow

All Spryker development tools work together seamlessly:

1. **Write code** with AI Assistant guidance
2. **Debug issues** using Xdebug integration
3. **Profile performance** with WebProfiler
4. **Validate quality** with Code Sniffer, PHPStan, and Architecture Sniffers
5. **Check upgradability** with Evaluator
6. **Run in CI** with automated validation pipelines

This integrated approach ensures consistent quality across the entire development process.

## Best practices

To maximize the value of development tools:

1. **Run tools locally**: Catch issues before pushing to CI
2. **Configure IDE integration**: Get real-time feedback while coding
3. **Use WebProfiler proactively**: Profile performance during development, not just when issues arise
4. **Review Evaluator output regularly**: Stay informed about upgrade compatibility
5. **Leverage AI tools**: Speed up development with AI-assisted code generation
6. **Enforce in CI**: Make quality checks mandatory in pull request pipelines
7. **Update regularly**: Keep development tools up-to-date to benefit from new features and improvements

Spryker provides everything developers need to build, maintain, and scale world-class e-commerce applications—no additional tooling required.