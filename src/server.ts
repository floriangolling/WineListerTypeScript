import app from "./app";

//importing the app and launching it.
const server = app.listen(app.get("port"), () => {
  console.log(
    "App is running on http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

export default server;