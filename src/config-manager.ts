interface Config {
  include?: string[];
  exclude?: string[];
}

let config: Config;

const initConfig = () => {
  try {
    if (process.env.NODE_ENV === "test") {
      config = {};
      return;
    }
  } catch (e) {}
  try {
    config = require("../../../pclc.config");
  } catch (e) {
    config = {};
  }
};

initConfig();

const initElements = (elements: string[]): string[] => {
  const { include, exclude } = config;
  if (include) {
    return include;
  }
  if (exclude) {
    return elements.filter((element) => !exclude.includes(element));
  }
  return elements;
};

export default initElements;
