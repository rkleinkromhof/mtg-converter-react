import ListConverter from "./ListConverter";

export default class TappedOutListConverter extends ListConverter {
  #cardLineParser = /^(?<count>[\d]*)x? (?<cardName>[\w\d-',.?! /]+[\w\d-',.?!]) ?(?:\((?<expansionCode>[\w]+)[:]?(?<cardExpansionNo>[\d]+)?\))? ?(?<isCmdr>\*CMDR\*)? ?(?<isFoil>\*F\*)? ?(?<categories>#.+)?/i;

  #categoryHeaderStart = '# ';
  #lastCategoryHeader = null;
  //#linePrinter = `${count}x ${cardName} ${expansionCodeWithBrackets} ${cardNo} ${commanderTag} ${foilTag}${categories}`;
  #expansionCodeCorrectionList = {
    CM1: 'cma', // Commander Anthology
    GRV: 'pd3', // Graveborn
    MYS1: 'mb1', // Mystery Booster
    MYSTOR: 'fmb1', // Mystery Booster Store Edition
    NMS: 'nem', // Nemesis

    // Promo code; the value this translates to depends on the card. TappedOut uses this code as a catch-all.
    // I'll translate it to '???' for now.
    '000': '???'

    // There's bound to be more of these, but for now I'll only add to this list when I encounter discrepancies.
  };

  #expansionCodeReverseCorrectionList = {
    cma: 'cm1', // Commander Anthology
    pd3: 'GRV', // Graveborn
    mb1: 'MYS1', // Mystery Booster
    fmb1: 'MYSTOR', // Mystery Booster Store Edition
    nem: 'NMS', // Nemesis
    pg07: '000' // Gateway 2007
  };

  normalizeExpansionCode(eCode) {
    return eCode && this.#expansionCodeCorrectionList[eCode] || eCode ||  null;
  }

  convertExpansionCode(normalizedExpCode) {
   return normalizedExpCode && this.#expansionCodeReverseCorrectionList[normalizedExpCode] || normalizedExpCode || null;
  }

  constructor() {
    super();
  }

  parseLine(line) {
    const me = this;
    let result = null;

    if (line) {
      if (line.startsWith(me.#categoryHeaderStart)) {
        me.#lastCategoryHeader = line.substring(2);
      } else {
        let groups = line.match(me.#cardLineParser).groups;
        let categories = groups.categories ? groups.categories.replaceAll('#', '').split(' ') : [];

        if (categories.length) {
          me.#lastCategoryHeader = null; // Clear last category if line had its own categories.
        } else if (me.#lastCategoryHeader) {
          categories = [me.#lastCategoryHeader];
        }

        result = {
           count: groups.count || 1,
           cardName: groups.cardName.replace(' / ', ' // '),
           expansionCode: me.normalizeExpansionCode(groups.expansionCode),
           cardExpansionNo: groups.cardExpansionNo || null,
           isCmdr: !!groups.isCmdr,
           isFoil: !!groups.isFoil,
           categories: categories
        };
      }
    }
    return result;
  }

  /**
   * Returns a printable line.
   * @{Object} parsedLine
   * @return {String} a printable line.
   */
  print(parsedLine) {
    const p = parsedLine;
    let cardName = p.cardName.replace(' // ', ' / ');
    let convertedExpCode = this.convertExpansionCode(p.expansionCode);
    let expCodeAndCardNo = convertedExpCode && p.cardExpansionNo ? `${convertedExpCode}:${p.cardExpansionNo}` : convertedExpCode;
    let expansionCodeWithBrackets = expCodeAndCardNo ? ` (${expCodeAndCardNo})` : '';
    let commanderTag = p.isCmdr ? ' *CMDR*' : '';
    let foilTag = p.isFoil ? ' *F*' : '';
    let category = p.categories.length ? ` #${p.categories.map(cat => cat.replace(/ /gi, '_')).join(' #')}` : '';

    return `${p.count}x ${cardName}${expansionCodeWithBrackets}${commanderTag}${foilTag}${category}`
  }
}
