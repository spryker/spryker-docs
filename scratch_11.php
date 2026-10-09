<?php
$possiblePaths = explode("\n", file_get_contents('all-files.txt'));


foreach (explode("\n", file_get_contents('error404.txt')) as $originalPath)
//$originalPath = '/docs/marketplace/user/features/202212.0/';
{
    $originalPath = rtrim($originalPath, '/');

    $path = str_replace(['.html', '.htm'], '', $originalPath);
    for ($i=0;$i<20; $i++) {
        $p = strpos($path, '/');
        if ($p === false) break;

        $path = substr($path, $p + 1);
        $result = exec('grep "' . $path . '.md" all-files.txt | grep ./docs/');

        if ($result !== false && $result !== '') {
            print $originalPath . ' => ' . $result . PHP_EOL;
            break;
        }

        $result = exec('grep "' . $path . '.md" all-files.txt');

        if ($result !== false && $result !== '') {
            print $originalPath . ' => ' . $result . PHP_EOL;
            break;
        }
    }
}