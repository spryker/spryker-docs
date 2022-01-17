<?php

namespace Validator;

use ErrorException;
use Spatie\YamlFrontMatter\YamlFrontMatter;
use Symfony\Component\Console\Helper\FormatterHelper;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class LastUpdatedValidator
{
    /**
     * @var bool
     */
    private $isValid = true;

    /**
     * @var \Symfony\Component\Console\Output\OutputInterface
     */
    private $output;

    /**
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return void
     */
    public function __construct(OutputInterface $output)
    {
        $this->output = $output;
    }

    /**
     * @param string $directory
     *
     * @return bool
     */
    public function validate(string $directory): bool
    {
        $finder = $this->getFinder($directory);

        foreach ($finder as $document) {
            $this->validateRelatedDocumentsLastUpdatedDates($document);
        }

        return $this->isValid;
    }

    /**
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return void
     */
    private function validateRelatedDocumentsLastUpdatedDates(SplFileInfo $document): void
    {
        $documentFrontMatter = YamlFrontMatter::parse($document->getContents())->matter();
        $documentLastUpdated = $documentFrontMatter['last_updated'] ?? null;
        $relatedDocuments = $documentFrontMatter['related'] ?? null;

        if ($documentLastUpdated === null) {
            $this->logError(sprintf('%s doesn\'t have `last_updated` front matter setting', $document->getPathname()));

            return;
        }

        if ($relatedDocuments === null) {
            return;
        }

        $relatedDocumentsPaths = $this->buildRelatedDocumentsPaths(
            $relatedDocuments,
            $document
        );

        foreach ($relatedDocumentsPaths as $relatedDocumentPath) {
            $this->validateRelatedDocumentLastUpdated(
                $relatedDocumentPath,
                $document,
                $documentLastUpdated
            );
        }
    }

    /**
     * @param array $relatedDocuments
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return string[]
     */
    private function buildRelatedDocumentsPaths(array $relatedDocuments, SplFileInfo $document): array
    {
        $relatedDocumentPaths = [];
        $search = ['.html'];
        $replacements = ['.md'];
        $documentVersion = $this->getDocumentVersion($document);

        if ($documentVersion !== null) {
            $search[] = '/page.version/';
            $replacements[] = $documentVersion;
        }

        foreach ($relatedDocuments as $relatedDocument) {
            $relatedDocumentTitle = $relatedDocument['title'] ?? '';
            $relatedDocumentLink = $relatedDocument['link'] ?? '';
            $relatedDocumentPath = realpath(ROOT_DIR . str_replace($search, $replacements, $relatedDocumentLink));

            if (empty($relatedDocumentPath)) {
                $this->logError(
                    sprintf('Related document "%s" does not exist for %s', $relatedDocumentTitle, $document->getPathname())
                );

                continue;
            }

            $relatedDocumentPaths[] = $relatedDocumentPath;
        }

        return $relatedDocumentPaths;
    }

    /**
     * @param string $relatedDocumentPath
     * @param \Symfony\Component\Finder\SplFileInfo $document
     * @param string|null $documentLastUpdated
     *
     * @return void
     */
    private function validateRelatedDocumentLastUpdated(string $relatedDocumentPath, SplFileInfo $document, ?string $documentLastUpdated): void
    {
        try {
            $relatedDocumentFrontMatter = YamlFrontMatter::parse(file_get_contents($relatedDocumentPath))->matter();
            $relatedDocumentLastUpdated = $relatedDocumentFrontMatter['last_updated'] ?? '';

            if ($relatedDocumentLastUpdated === '') {
                $this->logError(
                    sprintf('%s doesn\'t have `last_updated` front matter setting', $document->getPathname()));
            }

            if ($documentLastUpdated !== $relatedDocumentLastUpdated) {
                $this->logError(
                    sprintf('`last_updated` values in document %s and its related document %s don\'t match', $document->getPathname(), $relatedDocumentPath)
                );
            }
        } catch(ErrorException $e) {
            $this->logError($e->getMessage());
        }
    }

    /**
     * @param string $documentPath
     *
     * @return string|null
     */
    private function getDocumentVersion(SplFileInfo $document): ?string
    {
        preg_match('/\/(\d+\.\d+)\//', $document->getPathname(), $matches);

        return $matches[0] ?? null;
    }

    /**
     * @param string $directory
     *
     * @return \Symfony\Component\Finder\Finder
     */
    private function getFinder(string $directory): Finder
    {
        $finder = new Finder();
        $finder->files()->in($directory);

        return $finder;
    }

    /**
     * @param string $errorMessage
     *
     * @return void
     */
    private function logError(string $errorMessage): void
    {
        $this->isValid = false;
        $formatterHelper = new FormatterHelper();
        $errorMessages = ['Error!', $errorMessage];
        $formattedBlock = $formatterHelper->formatBlock($errorMessages, 'error');

        $this->output->writeln($formattedBlock);
    }
}
