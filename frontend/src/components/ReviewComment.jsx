import React, { useState } from "react";
import "../Styles/ReviewComment.css";

const ReviewComment = ({ text, maxVisibleChars = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = text.length > maxVisibleChars
    ? `${text.slice(0, maxVisibleChars)}...`
    : text;

  return (
    <div className="review-comment">
      <p>
        {isExpanded ? text : truncatedText}
        {text.length > maxVisibleChars && (
          <span
            className="read-more"
            onClick={toggleReadMore}
          >
            {isExpanded ? " Leer menos" : " Leer más"}
          </span>
        )}
      </p>
    </div>
  );
};

export default ReviewComment;
