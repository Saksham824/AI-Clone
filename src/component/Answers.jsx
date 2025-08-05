import React, { useEffect, useState } from "react";
import {
  checkHeading,
  replaceHeadingStars,
  isListItem,
  isCodeBlockMarker,
} from "./helper";

const Answers = ({ ans, index = 0, totalResult = 1 }) => {
  const [parsedElements, setParsedElements] = useState([]);

  useEffect(() => {
    const lines = ans.split("\n");
    const elements = [];
    let inCode = false;
    let codeBuffer = [];

    lines.forEach((line, idx) => {
      if (isCodeBlockMarker(line)) {
        if (inCode) {
          elements.push(
            <pre
              key={`code-${idx}`}
              className="bg-[#1e1e2e] text-green-300 p-3 rounded-lg overflow-x-auto text-sm mb-2 whitespace-pre-wrap"
            >
              {codeBuffer.join("\n")}
            </pre>
          );
          codeBuffer = [];
        }
        inCode = !inCode;
      } else if (inCode) {
        codeBuffer.push(line);
      } else if (checkHeading(line)) {
        elements.push(
          <h2
            key={`heading-${idx}`}
            className="text-xl font-bold text-blue-300 border-b border-blue-500 pb-1 mb-2 mt-4"
          >
            {replaceHeadingStars(line)}
          </h2>
        );
      } else if (isListItem(line)) {
        elements.push(
          <li
            key={`list-${idx}`}
            className="ml-4 list-disc text-gray-200 text-base"
          >
            {line.replace(/^(\d+\.|\-)\s+/, "")}
          </li>
        );
      } else if (line.trim() !== "") {
        elements.push(
          <p
            key={`para-${idx}`}
            className={`text-gray-200 text-base mb-2 ${
              index === 0 && totalResult > 1
                ? "bg-blue-900/30 rounded-lg px-3 py-2 shadow font-semibold"
                : ""
            }`}
          >
            {line.trim().replace(/^\*\*(.+)\*\*$/, "$1")}
          </p>
        );
      }
    });

    setParsedElements(elements);
  }, [ans, index, totalResult]);

  return <div className="mb-4">{parsedElements}</div>;
};

export default Answers;
