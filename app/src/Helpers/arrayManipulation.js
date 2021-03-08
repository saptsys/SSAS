export function searchInArray(array = [], searchText = "") {
    return array.filter(o =>
        Object.keys(o).some(k =>
            String(o[k])
                .toLowerCase()
                .includes(searchText.toLowerCase())
        )
    );
}