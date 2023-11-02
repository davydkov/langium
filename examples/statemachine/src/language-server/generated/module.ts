/******************************************************************************
 * This file was generated by langium-cli 2.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import type { LangiumGeneratedServices, LangiumGeneratedSharedServices, LangiumSharedServices, LangiumServices, LanguageMetaData, Module } from 'langium';
import { StatemachineAstReflection } from './ast.js';
import { StatemachineGrammar } from './grammar.js';

export const StatemachineLanguageMetaData = {
    languageId: 'statemachine',
    fileExtensions: ['.statemachine'],
    caseInsensitive: false
} as const satisfies LanguageMetaData;

export const StatemachineGeneratedSharedModule: Module<LangiumSharedServices, LangiumGeneratedSharedServices> = {
    AstReflection: () => new StatemachineAstReflection()
};

export const StatemachineGeneratedModule: Module<LangiumServices, LangiumGeneratedServices> = {
    Grammar: () => StatemachineGrammar(),
    LanguageMetaData: () => StatemachineLanguageMetaData,
    parser: {}
};
