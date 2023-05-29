import "./Survey.css";
import Search from "../components/Search";

import ItemsSurvey from "../components/ItemsSurvey";
import { useFilter, useSearch } from "../hooks/search";
import { useResult } from "../hooks/survey";
import { useEffect, useState } from "react";
import { insert as insertSurvey, update as updateSurveyDb } from "../api/survey";

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
    const { surveys, updateSurvey } = useResult({
        filters,
        selectedFilter: filterSelected,
        selectedLimit: limitSelected,
        valueSearch,
    });

    const [mode, setMode] = useState("table");
    const [edit_id, setEdit_id] = useState(0);

    const handleClickForm = (id = 0) => {
        setEdit_id(id);
        setMode("edit");
    };

    return (
        <>
            <div className="container">
                <div className="breadcrumb">
                    <a href="./">Home</a>/<span>Survey</span>
                </div>
                <div className="content">
                    {mode === "table" ? (
                        <Table
                            handleClickForm={handleClickForm}
                            limitSelectedLabel={limitSelectedLabel}
                            limitOnSelection={limitOnSelection}
                            limitSelected={limitSelected}
                            isLimitSelected={isLimitSelected}
                            filterSelectedLabel={filterSelectedLabel}
                            filterOnSelection={filterOnSelection}
                            isFilterSelected={isFilterSelected}
                            handleSearch={handleSearch}
                            valueSearch={valueSearch}
                            surveys={surveys}
                        />
                    ) : (
                        <Edit back={() => setMode("table")} edit_id={edit_id} surveys={surveys} updateSurvey={updateSurvey} />
                    )}
                </div>
            </div>
        </>
    );
}

Edit.propTypes = null;
function Edit({ back, edit_id, surveys, updateSurvey }) {
    const [msg, setMsg] = useState("");
    const [survey, setSurvey] = useState({
        survey_id: 0,
        survey_question: "",
        survey_answer: "",
        survey_image: "",
    });
    useEffect(() => {
        const _survey = surveys.find((survey) => survey.survey_id == edit_id);
        if (_survey) setSurvey({ ..._survey, survey_image: "" });
    }, [edit_id, surveys]);

    const handleChange = (e) => {
        const name = e.target.name;
        const type = e.target.type;
        let value = e.target.value;
        if (type === "file") value = e.target.files[0];
        setSurvey({
            ...survey,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!survey.survey_question || !survey.survey_answer) {
            setMsg("Llena todos los campos");
            setTimeout(() => setMsg(""), 3000);
            return;
        }
        const formData = new FormData(e.target);
        const response = edit_id == 0 ? await insertSurvey(formData) : await updateSurveyDb(formData);
        setMsg(response.message);
        setTimeout(() => setMsg(""), 3000);
        if (response.response) {
            const newSurvey = { ...survey, survey_id: response.data };
            if (newSurvey.survey_image) newSurvey.survey_image_url = URL.createObjectURL(newSurvey.survey_image);
            updateSurvey(newSurvey);
            back();
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="survey_id" value={survey.survey_id} />
            <div className="head">
                <h2>Pregunta:</h2>
                <span className="register">#{edit_id}</span>
                <p className="msg">{msg}</p>
                <div className="new cancel">
                    <button onClick={back}>
                        <i className="fas fa-times"></i>
                        <span>Cancelar</span>
                    </button>
                </div>
                <div className="new">
                    <button type="submit">
                        <i className="fas fa-save"></i>
                        <span>Guardar</span>
                    </button>
                </div>
            </div>
            <div className="data">
                <div className="form">
                    <div className="input">
                        <label>
                            <b>*</b>Pregunta:
                        </label>
                        <textarea
                            name="survey_question"
                            placeholder="Escribe la pregunta.."
                            rows="5"
                            onChange={handleChange}
                            value={survey.survey_question}
                        ></textarea>
                    </div>
                    <div className="input">
                        <label>
                            <b>*</b>Respuesta:
                        </label>
                        <textarea name="survey_answer" placeholder="Escribe la respuesta.." rows="5" onChange={handleChange} value={survey.survey_answer}></textarea>
                    </div>
                    <div className="input">
                        <label>Imagen: </label>
                        <input type="file" placeholder="Imagen" name="survey_image" accept="image/*" onChange={handleChange} />
                    </div>
                </div>
            </div>
        </form>
    );
}

Table.propTypes = null;
function Table({
    handleClickForm,
    limitSelectedLabel,
    limitOnSelection,
    isLimitSelected,
    filterSelectedLabel,
    filterOnSelection,
    isFilterSelected,
    handleSearch,
    valueSearch,
    surveys,
    limitSelected,
}) {
    return (
        <>
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
                    <button onClick={() => handleClickForm(0)}>
                        <i className="fas fa-plus"></i>
                        <span>Nuevo</span>
                    </button>
                </div>
            </div>
            <div className="data">
                <ItemsSurvey surveys={surveys} limit={limitSelected} handleClickEdit={handleClickForm} handleClickDelete={handleClickForm} />
            </div>
        </>
    );
}

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
