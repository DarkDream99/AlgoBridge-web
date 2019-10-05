const compose = (...funcs) => (component) => {
    return funcs.reduceRight(
        (wrapper, nextFunction) => nextFunction(wrapper),
        component
    );
};

export default compose;