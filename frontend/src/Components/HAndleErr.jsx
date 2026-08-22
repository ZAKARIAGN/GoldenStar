export const HandleErr = (err, setErr) => {
  if (err.response && err.response.data) {
    const data = err.response.data;
    const errorData =
      typeof data === "string"
        ? (() => {
            try {
              const cleaned = data.replace(/^\/\/ routes\/api\.php\r\n/, "");
              return JSON.parse(cleaned);
            } catch {
              return null;
            }
          })()
        : data;

    if (!errorData) {
      setErr({ general: "Something went wrong" });
      return;
    }

    console.log("Parsed error data:", errorData);

    if (errorData.errors) {
      console.log("Setting errors from response:", errorData.errors);
      setErr(errorData.errors);
    } else if (errorData.message) {
      setErr({ general: errorData.message });
    } else {
      setErr({ general: "Something went wrong" });
    }
  } else {
    setErr({ general: "Network error or server unavailable" });
  }
};
