import React, { useState, useRef, useEffect } from "react";
import './Accordion.css';
import Chart from "../Chart/Chart";

// Accordion Component
const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const accordionRefs = useRef([]);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (activeIndex !== null) {
      // Use setTimeout to allow DOM changes (like accordion expanding) to finish
      setTimeout(() => {
        accordionRefs.current[activeIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Adjust delay to ensure the accordion content is fully expanded
    }
  }, [activeIndex]);

  return (
    <div className="accordion-container">
      {data.map((section, sectionIndex) => (
        <div key={sectionIndex} className="accordion-section">
          {/* Section Header */}
          <div
            ref={(el) => (accordionRefs.current[sectionIndex] = el)}
            className={`accordion-header ${
              activeIndex === sectionIndex ? "active" : ""
            }`}
            onClick={() => toggleAccordion(sectionIndex)}
          >
            <h3>{section.title}</h3>
            <span>{activeIndex === sectionIndex ? "▲" : "▼"}</span>
          </div>

          {/* Section Content */}
          {activeIndex === sectionIndex && (
            <div className="accordion-content">
              {/* Description above the table */}
              {section.description && (
                <p dangerouslySetInnerHTML={{ __html: section.description }} />
              )}

              {/* Chart */}
              {section.sentimentApiUrl && section.apiUrl && (
                <Chart
                  sentimentApiUrl={section.sentimentApiUrl}
                  apiUrl={section.apiUrl}
                />
              )}

              {/* Table (only if items exist) */}
              {section.items && section.items.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Peraturan Perundang-Undangan</th>
                      <th>Tentang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td>{item.no}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;