import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineClozeInput,
    InlineClozeChoice,
    InlineFeedback,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import {
    getVariableInfo,
    clozePropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";

export const practiceBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-practice-heading" maxWidth="xl">
        <Block id="practice-heading" padding="md">
            <EditableH2 id="h2-practice-heading" blockId="practice-heading">
                Putting It All Together
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction
    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="practice-intro">
                Now that you understand all three identities, let us practice recognizing when to use each one. The key skill is pattern recognition: look at the structure of the expression and match it to the right identity.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Summary formulas
    <StackLayout key="layout-practice-summary-sum" maxWidth="xl">
        <Block id="practice-summary-sum" padding="sm">
            <FormulaBlock
                latex="(a + b)^2 = a^2 + 2ab + b^2"
                colorMap={{ a: "#62D0AD", b: "#8E90F5" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-summary-diff" maxWidth="xl">
        <Block id="practice-summary-diff" padding="sm">
            <FormulaBlock
                latex="(a - b)^2 = a^2 - 2ab + b^2"
                colorMap={{ a: "#62D0AD", b: "#F4A89A" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-summary-dos" maxWidth="xl">
        <Block id="practice-summary-dos" padding="sm">
            <FormulaBlock
                latex="(a + b)(a - b) = a^2 - b^2"
                colorMap={{ a: "#62D0AD", b: "#AC8BF9" }}
            />
        </Block>
    </StackLayout>,

    // Question 1: Identify the identity
    <StackLayout key="layout-practice-question-identify" maxWidth="xl">
        <Block id="practice-question-identify" padding="md">
            <EditableParagraph id="para-practice-question-identify" blockId="practice-question-identify">
                The expression x² - 6x + 9 can be factored using which identity?{" "}
                <InlineFeedback
                    varName="answerWhichIdentity"
                    correctValue="(a-b)²"
                    position="standalone"
                    successMessage="Correct! This is a perfect square trinomial of the form (a - b)². Here, x² - 6x + 9 = (x - 3)²"
                    failureMessage="Think again."
                    hint="Look at the middle term. Is it positive or negative? Does the last term look like a perfect square?"
                    reviewBlockId="diff-formula"
                    reviewLabel="Review the square of a difference"
                >
                    <InlineClozeChoice
                        varName="answerWhichIdentity"
                        correctAnswer="(a-b)²"
                        options={["(a+b)²", "(a-b)²", "(a+b)(a-b)"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerWhichIdentity"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Explanation for identification
    <StackLayout key="layout-practice-identify-explanation" maxWidth="xl">
        <Block id="practice-identify-explanation" padding="sm">
            <EditableParagraph id="para-practice-identify-explanation" blockId="practice-identify-explanation">
                To identify the pattern: look at the signs. If you see + - + pattern (like x² + 2ax + a²), it is (a + b)². If you see + - + pattern with a negative middle term (like x² - 2ax + a²), it is (a - b)². If you see a difference of two squares (like a² - b²), it is (a + b)(a - b).
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 2: Missing term
    <StackLayout key="layout-practice-question-missing" maxWidth="xl">
        <Block id="practice-question-missing" padding="md">
            <EditableParagraph id="para-practice-question-missing" blockId="practice-question-missing">
                In the expansion (x + 5)² = x² + ___ + 25, the missing middle term is{" "}
                <InlineFeedback
                    varName="answerMissingTerm"
                    correctValue="10x"
                    position="terminal"
                    successMessage="— excellent! Using (a + b)² = a² + 2ab + b², we get 2 × x × 5 = 10x"
                    failureMessage="— not quite."
                    hint="The middle term is 2ab. Here a = x and b = 5. What is 2 × x × 5?"
                    reviewBlockId="sum-formula"
                    reviewLabel="Review the square of a sum"
                >
                    <InlineClozeInput
                        varName="answerMissingTerm"
                        correctAnswer="10x"
                        {...clozePropsFromDefinition(getVariableInfo("answerMissingTerm"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Tips for remembering
    <StackLayout key="layout-practice-tips-heading" maxWidth="xl">
        <Block id="practice-tips-heading" padding="md">
            <EditableParagraph id="para-practice-tips-heading" blockId="practice-tips-heading">
                <strong>Quick tips for remembering:</strong>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-tip-one" maxWidth="xl">
        <Block id="practice-tip-one" padding="sm">
            <EditableParagraph id="para-practice-tip-one" blockId="practice-tip-one">
                1. When squaring a binomial, always remember the middle term (2ab). It comes from the two rectangle regions in the square.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-tip-two" maxWidth="xl">
        <Block id="practice-tip-two" padding="sm">
            <EditableParagraph id="para-practice-tip-two" blockId="practice-tip-two">
                2. The sign of 2ab matches the sign between the terms: (a + b)² gives +2ab, while (a - b)² gives -2ab.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-tip-three" maxWidth="xl">
        <Block id="practice-tip-three" padding="sm">
            <EditableParagraph id="para-practice-tip-three" blockId="practice-tip-three">
                3. For the difference of squares, the middle terms always cancel. This only works when you have (a + b)(a - b) with the same a and b values.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-tip-four" maxWidth="xl">
        <Block id="practice-tip-four" padding="sm">
            <EditableParagraph id="para-practice-tip-four" blockId="practice-tip-four">
                4. The squared terms (a² and b²) are always positive, regardless of the signs in the original expression.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Conclusion
    <StackLayout key="layout-practice-conclusion" maxWidth="xl">
        <Block id="practice-conclusion" padding="md">
            <EditableParagraph id="para-practice-conclusion" blockId="practice-conclusion">
                With practice, these patterns become second nature. You will start seeing algebraic identities everywhere: in factoring expressions, solving equations, and even in mental arithmetic. The visual understanding you have developed today will help you remember these formulas long after the lesson ends.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
