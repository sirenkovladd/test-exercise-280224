export class Config {
  getActivityUrl() {
    return (
      process.env.URL_API_ACTIVITY || "https://www.boredapi.com/api/activity"
    );
  }

  getPort() {
    return process.env.PORT || "3000";
  }

  getDbFileName() {
    return process.env.DB_FILE_NAME || ":memory:";
  }
}
