// File name: mytoolkit.js

import { Button } from './button.js';
import { CheckBox } from './checkbox.js'
import { RadioButton } from './radiobutton.js';
import { TextBox } from "./textbox.js";
import { ScrollBar } from "./scrollbar.js"
import { ProgressBar } from './progressbar.js';
import { CustomSpinner } from './customspinner.js';

var MyToolkit = (function() {

    return {Button, CheckBox, RadioButton, TextBox, ScrollBar, ProgressBar,CustomSpinner}
}());

export{MyToolkit}