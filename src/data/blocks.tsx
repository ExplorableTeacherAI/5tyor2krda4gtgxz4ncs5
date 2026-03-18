import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import all sections
import { introductionBlocks } from "./sections/Introduction";
import { squareOfSumBlocks } from "./sections/SquareOfSum";
import { squareOfDifferenceBlocks } from "./sections/SquareOfDifference";
import { differenceOfSquaresBlocks } from "./sections/DifferenceOfSquares";
import { practiceBlocks } from "./sections/Practice";

/**
 * ------------------------------------------------------------------
 * ALGEBRAIC IDENTITIES LESSON
 * ------------------------------------------------------------------
 *
 * This lesson teaches the three fundamental algebraic identities:
 * 1. (a + b)² = a² + 2ab + b²
 * 2. (a - b)² = a² - 2ab + b²
 * 3. (a + b)(a - b) = a² - b²
 *
 * Each section includes:
 * - Visual explanations with interactive diagrams
 * - Practice questions with feedback
 * - Common mistake warnings
 *
 * ------------------------------------------------------------------
 */

export const blocks: ReactElement[] = [
    ...introductionBlocks,
    ...squareOfSumBlocks,
    ...squareOfDifferenceBlocks,
    ...differenceOfSquaresBlocks,
    ...practiceBlocks,
];
