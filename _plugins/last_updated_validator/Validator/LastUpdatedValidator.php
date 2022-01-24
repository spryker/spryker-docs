<?php

namespace Validator;

use ErrorException;
use Spatie\YamlFrontMatter\Document;
use Spatie\YamlFrontMatter\YamlFrontMatter;
use Symfony\Component\Console\Helper\FormatterHelper;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class LastUpdatedValidator
{
    /**
     * @var \Symfony\Component\Console\Output\OutputInterface
     */
    private $output;

    /**
     * @var \Symfony\Component\Console\Helper\FormatterHelper
     */
    private $formatterHelper;

    /**
     * @param \Symfony\Component\Console\Output\OutputInterface $output
     *
     * @return void
     */
    public function __construct(OutputInterface $output)
    {
        $this->output = $output;
        $this->formatterHelper = new FormatterHelper();
    }

    /**
     * @param string $directory
     *
     * @return int
     */
    public function validate(string $directory): int
    {
        $returnCode = 0;
        $finder = $this->getFinder($directory);

        foreach ($finder as $document) {
            $parsedDocument = YamlFrontMatter::parse($document->getContents());

            if (!$this->validateParentDocument($parsedDocument, $document)) {
                $returnCode = 1;

                continue;
            }

            $returnCode |= $this->validateRelatedDocuments($parsedDocument, $document);
        }

        return $returnCode;
    }

    /**
     * @param \Spatie\YamlFrontMatter\Document $parsedDocument
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return bool
     */
    private function validateParentDocument(Document $parsedDocument, SplFileInfo $document): bool
    {
        if ($parsedDocument->matter('last_updated') === null) {
            $this->logError(sprintf('%s doesn\'t have `last_updated` front matter setting', $document->getPathname()));

            return false;
        }

        return true;
    }

    /**
     * @param \Spatie\YamlFrontMatter\Document $parsedDocument
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return int
     */
    private function validateRelatedDocuments(Document $parsedDocument, SplFileInfo $document): int
    {
        $returnCode = 0;

        foreach ($parsedDocument->matter('related', []) as $relatedDocument) {
            $returnCode |= $this->validateRelatedDocument(
                $relatedDocument,
                $parsedDocument->matter('last_updated'),
                $document
            );
        }

        return $returnCode;
    }

    /**
     * @param array $relatedDocument
     * @param string $documentLastUpdated
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return int
     */
    private function validateRelatedDocument(array $relatedDocument, string $documentLastUpdated, SplFileInfo $document): int
    {
        $relatedDocumentPath = $this->buildRelatedDocumentsPath($relatedDocument['link'], $document);

        if (empty($relatedDocumentPath)) {
            $this->logError(
                sprintf('Related document "%s" does not exist for document %s', $relatedDocument['title'], $document->getPathname())
            );

            return 1;
        }

        return $this->validatedRelatedDocumentLastUpdated($relatedDocumentPath, $documentLastUpdated, $document);
    }

    /**
     * @param string $relatedDocumentLink
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return string|null
     */
    private function buildRelatedDocumentsPath(string $relatedDocumentLink, SplFileInfo $document): ?string
    {
        $search = ['.html'];
        $replacements = ['.md'];
        $documentVersion = $this->getDocumentVersion($document);

        if ($documentVersion !== null) {
            $search[] = '/page.version/';
            $replacements[] = $documentVersion;
        }

        return realpath(ROOT_DIR . str_replace($search, $replacements, $relatedDocumentLink));
    }

    /**
     * @param string $relatedDocumentPath
     * @param string $documentLastUpdated
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return int
     */
    private function validatedRelatedDocumentLastUpdated(string $relatedDocumentPath, string $documentLastUpdated, SplFileInfo $document): int
    {
        try {
            $parsedRelatedDocument = YamlFrontMatter::parse(file_get_contents($relatedDocumentPath));
            $relatedDocumentLastUpdated = $parsedRelatedDocument->matter('last_updated');

            if ($relatedDocumentLastUpdated === null || $documentLastUpdated !== $relatedDocumentLastUpdated) {
                $this->logError(
                    sprintf('`last_updated` values in document %s and its related document %s don\'t match', $document->getPathname(), $relatedDocumentPath)
                );

                return 1;
            }
        } catch(ErrorException $e) {
            $this->logError($e->getMessage());

            return 1;
        }

        return 0;
    }

    /**
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return string|null
     */
    private function getDocumentVersion(SplFileInfo $document): ?string
    {
        preg_match('/\/(\d+\.\d+)\//', $document->getPathname(), $matches);

        return $matches[0] ?? null;
    }

    /**
     * @param string $errorMessage
     *
     * @return void
     */
    private function logError(string $errorMessage): void
    {
        $errorMessages = ['Error:', $errorMessage];
        $formattedBlock = $this->formatterHelper->formatBlock($errorMessages, 'error');

        $this->output->writeln($formattedBlock);
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
}
