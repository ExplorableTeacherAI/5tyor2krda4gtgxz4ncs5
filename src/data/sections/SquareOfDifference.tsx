import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineClozeChoice,
    InlineSpotColor,
    InlineFeedback,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar, useSetVar } from "@/stores";

// Colors for the regions
const COLORS = {
    aSquared: "#62D0AD", // teal for a²
    subtract1: "#F4A89A", // coral for subtracted regions
    subtract2: "#FFCBA4", // peach for the overlap
    bSquared: "#F8A0CD", // rose for b²
    remaining: "#A8D5A2", // sage for (a-b)²
};

// Interactive Square Diagram for (a-b)²
function SquareOfDiffDiagram() {
    const a = useVar("diffValueA", 5) as number;
    const b = useVar("diffValueB", 2) as number;
    const setVar = useSetVar();

    const diff = a - b;
    const scale = 45;
    const padding = 60;
    const aSize = a * scale;
    const bSize = b * scale;
    const diffSize = diff * scale;
    const svgWidth = aSize + padding * 2;
    const svgHeight = aSize + padding * 2 + 40;

    return (
        <div className="relative">
            <svg
                width="100%"
                height="auto"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="max-w-md mx-auto"
            >
                {/* Main a² square (outline) */}
                <rect
                    x={padding}
                    y={padding}
                    width={aSize}
                    height={aSize}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth={2}
                    strokeDasharray="5,5"
                />

                {/* The (a-b)² region - what remains */}
                <rect
                    x={padding}
                    y={padding}
                    width={diffSize}
                    height={diffSize}
                    fill={COLORS.remaining}
                    opacity={0.9}
                    stroke="#1e293b"
                    strokeWidth={2}
                />
                <text
                    x={padding + diffSize / 2}
                    y={padding + diffSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="16"
                    fontWeight="600"
                >
                    (a-b)² = {diff * diff}
                </text>

                {/* Top-right strip being subtracted (a × b) */}
                <rect
                    x={padding + diffSize}
                    y={padding}
                    width={bSize}
                    height={diffSize}
                    fill={COLORS.subtract1}
                    opacity={0.7}
                    stroke="#1e293b"
                    strokeWidth={1}
                />
                <text
                    x={padding + diffSize + bSize / 2}
                    y={padding + diffSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="500"
                >
                    b(a-b)
                </text>

                {/* Bottom-left strip being subtracted (b × a) */}
                <rect
                    x={padding}
                    y={padding + diffSize}
                    width={diffSize}
                    height={bSize}
                    fill={COLORS.subtract1}
                    opacity={0.7}
                    stroke="#1e293b"
                    strokeWidth={1}
                />
                <text
                    x={padding + diffSize / 2}
                    y={padding + diffSize + bSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="500"
                >
                    b(a-b)
                </text>

                {/* Bottom-right corner - b² */}
                <rect
                    x={padding + diffSize}
                    y={padding + diffSize}
                    width={bSize}
                    height={bSize}
                    fill={COLORS.bSquared}
                    opacity={0.8}
                    stroke="#1e293b"
                    strokeWidth={1}
                />
                <text
                    x={padding + diffSize + bSize / 2}
                    y={padding + diffSize + bSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="600"
                >
                    b² = {b * b}
                </text>

                {/* Dimension labels */}
                <text
                    x={padding + aSize / 2}
                    y={padding - 15}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="14"
                    fontWeight="500"
                >
                    a = {a}
                </text>

                {/* Left side dimension */}
                <line
                    x1={padding - 30}
                    y1={padding}
                    x2={padding - 30}
                    y2={padding + diffSize}
                    stroke={COLORS.remaining}
                    strokeWidth={3}
                />
                <text
                    x={padding - 40}
                    y={padding + diffSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={COLORS.remaining}
                    fontSize="13"
                    fontWeight="600"
                    transform={`rotate(-90, ${padding - 40}, ${padding + diffSize / 2})`}
                >
                    a-b = {diff}
                </text>

                {/* b dimension on right */}
                <line
                    x1={padding + aSize + 10}
                    y1={padding}
                    x2={padding + aSize + 10}
                    y2={padding + bSize}
                    stroke={COLORS.bSquared}
                    strokeWidth={3}
                />
                <text
                    x={padding + aSize + 25}
                    y={padding + bSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={COLORS.bSquared}
                    fontSize="13"
                    fontWeight="600"
                >
                    b = {b}
                </text>

                {/* Area calculation */}
                <text
                    x={padding + aSize / 2}
                    y={padding + aSize + 25}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="500"
                >
                    a² = {a * a} | (a-b)² = {diff * diff}
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="square-of-diff-scrub"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the values below to see how the regions change",
                        position: { x: "50%", y: "85%" },
                    },
                ]}
            />
        </div>
    );
}

// Reactive display for calculation
function DiffCalculation() {
    const a = useVar("diffValueA", 5) as number;
    const b = useVar("diffValueB", 2) as number;
    const aSquared = a * a;
    const twoAB = 2 * a * b;
    const bSquared = b * b;
    const result = aSquared - twoAB + bSquared;

    return (
        <span>
            {aSquared} - {twoAB} + {bSquared} = {result}
        </span>
    );
}

export const squareOfDifferenceBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-diff-heading" maxWidth="xl">
        <Block id="diff-heading" padding="md">
            <EditableH2 id="h2-diff-heading" blockId="diff-heading">
                The Square of a Difference: (a - b)²
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-diff-intro" maxWidth="xl">
        <Block id="diff-intro" padding="sm">
            <EditableParagraph id="para-diff-intro" blockId="diff-intro">
                Now that you understand (a + b)², the square of a difference follows a similar pattern with one important twist: the sign of the middle term changes. Instead of adding, we subtract. Let us see why.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Visual explanation
    <SplitLayout key="layout-diff-visualization" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="diff-visual-explanation" padding="sm">
                <EditableParagraph id="para-diff-visual-explanation" blockId="diff-visual-explanation">
                    Think of (a - b)² as the area of a smaller square inside a larger one. We start with a square of side{" "}
                    <InlineSpotColor varName="diffValueA" color="#62D0AD">a</InlineSpotColor>
                    {" = "}
                    <InlineScrubbleNumber
                        varName="diffValueA"
                        {...numberPropsFromDefinition(getVariableInfo("diffValueA"))}
                    />{" "}
                    and cut away strips of width{" "}
                    <InlineSpotColor varName="diffValueB" color="#F4A89A">b</InlineSpotColor>
                    {" = "}
                    <InlineScrubbleNumber
                        varName="diffValueB"
                        {...numberPropsFromDefinition(getVariableInfo("diffValueB"))}
                    />{" "}
                    from the edges. The green region that remains has side (a - b).
                </EditableParagraph>
            </Block>
            <Block id="diff-calculation-display" padding="sm">
                <EditableParagraph id="para-diff-calculation" blockId="diff-calculation-display">
                    Using the formula: a² - 2ab + b² = <DiffCalculation />
                </EditableParagraph>
            </Block>
        </div>
        <Block id="diff-diagram" padding="sm" hasVisualization>
            <SquareOfDiffDiagram />
        </Block>
    </SplitLayout>,

    // The key insight
    <StackLayout key="layout-diff-insight" maxWidth="xl">
        <Block id="diff-insight" padding="sm">
            <EditableParagraph id="para-diff-insight" blockId="diff-insight">
                The crucial difference from (a + b)² is the sign change. When we expand (a - b)(a - b), the middle term becomes negative: we get -ab from multiplying a with -b, and another -ab from multiplying -b with a. Two negative ab terms give us -2ab.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The formula
    <StackLayout key="layout-diff-formula" maxWidth="xl">
        <Block id="diff-formula" padding="md">
            <FormulaBlock
                latex="(\clr{a}{a} - \clr{b}{b})^2 = \clr{a}{a}^2 - 2\clr{a}{a}\clr{b}{b} + \clr{b}{b}^2"
                colorMap={{ a: "#62D0AD", b: "#F4A89A" }}
            />
        </Block>
    </StackLayout>,

    // Common mistake warning
    <StackLayout key="layout-diff-warning" maxWidth="xl">
        <Block id="diff-warning" padding="sm">
            <EditableParagraph id="para-diff-warning" blockId="diff-warning">
                Be careful: the last term is still +b², not -b². Why? Because (-b) × (-b) = +b². A negative times a negative is positive! This is a common source of sign errors.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question about sign
    <StackLayout key="layout-diff-question-sign" maxWidth="xl">
        <Block id="diff-question-sign" padding="md">
            <EditableParagraph id="para-diff-question-sign" blockId="diff-question-sign">
                In (a - b)², the middle term 2ab has a{" "}
                <InlineFeedback
                    varName="answerDiffSign"
                    correctValue="minus"
                    position="mid"
                    successMessage="✓ correct!"
                    failureMessage="✗"
                    hint="Remember: a times (-b) plus (-b) times a gives two negative ab terms"
                >
                    <InlineClozeChoice
                        varName="answerDiffSign"
                        correctAnswer="minus"
                        options={["plus", "minus"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerDiffSign"))}
                    />
                </InlineFeedback>{" "}
                sign in front of it.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Calculation question
    <StackLayout key="layout-diff-question-expand" maxWidth="xl">
        <Block id="diff-question-expand" padding="md">
            <EditableParagraph id="para-diff-question-expand" blockId="diff-question-expand">
                Calculate (7 - 2)² using the identity: 7² - 2(7)(2) + 2² = 49 - 28 + 4 ={" "}
                <InlineFeedback
                    varName="answerDiffExpand"
                    correctValue="25"
                    position="terminal"
                    successMessage="— excellent! And notice this equals 5² = 25, which confirms our identity works"
                    failureMessage="— not quite."
                    hint="49 - 28 = 21, then 21 + 4 = ?"
                >
                    <InlineClozeInput
                        varName="answerDiffExpand"
                        correctAnswer="25"
                        {...clozePropsFromDefinition(getVariableInfo("answerDiffExpand"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
