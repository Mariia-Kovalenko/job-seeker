import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef, useState } from "react";

type RichTextInputProps = {
  onChange: (value: string) => void;
  value: string;
};

export default function RichTextInput({ onChange, value }: RichTextInputProps) {
  const { theme } = useTheme();
  const editorRef = useRef<HTMLDivElement>(null);

  const [html, setHtml] = useState("");
  const [isActive, setIsActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    ul: false,
    ol: false,
    block: "p",
  });

  // Apply formatting
  const applyFormat = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    updateToolbar();
    setHtml(editorRef.current?.innerHTML || "");
    onChange?.(editorRef.current?.innerHTML || "");
  };

  // Sync toolbar with cursor/selection
  const updateToolbar = () => {
    setIsActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strike: document.queryCommandState("strikeThrough"),
      ul: document.queryCommandState("insertUnorderedList"),
      ol: document.queryCommandState("insertOrderedList"),
      block: document.queryCommandValue("formatBlock") || "p",
    });
  };

  // Listen to cursor/selection changes
  useEffect(() => {
    document.addEventListener("selectionchange", updateToolbar);
    return () => {
      document.removeEventListener("selectionchange", updateToolbar);
    };
  }, []);

  const toolbarBtn = (active: boolean) =>
    `p-2 w-8 h-8 rounded-lg flex items-center justify-center text-sm
     ${active ? "bg-gray-300" : "hover:bg-gray-200"}`;

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className={`flex items-center gap-2 p-2 bg-gray-100 rounded-lg mb-2 border ${theme === "dark" ? "bg-lightGrey border-gray-300" : "bg-gray-100"}`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            applyFormat("bold");
          }}
          className={toolbarBtn(isActive.bold)}
        >
          <b>B</b>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            applyFormat("italic");
          }}
          className={toolbarBtn(isActive.italic)}
        >
          <i>I</i>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            applyFormat("underline");
          }}
          className={toolbarBtn(isActive.underline)}
        >
          <u>U</u>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            applyFormat("strikeThrough");
          }}
          className={toolbarBtn(isActive.strike)}
        >
          <s>S</s>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            applyFormat("insertUnorderedList");
          }}
          className={toolbarBtn(isActive.ul)}
        >
          •
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            applyFormat("insertOrderedList");
          }}
          className={toolbarBtn(isActive.ol)}
        >
          1.
        </button>

        <select
          value={isActive.block}
          onChange={(e) => {
            e.preventDefault();
            applyFormat("formatBlock", e.target.value);
          }}
          className="ml-2 p-1 border rounded"
        >
          <option value="p">P</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={() => setHtml(editorRef.current?.innerHTML || "")}
        className={`contenteditable prose max-w-none min-h-[200px] p-3 border-[1.3px] rounded-lg outline-none ${
          theme === "dark"
            ? "prose-invert bg-lightGrey text-white border-gray-300"
            : "bg-white text-darkBackground border-lighterGrey"
        }`}
      />

      {/* Debug output (remove in prod) */}
      {/* <pre className="mt-4 text-xs bg-gray-100 p-2 rounded overflow-auto">
        {html}
      </pre> */}
    </div>
  );
}
