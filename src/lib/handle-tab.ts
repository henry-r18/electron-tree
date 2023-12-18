export const handleTab = (event) => {
    const target = event.target
    let value = target.value
    switch(event.key) {
        case "Tab":
        event.preventDefault();
            // selection?
            if (target.selectionStart == target.selectionEnd)
            {
                // These single character operations are undoable
                if (!event.shiftKey)
                {
                    document.execCommand('insertText', false, "\t");
                }
                else
                {
                    var text = value;
                    if (target.selectionStart > 0 && text[target.selectionStart-1]=='\t')
                    {
                        document.execCommand('delete');
                    }
                }
            }
            else
            {
                // Block indent/unindent trashes undo stack.
                // Select whole lines
                var selStart = target.selectionStart;
                var selEnd = target.selectionEnd;
                var text = value;
                while (selStart > 0 && text[selStart-1] != '\n')
                    selStart--;
                while (selEnd > 0 && text[selEnd-1]!='\n' && selEnd < text.length)
                    selEnd++;

                // Get selected text
                let lines = text.substr(selStart, selEnd - selStart).split('\n');

                // Insert tabs
                for (var i=0; i<lines.length; i++)
                {
                    // Don't indent last line if cursor at start of line
                    if (i==lines.length-1 && lines[i].length==0)
                        continue;

                    // Tab or Shift+Tab?
                    if (event.shiftKey)
                    {
                        if (lines[i].startsWith('\t'))
                            lines[i] = lines[i].substr(1);
                        else if (lines[i].startsWith("    "))
                            lines[i] = lines[i].substr(4);
                    }
                    else
                        lines[i] = "\t" + lines[i];
                }
                let output = lines.join('\n');

                // Update the text area
                value = text.substr(0, selStart) + output + text.substr(selEnd);
                target.selectionStart = selStart;
                target.selectionEnd = selStart + output.length; 
            }
            return false;
    }
}