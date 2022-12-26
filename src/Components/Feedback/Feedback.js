import React from "react";

const Feedback = ({ ...feedback }) => {
  let feedbackArray = [...Object.values(feedback)];

  return (
    <section>
      <div>
        {feedbackArray.length > 0
          ? feedbackArray.map((tip, i) => {
              <h1>Here is Your Feedback</h1>;
              if (i === 0) return;

              return (
                <>
                  <br />
                  <div key={`${i}`}>
                    <span>Feedback Turn#{`${i}`}</span>
                  </div>
                  <div key={`${i}`}>
                    <span>{`${tip}`}</span>
                  </div>
                </>
              );
            })
          : ""}
      </div>
    </section>
  );
};

export default Feedback;
