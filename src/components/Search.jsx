import "./Search.css";
import PropTypes from "prop-types";
import { useSearch } from "../hooks/search";

Filter.propTypes = {
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default function Filter({ filters }) {
    const defaultLabel = filters[0].label;
    const defaultFilter = filters[0].value;
    const { labelSelected, filterOpen, isFilterSelected, selectFilter, openFilter, handleSearch, valueSearch } = useSearch({ defaultLabel, defaultFilter });
    return (
        <>
            <div className="search-component">
                <div className={"filter " + (filterOpen ? "open" : "")}>
                    <div className="selected" onClick={openFilter}>
                        <b>Filtrar por: </b>
                        <span>{labelSelected}</span>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                    <ul>
                        {filters.map((filter) => (
                            <Option key={filter.value} filter={filter} isFilterSelected={isFilterSelected} selectFilter={selectFilter} />
                        ))}
                    </ul>
                </div>
                <input type="search" placeholder="Search" value={valueSearch} onChange={(e) => handleSearch(e.target.value)} />
            </div>
        </>
    );
}

Option.propTypes = {
    filter: PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    isFilterSelected: PropTypes.func.isRequired,
    selectFilter: PropTypes.func.isRequired,
};

function Option({ filter, isFilterSelected, selectFilter }) {
    return (
        <li key={filter.value}>
            <input type="radio" name="filter" value={filter.value} id={"filter-" + filter.value} checked={isFilterSelected(filter.value)} onChange={selectFilter} />
            <label htmlFor={"filter-" + filter.value}>{filter.label}</label>
        </li>
    );
}
