/**
 *
 * @module      mod_nextblocks/lib
 * @copyright   2023 Duarte Pereira<dg.pereira@campus.fct.unl.pt>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* globals Blockly */

/* globals javascript */

/* globals python */

define(['mod_nextblocks/codestring', 'mod_nextblocks/codestringPython'], function(CodeString, CodeStringPython) {
        /**
         * @param {BlockSvg} block the block whose code is to be generated
         * @returns {string} the code generated by Blockly for the given block
         */
        function generateFunctionCode(block) {
            Blockly.JavaScript.blockToCode(block);
            // Get function name
            let functionName = '%' + javascript.javascriptGenerator.nameDB_.getName(block.getFieldValue('NAME'),
                Blockly.Procedures.NAME_TYPE);
            functionName = functionName.substring(0, functionName.length - 1);
            return javascript.javascriptGenerator.definitions_[functionName] + '\n';
        }

    /**
     * @param {BlockSvg} block the block whose code is to be generated
     * @returns {string} the code generated by Blockly for the given block
     */
    function generateFunctionCodePython(block) {
        Blockly.Python.blockToCode(block);
        // Get function name
        let functionName = '%' + python.pythonGenerator.nameDB_.getName(block.getFieldValue('NAME'),
            Blockly.Procedures.NAME_TYPE);
        functionName = functionName.substring(0, functionName.length - 1);
        return python.pythonGenerator.definitions_[functionName] + '\n';
    }

        /**
         * @param {BlockSvg} block the block whose descendants are to have their code generated
         * @returns {string} the code generated by Blockly for the descendants of the given block
         */
        function generateDescendantsCode(block) {
            let descendantsCode = '';
            block.getChildren(true).forEach((child) => {
                descendantsCode += Blockly.JavaScript.blockToCode(child);
            });
            return descendantsCode;
        }

    /**
     * @param {BlockSvg} block the block whose descendants are to have their code generated
     * @returns {string} the code generated by Blockly for the descendants of the given block
     */
    function generateDescendantsCodePython(block) {
        let descendantsCode = '';
        block.getChildren(true).forEach((child) => {
            descendantsCode += Blockly.Python.blockToCode(child);
        });
        return descendantsCode;
    }

        return {
            /**
             * @param {String} code The Javascript code to be run
             * @returns {any} The output of the code
             * Runs the code and returns the output, does not display it
             * TODO: do something other than use eval
             */
            silentRunCode: async function (code) {
                /* eslint-disable no-eval */
                const result = await eval(code);
                return typeof result === 'undefined' ? code : result;
            },

            /**
             * Formats the code with correct HTML structure to be displayed in the code div
             * @param {CodeString} code the code text to be formatted (string literal)
             * @param {boolean} debugMode whether to display the code as is, or with the wrapper function
             * @returns {string} the formatted code
             */
            formatCodeHTML: (code, debugMode = false) => {
                if (!debugMode) {
                    return '<pre>' + code.getPrintableCodeString() + '</pre>';
                } else {
                    return '<pre>' + code.getCompleteCodeString() + '</pre>';
                }
            },

            /**
             * Formats the code with correct HTML structure to be displayed in the code div
             * @param {CodeStringPython} code the code text to be formatted (string literal)
             * @param {boolean} debugMode whether to display the code as is, or with the wrapper function
             * @returns {string} the formatted code
             */
            formatPythonCodeHTML: (code, debugMode = false) => {
                if (!debugMode) {
                    return '<pre>' + code.getPrintableCodeString() + '</pre>';
                } else {
                    return '<pre>' + code.getCompleteCodeString() + '</pre>';
                }
            },

            /**
             * Inserts the test results accordion in the area above the Run and Tests buttons
             * @param {any[]|null} results the outputs of the tests
             * @param {{}} testsJSON the tests that were run (for displaying the inputs and outputs)
             * Note: if this is not empty, results is null
             * @returns {string} the HTML for the accordion
             */
            testsAccordion: function (results, testsJSON) {
                const testCaseCount = testsJSON.length;
                let accordion = '<div class="d-flex flex-wrap" style="max-height: 100%; overflow-y: auto;">';

                for (let i = 0; i < testCaseCount; i++) {
                    accordion += '<div class="card m-2" style="flex: 1 1 calc(25% - 20px); min-width: 250px;">';
                    accordion += '<details class="card-body">';
                    accordion += '<summary class="card-header" style="border-bottom: none;">';
                    accordion += 'Test ' + (i + 1);

                    if (results === null || results[i] === undefined) {
                        accordion += '<span class="badge badge-warning float-right">Not run</span>';
                    } else if (results[i].includes("Error")) {
                        accordion += '<span class="badge badge-warning float-right" style="color: black !important;">Error</span>';
                    } else if (results[i] === testsJSON[i].output) {
                        accordion += '<span class="badge badge-success float-right" style="color: green !important;">Passed</span>';
                    } else {
                        accordion += '<span class="badge badge-danger float-right" style="color: red !important;">Failed</span>';
                    }
                    accordion += '</summary>';

                    accordion += '<div class="pt-2" style="background-color: white !important;">';
                    /* eslint-disable no-loop-func */
                    testsJSON[i].inputs.forEach((input) => {
                        const prompt = Object.keys(input)[0];
                        const values = Object.values(input[prompt])[0];
                        const combination = [prompt].concat(values);

                        let inputString = "";
                        for (const v of combination) {
                            inputString += v;
                            inputString += "\n";
                        }

                        accordion += '<p class="pt-2 m-0">Test Input: </p>';
                        accordion += '<pre class="mt-1 mb-0 test-input">' + inputString + '</pre>';
                    });
                    accordion += '<p class="pt-2 mt-2 mb-0">Expected test output: </p>';
                    accordion += '<pre class="mt-1 mb-0 test-output">' + testsJSON[i].output + '</pre>';
                    accordion += '<div class="p-0">';
                    accordion += '<p class="pt-2 m-0">Your output: </p>';
                    if (results === null) {
                        accordion += '<pre class="mt-1 mb-0 test-output">Not run</pre>';

                    } else if (results[i].includes("Error")) {
                        accordion += '<pre class="mt-1 mb-0 test-output" style="color: red !important;">' +
                            results[i] + '</pre>';
                    } else {
                        accordion += '<pre class="pb-2 mt-1 mb-0 test-output">' + results[i] + '</pre>';
                    }
                    accordion += '</div>';
                    accordion += '</div>';
                    accordion += '</details>';
                    accordion += '</div>';
                }

                accordion += '</div>';
                return accordion;
            },

            /**
             * Changes the code to correctly output execution errors
             * @param {CodeString} code the code text to be formatted (string literal)
             * @returns {string} the formatted code
             */
            errorPrevention: (code) => {
                //Avoid infinite loops
                code = code.replace(/((?:while|for)\s*\([^)]*\)\s*\{)/g,
                    "$1\nif(loopIterations++>MAX_ITERATIONS) return outputString = " +
                    "\"Error: Maximum execution time exceeded\";");

                return code;
            },

            /**
             * Runs the tests on the given workspace and returns an array of booleans, one for each test, indicating whether
             * the test passed or not
             * @param {String} code the workspace to run the tests on
             * @param {{}} tests the tests to run
             * @returns {String[]} the output of each test
             */
            runTests: async function (code, tests) {
                let results = [];
                code = code.replace("runningTests = false;", "runningTests = true;");

                code = this.errorPrevention(code);

                for (const test of tests) {
                    let thisTestCode = code; // Need to copy, so that the code is not modified for the next test
                    const inputs = test.inputs;
                    for (const input of inputs) {
                        const prompt = Object.keys(input)[0];
                        const values = Object.values(input[prompt])[0];

                        const combination = [prompt].concat(values);

                        thisTestCode = thisTestCode.replace("const testInputs = [];",
                            "const testInputs = [" + combination.toString() + "];");

                    }
                    let codeOutput = await this.silentRunCode(thisTestCode);
                    codeOutput = codeOutput.trim();
                    results.push(codeOutput);
                }
                return results;
            },

            /**
             * @param {WorkspaceSvg} workspace the workspace to get the code from
             * @param {string} inputFuncDecs
             * @returns {CodeString} the code generated by Blockly for the current workspace
             *
             * Returns the Javascript code string generated by Blockly, with the necessary wrapping code
             */
            getWorkspaceCode: function (workspace, inputFuncDecs) {
                javascript.javascriptGenerator.addReservedWords('print, input');
                let codeString = new CodeString();

                codeString.addAuxFunctions(inputFuncDecs);

                const functionOpen = 'await (async () => {';
                codeString.addLine(functionOpen);

                let blocks = workspace.getTopBlocks(true);
                for (let b = 0; b < blocks.length; b++) {
                    const block = blocks[b];
                    if (block.type === 'start') {
                        codeString.addMainCode(generateDescendantsCode(block));
                    } else if (block.type === 'procedures_defnoreturn' || block.type === 'procedures_defreturn') {
                        codeString.addFunction(generateFunctionCode(block));
                    }
                }
                codeString.addEnding();
                return codeString;
            },

            /**
             * @param {WorkspaceSvg} workspace the workspace to get the code from
             * @param {string} inputFuncDecs
             * @returns {CodeStringPython} the code generated by Blockly for the current workspace
             *
             * Returns the Python code string generated by Blockly, with the necessary wrapping code
             */
            getWorkspaceCodePython: function (workspace, inputFuncDecs) {
                python.pythonGenerator.addReservedWords('print, input, text_ask');
                let codeString = new CodeStringPython();

                codeString.addAuxFunctions(inputFuncDecs);

                const functionOpen = 'await (async () => {';
                codeString.addLine(functionOpen);

                let blocks = workspace.getTopBlocks(true);
                for (let b = 0; b < blocks.length; b++) {
                    const block = blocks[b];
                    if (block.type === 'start') {
                        codeString.addMainCode(generateDescendantsCodePython(block));
                    } else if (block.type === 'procedures_defnoreturn' || block.type === 'procedures_defreturn') {
                        codeString.addFunction(generateFunctionCodePython(block));
                    }
                }
                codeString.addEnding();
                return codeString;
            },
        };
});
