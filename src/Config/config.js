let CONFIG = {};

CONFIG.steps = [
  {
    title: "First",
    content: "First-content",
    formComponent: {
      fields: ["username", "password"],
      type: ["text", "password"],
      required: [true, false],
    },
  },
  {
    title: "Second",
    content: "Second-content",
    formComponent: {
      fields: ["address", "state"],
      type: ["text", "text"],
      required: [true, false],
    },
  },
  {
    title: "Last",
    content: "Last-content",
    formComponent: {
      fields: ["test", "test2"],
      type: ["text", "text"],
      required: [true, true],
    },
  },
];

CONFIG.lastButtonText = "Done, Submit";

CONFIG.styles = {
  stepsContent: {
    marginTop: "2%",
    border: "1% dashed #e9e9e9",
    borderRadius: "2px",
    backgroundColor: "#fafafa",
    minHeight: "40vh",
    paddingTop: "2%",
  },

  stepsAction: {
    marginTop: "2%",
  },
};

export default CONFIG;
