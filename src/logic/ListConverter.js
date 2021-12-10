

export default class ListConverter {
  #lineSeparatorChar = '\n';

  parse(value, converterOut) {
    let me = this;
    let lines = value.split(me.#lineSeparatorChar);
    let parsedLines = [];

    lines.forEach((line, index, arr) => {
      let lineValue = line && line.trim();

      if (lineValue) { // Skip empty lines
        me.beforeParseLine(lineValue);

        let parsedLine = me.parseLine(lineValue);

        if (parsedLine) {
          parsedLines.push(converterOut.print(parsedLine));
        }

        me.afterParseLine(lineValue, parsedLine);
      }
    });

    parsedLines = converterOut.afterParse(parsedLines);

    return parsedLines.join('\n');
  }

  beforeParseLine(line) {
    // NOOP
  }

  parseLine(line) {
    return line;
  }

  afterParseLine(originalLine, parsedLine) {
    // NOOP
  }

  afterParse(parsedLines) {
    // NOOP
    return parsedLines;
  }

  print(parsedLine) {
    return JSON.stringify(parsedLine);
  }
}
