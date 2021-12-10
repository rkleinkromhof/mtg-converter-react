import ListConverter from "./ListConverter";

export default class ArchidektListConverter extends ListConverter {
  #cardLineParser = /^(?<count>[\d]*)x? (?<cardName>[\w\d-',.?! /]+[\w\d-',.?!]) ?(?:\((?<expansionCode>[\w]+)\))? ?(?<cardExpansionNo>[\d]+)? ?(?<isCmdr>\*CMDR\*)? ?(?<isFoil>\*F\*)? {0,2}(?:\[(?<category>[\w -]+)(?:{.+})?\])?/i;

  constructor() {
    super();
  }

  parseLine(line) {
    const me = this;
    let value = line && line.trim();
    let result = null;

    if (value) {
      let groups = value.match(me.#cardLineParser).groups;
      let categories = groups.category ? [groups.category] : []; // Archidekt only supports a single category per line.

      result = {
         count: groups.count || 1,
         cardName: groups.cardName,
         expansionCode: groups.expansionCode || null,
         cardExpansionNo: groups.cardExpansionNo || null,
         isCmdr: !!groups.isCmdr,
         isFoil: !!groups.isFoil,
         categories: categories
      };

    }
    return result;
  }

   afterParse(parsedLines) {
    let me = this;

    return Array.prototype.sort.call(parsedLines, (firstLine, secondLine) => {
      let groupsLeft = firstLine.match(me.#cardLineParser).groups;
      let groupsRight = secondLine.match(me.#cardLineParser).groups;

      return groupsLeft.cardName.localeCompare(groupsRight.cardName);
    });
  }

  print(parsedLine) {
    const p = parsedLine;
    let expansionCodeWithBrackets = p.expansionCode ? ` (${p.expansionCode.toLowerCase()})` : '';
    let cardExpansionNo = p.expansionCode && p.cardExpansionNo ? ` ${p.cardExpansionNo}` : '';
    let commanderTag = p.isCmdr ? ' *CMDR*' : '';
    let foilTag = p.isFoil ? ' *F*' : '';
    // Archidekt doesn't support multiple categories yet, so the line below doesn't work.
    // let category = p.categories.length ? ` [${p.categories.join('] [')}]` : '';
    let category = p.categories.length ? ` [${p.categories.join(', ')}]` : ''; // Join into a single category then.

    return `${p.count}x ${p.cardName}${expansionCodeWithBrackets}${cardExpansionNo}${commanderTag}${foilTag}${category}`
  }
}
