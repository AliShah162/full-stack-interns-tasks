import React, { useState } from "react";

function AccordionItems({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <h1>{title}</h1>
      {isOpen && <p> {content}</p>}
    </div>
  );
}

const Accordion = () => {
  return (
    <div>
      <AccordionItems title="My name" content="Ali" />
      <AccordionItems title="My Age" content="23" />
      <AccordionItems title="My Role" content="Full Stack Dev" />
    </div>
  );
};

export default Accordion;
