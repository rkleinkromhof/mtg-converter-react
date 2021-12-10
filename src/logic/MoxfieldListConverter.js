import ListConverter from "./ListConverter";

export default class MoxfieldListConverter extends ListConverter {
  #cardLineParser = /^(?<count>[\d]*)x? (?<cardName>[\w\d-',.?! /]+[\w\d-',.?!]) ?(?:\((?<expansionCode>[\w]+)\))? ?(?<cardExpansionNo>[\d]+)? ?(?<isFoil>\*F\*)?/i;

  constructor() {
    super();
  }

  parseLine(line) {
    const me = this;
    let value = line && line.trim();
    let result = null;

    if (value) {
      let groups = value.match(me.#cardLineParser).groups;

      result = {
         count: groups.count || 1,
         cardName: groups.cardName,
         expansionCode: groups.expansionCode || null,
         cardExpansionNo: groups.cardExpansionNo || null,
         isCmdr: false, // Moxfield doesn't do Commander tags.
         isFoil: !!groups.isFoil,
         categories: [] // Moxfield doesn't use categories in import/export.
      };

    }
    return result;
  }

  print(parsedLine) {
    const p = parsedLine;
    let expansionCodeWithBrackets = p.expansionCode ? ` (${p.expansionCode})` : '';
    let cardExpansionNo = p.expansionCode && p.cardExpansionNo ? ` ${p.cardExpansionNo}` : '';
    let foilTag = p.isFoil ? ' *F*' : '';

    return `${p.count}x ${p.cardName}${expansionCodeWithBrackets}${cardExpansionNo}${foilTag}`
  }
}
