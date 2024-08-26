const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const subProjects = ["server", "client"];

const installTypesForProject = (projectName) => {
  const projectPath = path.resolve(__dirname, projectName);
  const packageJsonPath = path.join(projectPath, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.log(`No package.json found in ${projectName}. Skipping...`);
    return;
  }

  const packageJson = require(packageJsonPath);

  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});

  const allDependencies = [...dependencies, ...devDependencies];

  const installTypes = (packageName) => {
    return new Promise((resolve) => {
      exec(`npm show @types/${packageName} name`, (error, stdout, stderr) => {
        if (error || stderr) {
          resolve(null);
        }
        else if (stdout.trim()) {
          resolve(`@types/${packageName}`);
        }
      });
    });
  };

  const installAllTypes = async () => {
    const typePackages = await Promise.all(allDependencies.map(installTypes));

    const filteredTypePackages = typePackages.filter(Boolean);

    if (filteredTypePackages.length > 0) {
      console.log(`Installing types for ${projectName}: ${filteredTypePackages.join(" ")}`);
      exec(`npm install --prefix ${projectPath} --save-dev ${filteredTypePackages.join(" ")}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing types for ${projectName}: ${stderr}`);
        }
        else {
          console.log(stdout);
        }
      });
    }
    else {
      console.log(`No @types packages found for the dependencies in ${projectName}.`);
    }
  };

  installAllTypes();
};

subProjects.forEach(installTypesForProject);
