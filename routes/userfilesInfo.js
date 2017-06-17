var data = require("../userFileDummyDatabase/data");

var specificUserFilePool = function() {
    var files = [];
    //make sure it's a true sync call
    let getNumberOfRepoContent = function() {
        data.forEach(function(ghDataObj) {
            var source = {
                sourceName: ghDataObj["name"],
                type: ghDataObj["type"]
            };

            if (source.type === "file") {
                files.push({
                    "file": source.sourceName
                });
            };
            if (source.type === "dir") {
                files.push({
                    "SubDirectory": source.sourceName
                });
            };
        });
        return files;
    };

    let getRepoName = function() {
        var repository = {};
        data.forEach(function(ghDataObj) {

            var repositoryProperty = {
                download_url: ghDataObj["download_url"],
                file: ghDataObj["name"],
            };

            var defaultGHSetting = {
                ghDefaultDataLink: "https://raw.githubusercontent.com/",
                ghDefaultBranch: "master",
                ghUsername: process.env.GHUSERNAME
            };

            if (repositoryProperty.download_url !== null) {
                repoNameFix = repositoryProperty.download_url.replace(defaultGHSetting.ghDefaultDataLink + defaultGHSetting.ghUsername + "/", "");
                repository.validRepositoryname = repoNameFix.replace("/" + defaultGHSetting.ghDefaultBranch + "/" + repositoryProperty.file, "");
            }
        });
        return repository.validRepositoryname;
    }
    return {
        getNumberOfRepoContent,
        getRepoName
    };
}
exports.specificUserFilePool = specificUserFilePool;
