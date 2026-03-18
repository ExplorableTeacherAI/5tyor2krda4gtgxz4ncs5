import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableParagraph,
    InlineScrubbleNumber,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";
import { useVar } from "@/stores";

// Reactive component to show the mental math calculation
function MentalMathDisplay() {
    const n = useVar("introNumber", 99) as number;
    const diff = n - 100;
    const squared = n * n;
    const diffAbs = Math.abs(diff);
    const sign = diff >= 0 ? "+" : "-";

    // Show the trick: (100 + d)² = 10000 + 200d + d²
    // Or simplified: n² = (n-100)×200 + 10000 + (n-100)²
    // Actually simpler: 99² = (100-1)² = 10000 - 200 + 1 = 9801

    return (
        <span className="font-semibold" style={{ color: "#62D0AD" }}>
            {squared.toLocaleString()}
        </span>
    );
}

function MentalMathExplanation() {
    const n = useVar("introNumber", 99) as number;
    const diff = n - 100;
    const diffAbs = Math.abs(diff);
    const sign = diff >= 0 ? "+" : "-";
    const signWord = diff >= 0 ? "add" : "subtract";
    const formula = diff >= 0 ? `(100 + ${diffAbs})²` : `(100 - ${diffAbs})²`;

    return (
        <span>
            Since {n} = 100 {sign} {diffAbs}, we can write {n}² as {formula}
        </span>
    );
}

export const introductionBlocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-intro-title" maxWidth="xl">
        <Block id="intro-title" padding="md">
            <EditableH1 id="h1-intro-title" blockId="intro-title">
                Algebraic Identities: The Secret Shortcuts
            </EditableH1>
        </Block>
    </StackLayout>,

    // Hook paragraph
    <StackLayout key="layout-intro-hook" maxWidth="xl">
        <Block id="intro-hook" padding="sm">
            <EditableParagraph id="para-intro-hook" blockId="intro-hook">
                Here is a challenge: Can you calculate{" "}
                <InlineScrubbleNumber
                    varName="introNumber"
                    {...numberPropsFromDefinition(getVariableInfo("introNumber"))}
                />
                ² in your head? Without a calculator, most people would struggle. But with the right algebraic identity, you can find that{" "}
                <MentalMathDisplay /> in seconds. <MentalMathExplanation />.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // What are identities
    <StackLayout key="layout-intro-what-are" maxWidth="xl">
        <Block id="intro-what-are-identities" padding="sm">
            <EditableParagraph id="para-intro-what-are" blockId="intro-what-are-identities">
                Algebraic identities are equations that are always true, no matter what values you substitute for the variables. They are not just formulas to memorize; they reveal deep patterns about how numbers behave when multiplied together. Once you understand why these identities work, you will see mathematics differently.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The three identities we'll learn
    <StackLayout key="layout-intro-three-identities" maxWidth="xl">
        <Block id="intro-three-identities" padding="sm">
            <EditableParagraph id="para-intro-three-identities" blockId="intro-three-identities">
                In this lesson, we will explore three fundamental identities that appear everywhere in mathematics, from simplifying expressions to solving equations to mental arithmetic tricks.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Identity 1
    <StackLayout key="layout-intro-identity-sum" maxWidth="xl">
        <Block id="intro-identity-sum" padding="sm">
            <FormulaBlock
                latex="(a + b)^2 = a^2 + 2ab + b^2"
                colorMap={{ a: "#62D0AD", b: "#8E90F5" }}
            />
        </Block>
    </StackLayout>,

    // Identity 2
    <StackLayout key="layout-intro-identity-diff" maxWidth="xl">
        <Block id="intro-identity-diff" padding="sm">
            <FormulaBlock
                latex="(a - b)^2 = a^2 - 2ab + b^2"
                colorMap={{ a: "#62D0AD", b: "#F4A89A" }}
            />
        </Block>
    </StackLayout>,

    // Identity 3
    <StackLayout key="layout-intro-identity-dos" maxWidth="xl">
        <Block id="intro-identity-dos" padding="sm">
            <FormulaBlock
                latex="(a + b)(a - b) = a^2 - b^2"
                colorMap={{ a: "#62D0AD", b: "#AC8BF9" }}
            />
        </Block>
    </StackLayout>,

    // Transition
    <StackLayout key="layout-intro-transition" maxWidth="xl">
        <Block id="intro-transition" padding="sm">
            <EditableParagraph id="para-intro-transition" blockId="intro-transition">
                Let us start with the first identity and discover why it works through a visual exploration.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
