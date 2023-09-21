import { useEffect, useState } from "react";

export const ShowMore = ({ text, maxLength }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const initShowMore = () => {
    if (text.length >= maxLength) {
      setIsShowMore(true);
    }
  };
  const textToShow = () => {
    if (!isShowMore || isOpen) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  useEffect(() => {
    initShowMore();
  }, []);
  return (
    <section className="show-more">
      <p className="text">{textToShow()}</p>
      {isShowMore && (
        <p className="show-more-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Show less" : "Show more"}
        </p>
      )}
    </section>
  );
};
