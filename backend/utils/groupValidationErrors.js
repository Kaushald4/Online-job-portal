const groupError = (errors) => {
    const formatedError = errors.array().reduce((acc, cur) => {
        if (acc[cur.param]) {
            acc[cur.param].push({ message: cur.msg });
        } else {
            acc[cur.param] = [{ message: cur.msg }];
        }
        return acc;
    }, {});
    return formatedError;
};

export default groupError;
