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
import { useVar, useSetVar } from "@/stores";

// Colors for the four regions
const COLORS = {
    aSquared: "#62D0AD", // teal for a²
    ab1: "#8E90F5", // indigo for first ab
    ab2: "#AC8BF9", // violet for second ab
    bSquared: "#F8A0CD", // rose for b²
};

// Interactive Square Diagram Component
function SquareOfSumDiagram() {
    const a = useVar("valueA", 3) as number;
    const b = useVar("valueB", 2) as number;
    const setVar = useSetVar();
    const highlight = useVar("activeHighlight", "") as string;

    const total = a + b;
    const scale = 50; // pixels per unit
    const padding = 60;
    const svgSize = total * scale + padding * 2;

    // Calculate positions
    const aSize = a * scale;
    const bSize = b * scale;

    const getOpacity = (region: string) => (highlight === region ? 1 : 0.85);
    const getStrokeWidth = (region: string) => (highlight === region ? 3 : 1);

    return (
        <div className="relative">
            <svg
                width="100%"
                height="auto"
                viewBox={`0 0 ${svgSize} ${svgSize + 40}`}
                className="max-w-md mx-auto"
            >
                {/* a² region (top-left) */}
                <rect
                    x={padding}
                    y={padding}
                    width={aSize}
                    height={aSize}
                    fill={COLORS.aSquared}
                    opacity={getOpacity("aSquared")}
                    stroke="#1e293b"
                    strokeWidth={getStrokeWidth("aSquared")}
                    onMouseEnter={() => setVar("activeHighlight", "aSquared")}
                    onMouseLeave={() => setVar("activeHighlight", "")}
                    style={{ cursor: "pointer" }}
                />
                <text
                    x={padding + aSize / 2}
                    y={padding + aSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="18"
                    fontWeight="600"
                >
                    a² = {a * a}
                </text>

                {/* First ab region (top-right) */}
                <rect
                    x={padding + aSize}
                    y={padding}
                    width={bSize}
                    height={aSize}
                    fill={COLORS.ab1}
                    opacity={getOpacity("ab1")}
                    stroke="#1e293b"
                    strokeWidth={getStrokeWidth("ab1")}
                    onMouseEnter={() => setVar("activeHighlight", "ab1")}
                    onMouseLeave={() => setVar("activeHighlight", "")}
                    style={{ cursor: "pointer" }}
                />
                <text
                    x={padding + aSize + bSize / 2}
                    y={padding + aSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="16"
                    fontWeight="600"
                >
                    ab = {a * b}
                </text>

                {/* Second ab region (bottom-left) */}
                <rect
                    x={padding}
                    y={padding + aSize}
                    width={aSize}
                    height={bSize}
                    fill={COLORS.ab2}
                    opacity={getOpacity("ab2")}
                    stroke="#1e293b"
                    strokeWidth={getStrokeWidth("ab2")}
                    onMouseEnter={() => setVar("activeHighlight", "ab2")}
                    onMouseLeave={() => setVar("activeHighlight", "")}
                    style={{ cursor: "pointer" }}
                />
                <text
                    x={padding + aSize / 2}
                    y={padding + aSize + bSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="16"
                    fontWeight="600"
                >
                    ab = {a * b}
                </text>

                {/* b² region (bottom-right) */}
                <rect
                    x={padding + aSize}
                    y={padding + aSize}
                    width={bSize}
                    height={bSize}
                    fill={COLORS.bSquared}
                    opacity={getOpacity("bSquared")}
                    stroke="#1e293b"
                    strokeWidth={getStrokeWidth("bSquared")}
                    onMouseEnter={() => setVar("activeHighlight", "bSquared")}
                    onMouseLeave={() => setVar("activeHighlight", "")}
                    style={{ cursor: "pointer" }}
                />
                <text
                    x={padding + aSize + bSize / 2}
                    y={padding + aSize + bSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1e293b"
                    fontSize="16"
                    fontWeight="600"
                >
                    b² = {b * b}
                </text>

                {/* Side labels */}
                {/* Top side label: a + b */}
                <text
                    x={padding + (aSize + bSize) / 2}
                    y={padding - 15}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="16"
                    fontWeight="500"
                >
                    a + b = {a + b}
                </text>

                {/* Left side label: a + b */}
                <text
                    x={padding - 15}
                    y={padding + (aSize + bSize) / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#64748b"
                    fontSize="16"
                    fontWeight="500"
                    transform={`rotate(-90, ${padding - 15}, ${padding + (aSize + bSize) / 2})`}
                >
                    a + b = {a + b}
                </text>

                {/* Top dimension lines */}
                <line
                    x1={padding}
                    y1={padding - 35}
                    x2={padding + aSize}
                    y2={padding - 35}
                    stroke={COLORS.aSquared}
                    strokeWidth={3}
                />
                <text
                    x={padding + aSize / 2}
                    y={padding - 40}
                    textAnchor="middle"
                    fill={COLORS.aSquared}
                    fontSize="14"
                    fontWeight="600"
                >
                    a = {a}
                </text>
                <line
                    x1={padding + aSize}
                    y1={padding - 35}
                    x2={padding + aSize + bSize}
                    y2={padding - 35}
                    stroke={COLORS.ab1}
                    strokeWidth={3}
                />
                <text
                    x={padding + aSize + bSize / 2}
                    y={padding - 40}
                    textAnchor="middle"
                    fill={COLORS.ab1}
                    fontSize="14"
                    fontWeight="600"
                >
                    b = {b}
                </text>

                {/* Total area display */}
                <text
                    x={padding + (aSize + bSize) / 2}
                    y={padding + aSize + bSize + 30}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="16"
                    fontWeight="600"
                >
                    Total Area = (a+b)² = {(a + b) * (a + b)}
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="square-of-sum-hover"
                steps={[
                    {
                        gesture: "hover",
                        label: "Hover over each colored region to highlight it",
                        position: { x: "35%", y: "35%" },
                    },
                ]}
            />
        </div>
    );
}

// Reactive display for showing the breakdown
function AreaBreakdown() {
    const a = useVar("valueA", 3) as number;
    const b = useVar("valueB", 2) as number;
    const aSquared = a * a;
    const ab = a * b;
    const bSquared = b * b;
    const total = aSquared + 2 * ab + bSquared;

    return (
        <span>
            {aSquared} + {ab} + {ab} + {bSquared} = {total}
        </span>
    );
}

// Reactive component to show highlighted term
function HighlightedTerm() {
    const highlight = useVar("activeHighlight", "") as string;
    const a = useVar("valueA", 3) as number;
    const b = useVar("valueB", 2) as number;

    if (highlight === "aSquared") {
        return (
            <span style={{ color: COLORS.aSquared, fontWeight: 600 }}>
                The teal square is a² = {a}² = {a * a}
            </span>
        );
    }
    if (highlight === "ab1" || highlight === "ab2") {
        return (
            <span style={{ color: COLORS.ab1, fontWeight: 600 }}>
                Each indigo/violet rectangle is a × b = {a} × {b} = {a * b}
            </span>
        );
    }
    if (highlight === "bSquared") {
        return (
            <span style={{ color: COLORS.bSquared, fontWeight: 600 }}>
                The rose square is b² = {b}² = {b * b}
            </span>
        );
    }
    return <span className="text-slate-500">Hover over any region to see its area</span>;
}

export const squareOfSumBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-sum-heading" maxWidth="xl">
        <Block id="sum-heading" padding="md">
            <EditableH2 id="h2-sum-heading" blockId="sum-heading">
                The Square of a Sum: (a + b)²
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction to the visual
    <StackLayout key="layout-sum-intro" maxWidth="xl">
        <Block id="sum-intro" padding="sm">
            <EditableParagraph id="para-sum-intro" blockId="sum-intro">
                The most common mistake students make is writing (a + b)² = a² + b². This is wrong! When you square a sum, you are not squaring each piece separately. You are multiplying (a + b) by itself: (a + b) × (a + b). Let us see why this produces something more interesting.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive diagram with explanation
    <SplitLayout key="layout-sum-visualization" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="sum-visual-explanation" padding="sm">
                <EditableParagraph id="para-sum-visual-explanation" blockId="sum-visual-explanation">
                    Imagine a square with side length (
                    <InlineSpotColor varName="valueA" color="#62D0AD">a</InlineSpotColor>
                    {" + "}
                    <InlineSpotColor varName="valueB" color="#8E90F5">b</InlineSpotColor>
                    ). The total area of this square is (a + b)². But we can also calculate the area by adding up the four smaller regions inside. Try changing the values:{" "}
                    <InlineSpotColor varName="valueA" color="#62D0AD">a</InlineSpotColor>
                    {" = "}
                    <InlineScrubbleNumber
                        varName="valueA"
                        {...numberPropsFromDefinition(getVariableInfo("valueA"))}
                    />{" "}
                    and{" "}
                    <InlineSpotColor varName="valueB" color="#8E90F5">b</InlineSpotColor>
                    {" = "}
                    <InlineScrubbleNumber
                        varName="valueB"
                        {...numberPropsFromDefinition(getVariableInfo("valueB"))}
                    />
                    .
                </EditableParagraph>
            </Block>
            <Block id="sum-highlight-feedback" padding="sm">
                <EditableParagraph id="para-sum-highlight-feedback" blockId="sum-highlight-feedback">
                    <HighlightedTerm />
                </EditableParagraph>
            </Block>
        </div>
        <Block id="sum-diagram" padding="sm" hasVisualization>
            <SquareOfSumDiagram />
        </Block>
    </SplitLayout>,

    // The formula derivation
    <StackLayout key="layout-sum-derivation" maxWidth="xl">
        <Block id="sum-derivation" padding="sm">
            <EditableParagraph id="para-sum-derivation" blockId="sum-derivation">
                Looking at the diagram, the total area equals the sum of all four regions: <AreaBreakdown />. Notice how the two rectangles (ab and ab) combine to give us 2ab. This is where the middle term comes from!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The identity formula
    <StackLayout key="layout-sum-formula" maxWidth="xl">
        <Block id="sum-formula" padding="md">
            <FormulaBlock
                latex="(\clr{a}{a} + \clr{b}{b})^2 = \clr{a}{a}^2 + 2\clr{a}{a}\clr{b}{b} + \clr{b}{b}^2"
                colorMap={{ a: "#62D0AD", b: "#8E90F5" }}
            />
        </Block>
    </StackLayout>,

    // Why the middle term matters
    <StackLayout key="layout-sum-middle-term" maxWidth="xl">
        <Block id="sum-middle-term-explanation" padding="sm">
            <EditableParagraph id="para-sum-middle-term" blockId="sum-middle-term-explanation">
                <strong style={{ color: "#F7B23B" }}>The 2ab term is crucial.</strong> It represents the two rectangular pieces that appear when you split the large square. Forgetting this term is the most common error. Remember: when you see (a + b)², always think about those two rectangles hiding inside.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Quick check question
    <StackLayout key="layout-sum-question-middle" maxWidth="xl">
        <Block id="sum-question-middle-term" padding="md">
            <EditableParagraph id="para-sum-question-middle" blockId="sum-question-middle-term">
                In the expansion of (a + b)², what is the middle term that many students forget?{" "}
                <InlineFeedback
                    varName="answerSumMiddleTerm"
                    correctValue="2ab"
                    position="standalone"
                    successMessage="Exactly right! The 2ab term comes from the two rectangular regions in our diagram"
                    failureMessage="Not quite."
                    hint="Look at the two rectangles in the diagram. What is their combined area?"
                    visualizationHint={{
                        blockId: "sum-diagram",
                        hintKey: "feedback-sum-middle-term",
                        steps: [
                            {
                                gesture: "hover",
                                label: "Hover over the indigo rectangle (top right) to see its area",
                                position: { x: "70%", y: "30%" },
                            },
                            {
                                gesture: "hover",
                                label: "Now hover over the violet rectangle (bottom left). Notice both equal ab!",
                                position: { x: "30%", y: "70%" },
                            },
                        ],
                        label: "See it in the diagram",
                        resetVars: { activeHighlight: "" },
                    }}
                >
                    <InlineClozeInput
                        varName="answerSumMiddleTerm"
                        correctAnswer="2ab"
                        {...clozePropsFromDefinition(getVariableInfo("answerSumMiddleTerm"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Application question
    <StackLayout key="layout-sum-question-expand" maxWidth="xl">
        <Block id="sum-question-expand" padding="md">
            <EditableParagraph id="para-sum-question-expand" blockId="sum-question-expand">
                Using the identity, what is the value of (4 + 4)²? Calculate: 4² + 2(4)(4) + 4² ={" "}
                <InlineFeedback
                    varName="answerExpandSum"
                    correctValue="64"
                    position="terminal"
                    successMessage="— perfect! You correctly applied the identity: 16 + 32 + 16 = 64"
                    failureMessage="— not quite."
                    hint="Calculate each part: a² = 16, 2ab = 32, b² = 16. Now add them up"
                >
                    <InlineClozeInput
                        varName="answerExpandSum"
                        correctAnswer="64"
                        {...clozePropsFromDefinition(getVariableInfo("answerExpandSum"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
