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
global $DB, $OUTPUT, $PAGE, $CFG, $page;

/**
 * Prints an instance of mod_nextblocks.
 *
 * @package     mod_nextblocks
 * @copyright   2023 Duarte Pereira<dg.pereira@campus.fct.unl.pt>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use event\course_module_viewed;

require(__DIR__ . '/../../config.php');
require_once(__DIR__ . '/lib.php');

// Course module id.
$id = optional_param('id', 0, PARAM_INT);

// Activity instance id.
$n = optional_param('n', 0, PARAM_INT);

if ($id) {
    $cm = get_coursemodule_from_id('nextblocks', $id, 0, false, MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $moduleinstance = $DB->get_record('nextblocks', array('id' => $cm->instance), '*', MUST_EXIST);
} else {
    $moduleinstance = $DB->get_record('nextblocks', array('id' => $n), '*', MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $moduleinstance->course), '*', MUST_EXIST);
    $cm = get_coursemodule_from_instance('nextblocks', $moduleinstance->id, $course->id, false, MUST_EXIST);
}

require_login($course, true, $cm);

$modulecontext = context_module::instance($cm->id);

echo '<script src="./blockly/blockly_compressed.js"></script>
    <script src="./blockly/blocks_compressed.js"></script>
    <script src="./blockly/msg/en.js"></script>
    <script src="./blockly/javascript_compressed.js"></script>';

$PAGE->requires->js_call_amd('mod_nextblocks/codeenv', 'init');

$PAGE->set_url('/mod/nextblocks/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($moduleinstance->name));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($modulecontext);

echo $OUTPUT->header();

$cmid = $PAGE->cm->id;
$cm = get_coursemodule_from_id('nextblocks', $cmid, 0, false, MUST_EXIST);
$instanceid = $cm->instance;

$title = $DB->get_field('nextblocks', 'name', array('id' => $instanceid));
$description = $DB->get_field('nextblocks', 'intro', array('id' => $instanceid));

echo $OUTPUT->heading($title);
echo '<p>' . $description . '</p>';

echo '<div class="container mt-6 mb-6">
    <div class="row">
    <div class="col-md-8">
        <div id="blocklyDiv" class="col-md-12"></div>
    </div>
    <div class="col-md-4">
            <img src="pix/opinion.png" alt="Dummy opinion image">
    </div>
    </div>
</div>';

//make div for displaying static code text
echo '<div id="codeDiv" class="container mt-6 mb-6"></div>';

echo '<div style="text-align: center;">';
echo '<input id="runButton" type="submit" class="btn btn-primary m-2" value="'.get_string("nextblocks_run", "nextblocks").'" />';

//make submit and cancel buttons centered
echo '<div style="text-align: center;">';

echo '<input type="submit" class="btn btn-primary m-2" value="'.get_string("nextblocks_submit", "nextblocks").'" />';
echo '<input type="submit" class="btn btn-primary m-2" value="'.get_string("nextblocks_cancel", "nextblocks").'" />';

echo '</div>';

//make horizontal separator
echo '<hr>';

echo '<div style="text-align: center;">';
echo '<img src="pix/chat.png" alt="Dummy chat image">';
echo '</div>';

echo $OUTPUT->footer();
