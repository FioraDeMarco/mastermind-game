import React from "react";

const Feedback = ({ ...feedback }) => {
  let feedbackArray = [...Object.values(feedback)];
  let feedbackIndex = [...Object.keys(feedback)];

  return (
    <section>
      <ul>
        {feedbackArray.length > 1
          ? feedbackArray.map((tip, i) => {
              <h1>Here is Your Feedback</h1>;
              if (i === 0) return;
              return (
                <>
                  <li key={`${i}`}>
                    <span>Feedback Turn#{`${i}`}</span>
                  </li>

                  <li key={`${tip}`}>
                    <span>{`${tip}`}</span>
                  </li>
                </>
              );
            })
          : ""}
      </ul>
    </section>
  );
};

export default Feedback;
