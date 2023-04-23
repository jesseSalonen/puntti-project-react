import i18n from "../translations/i18n";

class CommonHelpers {
    static getTimeText(timeObject) {
        // options for datetime formatting
        const options = { hour: 'numeric', minute: 'numeric' };

        return i18n.t(
            'intlDateTime',
            {
                val: timeObject,
                formatParams: {
                    val: options,
                },
                ns: 'common'
            }
        );
    }

    static getDateTimeText(dateTimeObject) {
        // options for datetime formatting
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

        return i18n.t(
            'intlDateTime',
            {
                val: dateTimeObject,
                formatParams: {
                    val: options,
                },
                ns: 'common'
            }
        );
    }
}

export default CommonHelpers;