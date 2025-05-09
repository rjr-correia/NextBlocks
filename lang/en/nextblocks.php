<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Plugin strings are defined here.
 *
 * @package     mod_nextblocks
 * @category    string
 * @copyright   2025 Duarte Pereira<dg.pereira@campus.fct.unl.pt>
 * @copyright   2025 Rui Correia<rjr.correia@campus.fct.unl.pt>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'NextBlocks plugin';
$string['modulename'] = 'NextBlocks';
$string['modulenameplural'] = 'NextBlocks';
$string['settings'] = 'NextBlocks settings';
$string['nextblockssettings'] = 'NextBlocks settings';
$string['nextblocksname'] = "Exercise name";
$string['nextblocksname_help'] = "Name of the NextBlocks activity";
$string['nextblockscreatetiming'] = "Timing";
$string['nextblockscreategrading'] = "Grades";
$string['nextblockscreatetests'] = "Tests";
$string['nextblockscreatecustomblocks'] = "Custom Blocks";
$string['nextblockscreateprimitiverestrictions'] = "Primitive Restrictions";
$string['testsinput'] = "Input";
$string['testsinput_help'] = "Test Input";
$string['testsoutput'] = "Output";
$string['testsoutput_help'] = "Test Output";
$string['customblocksinput'] = "Custom Block Code";
$string['customblocksinput_help'] = "Code for the custom block. <br> For information on how to write a custom block visit www.google.com";
$string['nextblocks_submit'] = "Submit";
$string['nextblocks_cancel'] = "Cancel";
$string['nextblocks_run'] = "Run";
$string['nextblocks_runtests'] = "Tests";
$string['nextblocks_save'] = "Save";
$string['testsradiolabel'] = "Tests input method:";
$string['testsradio_help'] = "Method for submitting test cases. <br><br> File: Upload a file with the test cases. <br> Text Boxes: Write the test cases the text boxes.";
$string['testsradiofile'] = "File";
$string['testsradiotextbox'] = "Text Boxes";
$string['testsfilesubmit'] = "Tests file:";
$string['iseval'] = "Exercise is graded?";
$string['iseval_help'] = "Check if the exercise is for graded.";
$string['nextblocks_tab_view'] = "Test";
$string['nextblocks_tab_edit'] = "Test";
$string['pluginadministration'] = 'NextBlocks Administration';
$string['invalidfilestructure'] = 'Invalid test file structure';
$string['invalidfilecount'] = 'Only upload 1 test file';
$string['blockdefinition'] = 'Custom block definition';
$string['blockdefinition_help'] = 'Custom block definition. <br> Copy code from the <b> Block Definition </b> section of the Block Factory. Needs to be in JavaScript format.';
$string['blockgenerator'] = 'Custom block generator (Javascript)';
$string['blockgenerator_help'] = 'Custom block generator function. <br> Copy code from the <b> Generator stub </b> section of the Block Factory. Needs to be in JavaScript. You need to manually add the block code, in var code = ...';
$string['blockpythongenerator'] = 'Custom block generator (Python)';
$string['blockpythongenerator_help'] = 'Custom block generator function. <br> Copy code from the <b> Generator stub </b> section of the Block Factory. Needs to be in Python. You need to manually add the block code, in var code = ...';
$string['customblockstext'] = '<p> Create a custom Blockly block. Intended for advanced users. <br> Please note that the custom block code is not validated in any way, so if the definition or the generator are not correct, the custom block will not work. <br> For help creating a custom block, visit <a target=”_blank” href="https://blockly-demo.appspot.com/static/demos/blockfactory/index.html">https://blockly-demo.appspot.com/static/demos/blockfactory/index.html</a> </p>';
$string['addanothercustomblock'] = 'Add another custom block';
$string['deletestr'] = 'Delete';
$string['gradingselect'] = 'Grading method';
$string['gradingselect0'] = 'None';
$string['gradingselect1'] = 'Point';
$string['gradingselect2'] = 'Scale';
$string['gradingselect3'] = 'Feedback only';
$string['maxgrade'] = 'Maximum grade';
$string['nextblockscreatesubmissions'] = 'Submissions';
$string['multiplesubmissions'] = 'Allow multiple submissions';
$string['howmanysubmissions'] = 'How many submissions';
$string['testsfile'] = 'Tests file';
$string['testsfile_help'] = "File containing the test cases. <br> The file must be in the following format: <br> <br> <b>Input1</b> <br> <b>Output1</b> <br> <b>Input2</b> <br> <b>Output2</b> <br> <b>...</b> <br> <b>InputN</b> <br> <b>OutputN</b> <br> <br> Where <b>Input</b> is the input for the test case and <b>Output</b> is the expected output for the test case.";
$string['newgrade'] = "New Grade: ";
$string['blocklimits'] = 'Block limits';
$string['limitblock'] = 'Max uses for block: {$a}';
