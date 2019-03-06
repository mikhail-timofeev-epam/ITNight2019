import _ from "lodash";

export const debounce = (callback, timeout = 500) => {
    return _.debounce(callback, timeout, {
        leading: true,
        trailing: false,
    });
};
