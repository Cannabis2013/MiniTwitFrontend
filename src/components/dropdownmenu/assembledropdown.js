
const frameId = "mouseFrame";

export default {
    getLeftPositionOfElement(e) {
        
        const element = document.getElementById(e);
        const rect = element.getBoundingClientRect();
        return rect.left;
    },
    createFrame() {
        let frame = document.createElement("div");
        frame.id = frameId;
        frame.style = "background-color: blue;position: absolute;top: 0;right:0;bottom: 0;left:0";
        document.body.append(frame);
        return frame;
    },
    removeFrame(){
        let frame = document.getElementById(frameId);
        document.body.removeChild(frame);
    },
    showDropDownMenu(id)
    {
        console.log(id);
        // Get dropdownmenu elemement
        let dropDownMenu = document.getElementById("ddm" + id);
        // Get buttons div element
        let buttonDiv = document.getElementById("ddb" + id);
        // Change letter
        buttonDiv.innerText = "x";
        // Display dropdownmenu element
        dropDownMenu.style.display = "grid";
        // Compute top bound
        let buttonDivHeight = buttonDiv.getBoundingClientRect().height;
        let dropDownMenuTop = buttonDiv.getBoundingClientRect().top + buttonDivHeight;
        // Computer left bound
        let buttonDivWidth = buttonDiv.getBoundingClientRect().width;
        let widthDiff = dropDownMenu.getBoundingClientRect().width - buttonDivWidth;
        let dropDownMenuLeft = buttonDiv.getBoundingClientRect().left - widthDiff;
        // Computer right bound
        let dropDownMenuRight = buttonDiv.getBoundingClientRect().right - widthDiff;
        // Set bounds
        dropDownMenu.style.left = dropDownMenuLeft + "px";
        dropDownMenu.style.top = dropDownMenuTop + "px";
        dropDownMenu.style.right = dropDownMenuRight + "px";
    },
    hideDropDownMenu(id)
    {
        // Get button element
        let buttonDiv = document.getElementById("ddb" + id);
        // Change letter back to original
        buttonDiv.innerText = "=";
        // Get dropdownmenu element
        let dropDownMenu = document.getElementById("ddm" + id);
        // Set dropdownmenu display hint back to 'none'
        dropDownMenu.style.display = "none";
    }
};
