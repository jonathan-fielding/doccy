var FunctionBlock = function() {
  this.lines = [];
  this.params = {};
};

FunctionBlock.prototype = {
  addLine: function(line) {
    this.lines.push(line);
    this.checkNameMatch(line) ||
    this.checkReturnMatch(line) ||
    this.checkParamsMatch(line) ||
    this.checkDescriptionMatch(line);
  },
  checkNameMatch: function(line) {
    var match = /@name ([A-z0-9_]*)/i.exec(line);
    if(match) {
      this.name = match[1];
      return true;
    }
    return false;
  },
  checkReturnMatch: function(line) {
    var match = /@returns (.+)/i.exec(line);
    if(match) {
      this.returns = match[1];
      return true;
    }
    return false;
  },
  checkParamsMatch: function(line) {
    var match = /@param ([A-z0-9_]*) (.+)/i.exec(line);
    if(match) {
      this.params[match[1]] = match[2];
      return true;
    }
    return false;
  },
  checkDescriptionMatch: function(line) {
    var match = /@description (.+)/i.exec(line);
    if(match) {
      this.description = match[1];
      return true;
    }
    return false;
  }
};

/*
 * @name parseFile
 * @description parseFile module
 */
var parseFile = {
  blocks: [],
  /*
   * @name parse
   * @description takes string of contents and parses out the doc strings
   * @param fileContents string contents
   * @returns a parsed object of functions
   */
  parse: function(fileContents) {
    this.blocks = [];
    var functionBlock;
    fileContents.split("\n").forEach(function(item) {
      var line = item.trim();
      if(line == "/*") {
        functionBlock = new FunctionBlock();
      };
      if(line == "*/" && functionBlock != undefined) {
        this.blocks.push(functionBlock);
        functionBlock = undefined;
      }
      if(functionBlock != undefined && line[0] == "*" ) {
        functionBlock.addLine(line);
      }
    }.bind(this));
    return this;
  }
};

module.exports = parseFile;
