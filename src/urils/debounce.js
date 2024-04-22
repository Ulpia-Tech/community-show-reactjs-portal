const debounce = (callback) => {
    const debounceTimer = setTimeout(() => {
        callback();
    }, 500);

    return () => clearTimeout(debounceTimer);
}