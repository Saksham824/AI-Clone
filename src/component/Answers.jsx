import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStars } from "./helper";

const Answers = ({ ans, index, totalResult }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  });

  return (
    <div>
      {index == 0 && totalResult > 1 ? (
        <span className="font-medium">{answer}</span>
      ) : heading ? (
        <span className="py-5 text-gray-200 text-lg block">{answer}</span>
      ) : (
        <span className="">{answer}</span>
      )}
    </div>
  );
};

export default Answers;
