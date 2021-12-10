import TappedOutListConverter from "./TappedOutListConverter";
import ArchidektListConverter from "./ArchidektListConverter";
import MoxfieldListConverter from "./MoxfieldListConverter";

export default class ConverterFactory {
    #converters = {
        tappedout: () => new TappedOutListConverter(),
        archidekt: () => new ArchidektListConverter(),
        moxfield: () => new MoxfieldListConverter()
    };

    createConverter(name) {
        return this.#converters[name]();
    }
}
