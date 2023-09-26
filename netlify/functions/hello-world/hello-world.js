const util = require("util");
const path = require("path");
const child_process = require("child_process");

const exec = util.promisify(child_process.exec);

const statusCode = {
  SUCCESS: 200,
  INTERNAL_SERVER_ERROR: 500,
};

const cmd =
  require.resolve("./lt-expand-deb") +
  " " +
  require.resolve("./verbs.dix") +
  " | head";

// const cmd = "cat /etc/os-release";
// const cmd = "uname --kernel-name --kernel-release --machine";

const getOutput = async () => {
  const { stdout, stderr } = await exec(cmd, {
    // shell: true,
    // cwd: process.cwd(),
  });

  if (stderr) {
    throw stderr;
  }

  return stdout;
};

const handler = async (event) => {
  try {
    const output = await getOutput();

    return {
      statusCode: statusCode.SUCCESS,
      body: JSON.stringify({ message: output }),
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      body: error.toString(),
    };
  }
};

module.exports = { handler };
