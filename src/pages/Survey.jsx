import "./Survey.css";
import Search from "../components/Search";

import ItemsSurvey from "../components/ItemsSurvey";
import { useFilter, useSearch } from "../hooks/search";
import { useResult } from "../hooks/survey";

const filters = [
    { value: "question", label: "Pregunta", db_name: "survey_question" },
    { value: "answer", label: "Respuesta", db_name: "survey_answer" },
    { value: "all", label: "Todos", db_name: "all" },
];

const limits = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
    { value: "all", label: "Todos" },
];

export default function Survey() {
    const { valueSearch, handleSearch } = useSearch();

    const [filterSelectedLabel, filterSelected, filterOnSelection, isFilterSelected] = useFilter({
        defaultLabel: filters[0].label,
        defaultFilter: filters[0].value,
    });
    const [limitSelectedLabel, limitSelected, limitOnSelection, isLimitSelected] = useFilter({
        defaultLabel: limits[0].label,
        defaultFilter: limits[0].value,
    });
    const { surveys } = useResult({
        filters,
        selectedFilter: filterSelected,
        selectedLimit: limitSelected,
        valueSearch,
    });

    return (
        <>
            <div className="container">
                <div className="breadcrumb">
                    <a href="./">Home</a>/<span>Survey</span>
                </div>
                <div className="content">
                    <div className="head">
                        <h2>Survey</h2>
                        <Search
                            limits={limits}
                            limitSelectedLabel={limitSelectedLabel}
                            limitOnSelection={limitOnSelection}
                            isLimitSelected={isLimitSelected}
                            filters={filters}
                            filterSelectedLabel={filterSelectedLabel}
                            filterOnSelection={filterOnSelection}
                            isFilterSelected={isFilterSelected}
                            handleSearch={handleSearch}
                            valueSearch={valueSearch}
                        />
                        <div className="new">
                            <button>
                                <i className="fas fa-plus"></i>
                                <span>Nuevo</span>
                            </button>
                        </div>
                    </div>
                    <div className="data">
                        <ItemsSurvey surveys={surveys} limit={limitSelected} />
                    </div>
                </div>
            </div>
        </>
    );
}
