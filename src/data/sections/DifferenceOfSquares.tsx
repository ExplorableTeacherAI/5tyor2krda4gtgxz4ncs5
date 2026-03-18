import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineSpotColor,
    InlineFeedback,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// Colors
const COLORS = {
    a: "#62D0AD",
    b: "#AC8BF9",
    aSquared: "#62D0AD",
    bSquared: "#AC8BF9",
    product: "#F7B23B",
};

// Interactive diagram showing (a+b)(a-b) = a² - b²
function DifferenceOfSquaresDiagram() {
    const a = useVar("dosValueA", 4) as number;
    const b = useVar("dosValueB", 2) as number;

    const scale = 40;
    const padding = 70;
    const aSize = a * scale;
    const bSize = b * scale;
    const svgWidth = aSize + padding * 2 + 50;
    const svgHeight = aSize + padding + 80;

    return (
        <div className="relative">
            <svg
                width="100%"
                height="auto"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="max-w-lg mx-auto"
            >
                {/* Main a² square */}
                <rect
                    x={padding}
                    y={padding}
                    width={aSize}
                    height={aSize}
                    fill={COLORS.aSquared}
                    opacity={0.3}
                    stroke="#1e293b"
                    strokeWidth={2}
                />

                {/* The a² - b² shaded region (L-shape) */}
                {/* Top part of L */}
                <rect
                    x={padding}
                    y={padding}
                    width={aSize}
                    height={aSize - bSize}
                    fill={COLORS.product}
                    opacity={0.6}
                    stroke="#1e293b"
                    strokeWidth={1}
                />
                {/* Bottom-left part of L */}
                <rect
                    x={padding}
                    y={padding + aSize - bSize}
                    width={aSize - bSize}
                    height={bSize}
                    fill={COLORS.product}
                    opacity={0.6}
                    stroke="#1e293b"
                    strokeWidth={1}
                />

                {/* b² square being removed (bottom-right) */}
                <rect
                    x={padding + aSize - bSize}
                    y={padding + aSize - bSize}
                    width={bSize}
                    height={bSize}
                    fill={COLORS.bSquared}
                    opacity={0.5}
                    stroke="#1e293b"
                    strokeWidth={2}
                    strokeDasharray="5,3"
                />
                <text
                    x={padding + aSize - bSize / 2}
                    y={padding + aSize - bSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="600"
                >
                    b² = {b * b}
                </text>

                {/* Labels for a² */}
                <text
                    x={padding + aSize / 2}
                    y={padding - 15}
                    textAnchor="middle"
                    fill={COLORS.a}
                    fontSize="16"
                    fontWeight="600"
                >
                    a = {a}
                </text>

                {/* Left side label */}
                <text
                    x={padding - 20}
                    y={padding + aSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={COLORS.a}
                    fontSize="16"
                    fontWeight="600"
                    transform={`rotate(-90, ${padding - 20}, ${padding + aSize / 2})`}
                >
                    a = {a}
                </text>

                {/* b dimension */}
                <line
                    x1={padding + aSize + 15}
                    y1={padding + aSize - bSize}
                    x2={padding + aSize + 15}
                    y2={padding + aSize}
                    stroke={COLORS.b}
                    strokeWidth={3}
                />
                <text
                    x={padding + aSize + 30}
                    y={padding + aSize - bSize / 2}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fill={COLORS.b}
                    fontSize="14"
                    fontWeight="600"
                >
                    b = {b}
                </text>

                {/* Result label */}
                <text
                    x={padding + aSize / 2}
                    y={padding + aSize + 25}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="500"
                >
                    a² - b² = {a * a} - {b * b} = {a * a - b * b}
                </text>

                {/* Show the factored form */}
                <text
                    x={padding + aSize / 2}
                    y={padding + aSize + 50}
                    textAnchor="middle"
                    fill={COLORS.product}
                    fontSize="14"
                    fontWeight="600"
                >
                    (a+b)(a-b) = ({a + b})({a - b}) = {(a + b) * (a - b)}
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="diff-squares-scrub"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Change the values to see the relationship",
                        position: { x: "50%", y: "90%" },
                    },
                ]}
            />
        </div>
    );
}

// Reactive display for the algebraic proof
function AlgebraicProof() {
    const a = useVar("dosValueA", 4) as number;
    const b = useVar("dosValueB", 2) as number;

    return (
        <span>
            ({a} + {b})({a} - {b}) = {a}² - {b}² = {a * a} - {b * b} = {a * a - b * b}
        </span>
    );
}

// Reactive mental math example
function MentalMathExample() {
    const a = useVar("dosValueA", 4) as number;
    const b = useVar("dosValueB", 2) as number;

    // Example: to calculate 13 × 7, think of it as (10+3)(10-3) = 100 - 9 = 91
    const sum = a + b;
    const diff = a - b;
    const product = sum * diff;
    const aSquared = a * a;
    const bSquared = b * b;

    return (
        <span className="font-semibold" style={{ color: COLORS.product }}>
            {sum} × {diff} = {aSquared} - {bSquared} = {product}
        </span>
    );
}

