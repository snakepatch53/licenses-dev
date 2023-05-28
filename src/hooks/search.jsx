import { useState } from "react";

export function useSearch({ defaultLabel = "Todos", defaultFilter = "all" }) {
    // filter
    const [labelSelected, setLabelSelected] = useState(defaultLabel);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterSelected, setFilterSelected] = useState(defaultFilter);
    const selectFilter = (e) => {
        setFilterSelected(e.target.value);
        setFilterOpen(false);
        setLabelSelected(e.target.nextSibling.innerText);
    };
    const openFilter = () => {
        setFilterOpen(!filterOpen);
    };
    const isFilterSelected = (value) => {
        return filterSelected === value;
    };

    // search
    const [search, setSearch] = useState("");
    const handleSearch = (value) => {
        setSearch(value);
    };

    // exports
    return {
        labelSelected,
        filterOpen,
        filterSelected,
        selectFilter,
        openFilter,
        isFilterSelected,
        valueSearch: search,
        handleSearch,
    };
}
