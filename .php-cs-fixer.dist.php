<?php

declare(strict_types=1);

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__ . '/src',
    ]);

$config = new PhpCsFixer\Config();

return $config
    ->setRiskyAllowed(true)
    ->setRules([
        '@PSR2'                        => true,
        'blank_line_after_opening_tag' => false,
        'linebreak_after_opening_tag'  => false,
        'declare_strict_types'         => false,
        'phpdoc_types_order'           => [
            'null_adjustment' => 'always_last',
            'sort_algorithm'  => 'none',
        ],
        'no_superfluous_phpdoc_tags' => false,
        'global_namespace_import'    => [
            'import_classes'   => true,
            'import_constants' => true,
            'import_functions' => true,
        ],
        'php_unit_test_case_static_method_calls' => [
            'call_type' => 'this'
        ],
        'phpdoc_align' => [
            'align' => 'left',
        ],
        'binary_operator_spaces' => [
            'operators' => [
                '='  => 'single_space',
                '=>' => 'align',
            ]
        ],
        'single_quote'                 => true,
        'blank_line_after_opening_tag' => true,
    ])
    ->setFinder($finder);