export const differenceOfSquaresBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-dos-heading" maxWidth="xl">
        <Block id="dos-heading" padding="md">
            <EditableH2 id="h2-dos-heading" blockId="dos-heading">
                The Difference of Squares: (a + b)(a - b)
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-dos-intro" maxWidth="xl">
        <Block id="dos-intro" padding="sm">
            <EditableParagraph id="para-dos-intro" blockId="dos-intro">
                Something magical happens when you multiply a sum by a difference with the same terms. The middle terms cancel out completely! This identity is perhaps the most useful for mental arithmetic and simplifying expressions.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Visual with explanation
    <SplitLayout key="layout-dos-visualization" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="dos-visual-explanation" padding="sm">
                <EditableParagraph id="para-dos-visual-explanation" blockId="dos-visual-explanation">
                    Imagine a large square with side{" "}
                    <InlineSpotColor varName="dosValueA" color="#62D0AD">a</InlineSpotColor>
                    {" = "}
                    <InlineScrubbleNumber
                        varName="dosValueA"
                        {...numberPropsFromDefinition(getVariableInfo("dosValueA"))}
                    />
                    . We remove a smaller square with side{" "}
                    <InlineSpotColor varName="dosValueB" color="#AC8BF9">b</InlineSpotColor>
                    {" = "}
                    <InlineScrubbleNumber
                        varName="dosValueB"
                        {...numberPropsFromDefinition(getVariableInfo("dosValueB"))}
                    />{" "}
                    from the corner. The remaining L-shaped region has area a² - b².
                </EditableParagraph>
            </Block>
            <Block id="dos-algebraic-proof" padding="sm">
                <EditableParagraph id="para-dos-algebraic-proof" blockId="dos-algebraic-proof">
                    Algebraically: <AlgebraicProof />
                </EditableParagraph>
            </Block>
        </div>
        <Block id="dos-diagram" padding="sm" hasVisualization>
            <DifferenceOfSquaresDiagram />
        </Block>
    </SplitLayout>,

    // Why middle terms cancel
    <StackLayout key="layout-dos-cancellation" maxWidth="xl">
        <Block id="dos-cancellation" padding="sm">
            <EditableParagraph id="para-dos-cancellation" blockId="dos-cancellation">
                Let us expand (a + b)(a - b) step by step: a × a = a², a × (-b) = -ab, b × a = +ab, b × (-b) = -b². Notice that -ab and +ab cancel each other out! We are left with just a² - b². This is why multiplying conjugates (same numbers, opposite signs) gives such a clean result.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The formula
    <StackLayout key="layout-dos-formula" maxWidth="xl">
        <Block id="dos-formula" padding="md">
            <FormulaBlock
                latex="(\clr{a}{a} + \clr{b}{b})(\clr{a}{a} - \clr{b}{b}) = \clr{a}{a}^2 - \clr{b}{b}^2"
                colorMap={{ a: "#62D0AD", b: "#AC8BF9" }}
            />
        </Block>
    </StackLayout>,

    // Mental math application
    <StackLayout key="layout-dos-mental-math" maxWidth="xl">
        <Block id="dos-mental-math" padding="sm">
            <EditableParagraph id="para-dos-mental-math" blockId="dos-mental-math">
                This identity is a powerful mental math tool. Want to calculate 13 × 7? Rewrite it as (10 + 3)(10 - 3) = 100 - 9 = 91. With the current values: <MentalMathExample />
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question about the result
    <StackLayout key="layout-dos-question-result" maxWidth="xl">
        <Block id="dos-question-result" padding="md">
            <EditableParagraph id="para-dos-question-result" blockId="dos-question-result">
                When we expand (a + b)(a - b), the result is{" "}
                <InlineFeedback
                    varName="answerDosResult"
                    correctValue="a²-b²"
                    position="terminal"
                    successMessage="— that is right! The middle terms cancel, leaving only the difference of squares"
                    failureMessage="— not quite."
                    hint="The +ab and -ab terms cancel out. What remains?"
                >
                    <InlineClozeInput
                        varName="answerDosResult"
                        correctAnswer="a²-b²"
                        {...clozePropsFromDefinition(getVariableInfo("answerDosResult"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Calculation question
    <StackLayout key="layout-dos-question-calculation" maxWidth="xl">
        <Block id="dos-question-calculation" padding="md">
            <EditableParagraph id="para-dos-question-calculation" blockId="dos-question-calculation">
                Using the difference of squares identity, calculate 13 × 7. Hint: 13 = 10 + 3 and 7 = 10 - 3, so 13 × 7 = 10² - 3² ={" "}
                <InlineFeedback
                    varName="answerDosCalculation"
                    correctValue="91"
                    position="terminal"
                    successMessage="— brilliant! 100 - 9 = 91. This trick works whenever two numbers are equidistant from a round number"
                    failureMessage="— not quite."
                    hint="10² = 100 and 3² = 9. Now subtract."
                >
                    <InlineClozeInput
                        varName="answerDosCalculation"
                        correctAnswer="91"
                        {...clozePropsFromDefinition(getVariableInfo("answerDosCalculation"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
