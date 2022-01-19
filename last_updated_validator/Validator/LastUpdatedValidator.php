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
            $documentFrontMatter = YamlFrontMatter::parse($document->getContents())->matter();

            if (!$this->validateParentDocument($documentFrontMatter, $document)) {
                $returnCode = 1;

                continue;
            }

            $returnCode |= $this->validateRelatedDocuments($documentFrontMatter, $document);
        }

        return $returnCode;
    }

    /**
     * @param array $documentFrontMatter
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return bool
     */
    private function validateParentDocument(array $documentFrontMatter, SplFileInfo $document): bool
    {
        if ($this->getLastUpdated($documentFrontMatter) === null) {
            $this->logError(sprintf('%s doesn\'t have `last_updated` front matter setting', $document->getPathname()));

            return false;
        }

        return true;
    }

    /**
     * @param array $documentFrontMatter
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return int
     */
    private function validateRelatedDocuments(array $documentFrontMatter, SplFileInfo $document): int
    {
        $returnCode = 0;
        $relatedDocuments = $this->getRelatedDocuments($documentFrontMatter);
        $documentLastUpdated = $this->getLastUpdated($documentFrontMatter);

        foreach ($relatedDocuments as $relatedDocument) {
            $returnCode |= $this->validateRelatedDocument(
                $relatedDocument,
                $documentLastUpdated,
                $document
            );
        }

        return $returnCode;
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
     * @param array $relatedDocument
     * @param string $documentLastUpdated
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return int
     */
    private function validateRelatedDocument(array $relatedDocument, string $documentLastUpdated, SplFileInfo $document): int
    {
        $relatedDocumentPath = $this->buildRelatedDocumentsPath($relatedDocument['link'], $document);

        if (!$this->validateRelatedDocumentPath($relatedDocumentPath, $document)) {
            return 1;
        }

        return $this->validatedRelatedDocumentLastUpdated($relatedDocumentPath, $documentLastUpdated, $document);
    }

    private function validatedRelatedDocumentLastUpdated(string $relatedDocumentPath, string $documentLastUpdated, SplFileInfo $document): int
    {
        try {
            $relatedDocumentFrontMatter = YamlFrontMatter::parse(file_get_contents($relatedDocumentPath))->matter();
            $relatedDocumentLastUpdated = $this->getLastUpdated($relatedDocumentFrontMatter);

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
     * @param $relatedDocumentPath
     * @param \Symfony\Component\Finder\SplFileInfo $document
     *
     * @return bool
     */
    private function validateRelatedDocumentPath($relatedDocumentPath, SplFileInfo $document): bool
    {
        if (empty($relatedDocumentPath)) {
            $this->logError(
                sprintf('Related document "%s" does not exist for document %s', $relatedDocumentPath, $document->getPathname())
            );

            return false;
        }

        return true;
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
        $errorMessages = ['Error!', $errorMessage];
        $formattedBlock = $this->formatterHelper->formatBlock($errorMessages, 'error');

        $this->output->writeln($formattedBlock);
    }

    /**
     * @param array $documentFrontMatter
     *
     * @return array
     */
    private function getRelatedDocuments(array $documentFrontMatter): array
    {
        return $documentFrontMatter['related'] ?? [];
    }

    /**
     * @param array $documentFrontMatter
     *
     * @return string|null
     */
    private function getLastUpdated(array $documentFrontMatter): ?string
    {
        return $documentFrontMatter['last_updated'] ?? null;
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
