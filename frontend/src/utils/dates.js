const dateToWordsFormat = (date) => {
    const _date = new Date(date);
    return new Intl.DateTimeFormat("en-US", {month: 'long', day: 'numeric', year: 'numeric'}).format(_date);
}

export default dateToWordsFormat