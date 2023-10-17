/**
 *
 * @module      mod_nextblocks/env
 * @copyright   2023 Duarte Pereira<dg.pereira@campus.fct.unl.pt>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* globals Blockly */

/* globals javascript */

import {getWorkspaceCode, parseTestsFile, replaceCode, runTests} from "./lib";

const toolbox = {
    'kind': 'categoryToolbox',
    'readOnly': true,
    'contents': [
        {
            'kind': 'toolboxlabel',
            'name': 'NextBlocks',
            'colour': 'darkslategrey'
        },
        {
            'kind': 'category',
            'name': 'Logic',
            'colour': '5b80a5',
            "cssConfig": {
                'icon': 'customIcon fa fa-cog',
            },
            'contents': [
                {
                    'kind': 'block',
                    'type': 'controls_if',
                },
                {
                    'kind': 'block',
                    'type': 'logic_compare',
                },
                {
                    'kind': 'block',
                    'type': 'logic_operation',
                },
                {
                    'kind': 'block',
                    'type': 'logic_boolean',
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Math',
            'colour': '5b67a5',
            "cssConfig": {
                'icon': 'customIcon fa-solid fa-plus-minus',
            },
            'contents': [
                {
                    'kind': 'block',
                    'type': 'math_number',
                },
                {
                    'kind': 'block',
                    'type': 'math_arithmetic',
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Text',
            'colour': '5ba58c',
            "cssConfig": {
                'icon': 'customIcon fa-solid fa-font',
            },
            'contents': [
                {
                    'kind': 'block',
                    'type': 'text',
                },
                {
                    'kind': 'block',
                    'type': 'text_print',
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Variables',
            'colour': 'a55b80',
            "cssConfig": {
                'icon': 'customIcon fa-solid fa-clipboard-list',
            },
            'custom': 'VARIABLE',
        },
        {
            'kind': 'category',
            'name': 'Functions',
            'colour': '995ba5',
            "cssConfig": {
                'icon': 'customIcon fa-solid fa-code',
            },
            'custom': 'PROCEDURE',
        },
        {
            'kind': 'category',
            'name': 'Input',
            'colour': '180',
            "cssConfig": {
                'icon': 'customIcon fa-solid fa-keyboard',
            },
            'contents': [
                {
                    'kind': 'block',
                    'type': 'text_input',
                },
                {
                    'kind': 'block',
                    'type': 'text_multiline_input',
                },
            ],
        },
    ],
};

const options = {
    toolbox: toolbox,
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    media: 'https://blockly-demo.appspot.com/static/media/',
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: false,
    grid: {
        spacing: 20,
        length: 1,
        colour: '#888',
        snap: false,
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
    },
};

let workspace;

export const init = (contents) => {
    workspace = Blockly.inject('blocklyDiv', options);
    // eslint-disable-next-line no-unused-vars
    const tests = parseTestsFile(contents);

    addInputBlocks(tests);

    const runButton = document.getElementById('runButton');
    runButton.addEventListener('click', function() {
        const code = getWorkspaceCode(workspace);
        runCode(code);
    });

    if (contents !== '') {
        runTestsHandler(tests);
    }
};

/**
 * @param {{}} tests
 * Adds the input blocks to the workspace
 */
function addInputBlocks(tests) {
    const test = tests[0];
    const inputs = test.inputs;
    const addedBlocks = [];

    // Add a block for each input
    inputs.forEach((input) => {
        const inputName = Object.keys(input)[0];
        addedBlocks.push(createForcedInputBlock(inputName));
    });
    // Move the blocks down so they don't overlap
    addedBlocks.forEach((block, i) => {
        block.moveBy(0, i * 50);
    });
}

/**
 * @param {String} prompt
 * @returns {Blockly.BlockSvg} The block that was created
 */
function createForcedInputBlock(prompt) {
    const blockName = "forced_input_" + prompt;
    Blockly.Blocks[blockName] = {
        init: function () {
            this.appendDummyInput()
                .appendField(prompt)
                .appendField(new Blockly.FieldTextInput('text'), prompt);
            this.setOutput(true, "String");
            this.setDeletable(false);
            this.setColour(180);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    // eslint-disable-next-line no-unused-vars
    javascript.javascriptGenerator.forBlock[blockName] = function (block, generator) {
        const text = block.getFieldValue(prompt);
        //let code = '"' + text + '"';
        let code = '(function () { let ' + prompt + ' = "' + text + '"; return ' + prompt + ';})()';
        return [code, Blockly.JavaScript.ORDER_NONE];
    };

    const newBlock = workspace.newBlock(blockName);
    newBlock.initSvg();
    newBlock.render();

    return newBlock;
}

/**
 * @param {{}} tests the contents of the tests file
 */
function runTestsHandler(tests) {
    // Listen for clicks on the run tests button
    const runTestsButton = document.getElementById('runTestsButton');
    runTestsButton.addEventListener('click', () => { // Needs anonymous function wrap to pass argument
        const results = runTests(workspace, tests);
        displayTestResults(results);
    });
}

/**
 * @param {Boolean[]} results
 */
function displayTestResults(results) {
    const testResultsDiv = document.getElementById('testResultsDiv');
    testResultsDiv.innerHTML = '';
    results.forEach((result, i) => {
        const testResult = document.createElement('p');
        testResult.innerHTML = 'Test ' + (i + 1) + ': ' + (result ? 'Passed' : 'Failed');
        testResultsDiv.appendChild(testResult);
    });
}

/**
 * @param {String} code The Javascript code to be run
 * @returns {*} The output of the code
 * Runs the code and returns the output, does not display it
 */
function silentRunCode(code) {
    replaceCode(code);
    // eslint-disable-next-line no-eval
    return eval(code);
}

/**
 * @param {String} code The Javascript code to be run
 * Runs the code and displays the output in the output div
 */
function runCode(code) {
    // eslint-disable-next-line no-eval,no-console
    const output = silentRunCode(code);

    const outputDiv = document.getElementById('outputDiv');
    outputDiv.innerHTML += output;
}

// eslint-disable-next-line no-unused-vars
// Redefine the text_print block to use the outputString variable instead of alert.
javascript.javascriptGenerator.forBlock.text_print = function(block, generator) {
    return (
        "outputString += " +
        (generator.valueToCode(
            block,
            "TEXT",
            Blockly.JavaScript.ORDER_NONE
        ) || "''") +
        ";\n"
    );
};

Blockly.Blocks.text_input = {
    init: function() {
        this.appendDummyInput()
            .appendField("text input:")
            .appendField(new Blockly.FieldTextInput('text'),
                'text_input');
        this.setOutput(true, "String");
        this.setColour(180);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks.text_multiline_input = {
    init: function() {
        this.appendDummyInput()
            .appendField("multiline text input:")
            .appendField(new Blockly.FieldMultilineInput('multiline \n text'),
                'text_input');
        this.setOutput(true, "String");
        this.setColour(180);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// eslint-disable-next-line no-unused-vars
javascript.javascriptGenerator.forBlock.text_input = function(block, generator) {
    const text = block.getFieldValue('text_input');
    let code = '"' + text + '"';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

// eslint-disable-next-line no-unused-vars
javascript.javascriptGenerator.forBlock.text_multiline_input = function(block, generator) {
    const text = block.getFieldValue('text_input');
    let code = "`" + text + "`";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

class CustomCategory extends Blockly.ToolboxCategory {
    /**
     * Constructor for a custom category.
     * @override
     */
    constructor(categoryDef, toolbox, optParent) {
        super(categoryDef, toolbox, optParent);
    }

    /** @override */
    addColourBorder_(colour){
        this.rowDiv_.style.backgroundColor = colour;
    }

    /** @override */
    setSelected(isSelected) {
        // We do not store the label span on the category, so use getElementsByClassName.
        var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
        if (isSelected) {
            // Change the background color of the div to white.
            this.rowDiv_.style.backgroundColor = 'white';
            // Set the colour of the text to the colour of the category.
            labelDom.style.color = this.colour_;
            this.iconDom_.style.color = this.colour_;
        } else {
            // Set the background back to the original colour.
            this.rowDiv_.style.backgroundColor = this.colour_;
            // Set the text back to white.
            labelDom.style.color = 'white';
            this.iconDom_.style.color = 'white';
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED, isSelected);
    }
}

class ToolboxLabel extends Blockly.ToolboxItem {
    constructor(toolboxItemDef, parentToolbox) {
        super(toolboxItemDef, parentToolbox);
    }

    /** @override */
    init() {
        // Create the label.
        this.label = document.createElement('label');

        // Set the name.
        this.label.textContent = this.toolboxItemDef_.name;
        // Set the color.
        this.label.style.color = this.toolboxItemDef_.colour;
    }

    /** @override */
    getDiv() {
        return this.label;
    }
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, 'toolboxlabel', ToolboxLabel);

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, Blockly.ToolboxCategory.registrationName, CustomCategory, true);
