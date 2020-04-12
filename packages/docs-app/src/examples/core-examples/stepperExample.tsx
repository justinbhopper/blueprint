/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { Button, ButtonGroup, H5, HTMLSelect, IconName, Label, Step, Stepper, Switch } from "@blueprintjs/core";
import { Example, IExampleProps } from "@blueprintjs/docs-theme";

// Using svgs for content can help avoid sub-pixel realignment
const svgText = (content: string | number) => (
    <svg height="100%" width="100%">
        <text x="50%" y="50%" fontWeight="500" textAnchor="middle" fill="white" dominantBaseline="central">
            {content}
        </text>
    </svg>
);

const iconTypes = {
    alphabetical: ["A", "B", "C"].map(svgText),
    dotted: [] as never[],
    icons: ["person", "cog", "cloud"] as IconName[],
    numbered: [1, 2, 3].map(svgText),
};

export interface IStepperExampleState {
    accordion: boolean;
    activeStep: number;
    alternativeLabel: boolean;
    content: boolean;
    iconType: keyof typeof iconTypes;
    errored: boolean;
    fill: boolean;
    large: boolean;
    vertical?: boolean;
}

export class StepperExample extends React.PureComponent<IExampleProps, IStepperExampleState> {
    public state: IStepperExampleState = {
        accordion: false,
        activeStep: 0,
        alternativeLabel: true,
        content: false,
        errored: false,
        fill: true,
        iconType: "numbered",
        large: false,
        vertical: false,
    };

    public render() {
        const {
            activeStep,
            accordion,
            alternativeLabel,
            content,
            errored,
            iconType,
            fill,
            large,
            vertical,
        } = this.state;

        const icons = iconTypes[iconType];

        const stepContent = (step: number) => {
            if (!content) {
                return undefined;
            }

            return (
                <>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                    <p>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo.
                    </p>
                    <ButtonGroup>
                        {step > 0 && <Button icon="arrow-up" text="Previous" onClick={this.handlePrevious} />}
                        {step < 2 && <Button icon="arrow-down" text="Next" onClick={this.handleNext} />}
                        {step === 2 && (
                            <Button icon="tick" intent="primary" text="Complete" onClick={this.handleNext} />
                        )}
                    </ButtonGroup>
                </>
            );
        };

        const options = (
            <>
                <H5>Props</H5>
                <Switch label="Vertical" key="vertical" checked={vertical} onChange={this.handleVerticalChange} />
                <Switch
                    label="Alternative Label"
                    key="alternativeLabel"
                    checked={alternativeLabel}
                    onChange={this.handleAlternativeLabelChange}
                />
                <Switch label="Large" key="large" checked={large} onChange={this.handleLargeChange} />
                <Switch label="Accordion" key="accordion" checked={accordion} onChange={this.handleAccordionChange} />
                <Switch label="Fill" key="fill" checked={fill} disabled={accordion} onChange={this.handleFillChange} />
                <H5>Example</H5>
                <Label>
                    Icon Type
                    <HTMLSelect value={iconType} onChange={this.handleIconChange}>
                        <option value="numbered">Numbered</option>
                        <option value="dotted">Dotted</option>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="icons">Icons</option>
                    </HTMLSelect>
                </Label>
                <Switch checked={content} label="With content" key="content" onChange={this.handleContentChange} />
                <Switch checked={errored} label="Error step two" key="errored" onChange={this.handleErrorChange} />
            </>
        );

        return (
            <Example options={options} {...this.props}>
                <Stepper
                    activeStep={activeStep}
                    fill={accordion ? "accordion" : fill}
                    large={large}
                    vertical={vertical}
                    alternativeLabel={alternativeLabel}
                >
                    <Step label="Step one" icon={icons[0]}>
                        {stepContent(0)}
                    </Step>
                    <Step label="Step two" icon={icons[1]} labelInfo="Optional" error={errored}>
                        {stepContent(1)}
                    </Step>
                    <Step label="Step three" icon={icons[2]}>
                        {stepContent(2)}
                    </Step>
                </Stepper>
                {!content && (
                    <ButtonGroup>
                        <Button
                            icon={vertical ? "arrow-up" : "arrow-left"}
                            text="Previous"
                            disabled={activeStep < 1}
                            onClick={this.handlePrevious}
                        />
                        <Button
                            icon={vertical ? "arrow-down" : "arrow-right"}
                            text="Next"
                            disabled={activeStep > 2}
                            onClick={this.handleNext}
                        />
                    </ButtonGroup>
                )}
                {content && activeStep > 2 && <Button icon="undo" text="Reset" onClick={this.handleReset} />}
            </Example>
        );
    }

    private handlePrevious = () => {
        this.setState(prevState => ({ activeStep: prevState.activeStep - 1 }));
    };

    private handleNext = () => {
        this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }));
    };

    private handleReset = () => {
        this.setState({ activeStep: 0 });
    };

    private handleAccordionChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ accordion: event.currentTarget.checked });
    };

    private handleFillChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ fill: event.currentTarget.checked });

        if (event.currentTarget.checked) {
            this.setState({ accordion: false });
        }
    };

    private handleErrorChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ errored: event.currentTarget.checked });
    };

    private handleLargeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ large: event.target.checked });
    };

    private handleContentChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ content: event.currentTarget.checked });

        if (event.currentTarget.checked) {
            this.setState({
                alternativeLabel: false,
                vertical: true,
            });
        }
    };

    private handleVerticalChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ vertical: event.currentTarget.checked });

        if (event.currentTarget.checked) {
            this.setState({ alternativeLabel: false });
        } else {
            this.setState({ content: false });
        }
    };

    private handleAlternativeLabelChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ alternativeLabel: event.currentTarget.checked });

        if (event.currentTarget.checked) {
            this.setState({
                content: false,
                vertical: false,
            });
        }
    };

    private handleIconChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({ iconType: event.currentTarget.value as keyof typeof iconTypes });
    };
}
