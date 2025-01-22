#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixHeadings(content) {
    // Parse frontmatter
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) return { content, changes: 0 };

    const frontmatter = fmMatch[1];
    const title = frontmatter.match(/title:\s*(.*)/)?.[1];
    if (!title) return { content: content, changes: 0 };

    // Get the content after frontmatter
    const body = content.slice(fmMatch[0].length);

    // Find all heading levels in the content (excluding code blocks)
    const lines = body.split('\n');
    let inCodeBlock = false;
    const headingLevels = [];

    lines.forEach(line => {
        if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            return;
        }
        if (inCodeBlock) return;

        const headingMatch = line.match(/^(#{1,6}) /);
        if (headingMatch) {
            headingLevels.push(headingMatch[1].length);
        }
    });

    if (headingLevels.length === 0) return { content: content, changes: 0 };

    // Find the highest level (minimum number of #)
    const highestLevel = Math.min(...headingLevels);

    // Calculate how many levels to shift to make highest level H2
    const levelShift = 2 - highestLevel;

    // If no shift needed (highest level is already H2), return unchanged
    if (levelShift === 0) return { content: content, changes: 0 };

    // Apply the shift to all headings while preserving code blocks
    let changes = 0;
    inCodeBlock = false;
    const fixedLines = lines.map(line => {
        if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            return line;
        }
        if (inCodeBlock) return line;

        const headingMatch = line.match(/^(#{1,6}) (.*)/);
        if (headingMatch) {
            const newLevel = Math.max(1, Math.min(6, headingMatch[1].length + levelShift));
            changes++;
            return `${'#'.repeat(newLevel)} ${headingMatch[2]}`;
        }
        return line;
    });

    return {
        content: `---\n${frontmatter}\n---${fixedLines.join('\n')}`,
        changes: changes
    };
}

function findMarkdownFiles(dir) {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results = results.concat(findMarkdownFiles(filePath));
        } else if (file.endsWith('.md')) {
            results.push(filePath);
        }
    }

    return results;
}

function processFile(filePath, stats) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const result = fixHeadings(content);
        stats.totalFiles++;

        if (result.changes > 0) {
            fs.writeFileSync(filePath, result.content);
            console.log(`Processed ${filePath} - ${result.changes} heading(s) adjusted`);
            stats.filesChanged++;
            stats.totalHeadingsAdjusted += result.changes;
        } else {
            console.log(`Processed ${filePath} - no changes needed (headings already correct)`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

// Get command line arguments
const args = process.argv.slice(2);

// If no arguments provided, process all .md files in /docs/
let filesToProcess;

if (args.length === 0) {
    console.log('No files specified, processing all .md files in /docs/...\n');
    filesToProcess = findMarkdownFiles('docs');
} else {
    filesToProcess = args;
}

// Initialize statistics
const stats = {
    totalFiles: 0,
    filesChanged: 0,
    totalHeadingsAdjusted: 0
};

// Process all files
filesToProcess.forEach(file => processFile(file, stats));

// Print detailed summary
console.log('\nSummary:');
console.log(`Total files checked: ${stats.totalFiles}`);
console.log(`Files that needed changes: ${stats.filesChanged}`);
console.log(`Total headings adjusted: ${stats.totalHeadingsAdjusted}`);
