const app = require("./app");

const port = process.env.PORT || 8080;

/*******************************************************************************
 * Start Server
 ******************************************************************************/
const startServer = async () => {
  try {
    app.listen(
      port,
      () => console.log(`Server is listening on port : ${port}`), // eslint-disable-line
    );
  } catch (error) {
    console.log(error); // eslint-disable-line
    process.exit(1);
  }
};

startServer();
