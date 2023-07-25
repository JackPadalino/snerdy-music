import app from "./app";

const init = async () => {
  try {
    const port = process.env.PORT || 5173;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
