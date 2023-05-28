import "./Survey.css";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import { select as selectSurvey } from "../api/survey";

const filters = [
    { value: "all", label: "Todos" },
    { value: "question", label: "Pregunta" },
    { value: "answer", label: "Respuesta" },
];

export default function Survey() {
    const [surveys, setSurveys] = useState([]);
    useEffect(() => {
        selectSurvey().then((response) => {
            console.log(response);
            setSurveys(response);
        });
    }, []);
    return (
        <>
            <div className="container">
                <div className="breadcrumb">
                    <a href="./">Home</a>/<span>Survey</span>
                </div>
                <div className="content">
                    <div className="head">
                        <h2>Survey</h2>
                        <Search filters={filters} />
                        <div className="new">
                            <button>
                                <i className="fas fa-plus"></i>
                                <span>Nuevo</span>
                            </button>
                        </div>
                    </div>
                    <div className="data">
                        <ul>
                            {surveys.slice(0, 20).map((survey) => (
                                <Item key={survey["survey_id"]} info={survey} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

Item.propTypes = null;

function Item({ info }) {
    const { survey_question, survey_answer, survey_image_url } = info;
    return (
        <li>
            <div className="info">
                <div className="question">
                    <p>
                        <b>Pregunta: </b>
                        {survey_question}
                    </p>
                </div>
                <div className="answer">
                    <p>
                        <b>Respuesta: </b>
                        {survey_answer}
                    </p>
                </div>
            </div>
            {survey_image_url && (
                <div className="image">
                    <img src={survey_image_url} alt="Survey" />
                </div>
            )}
            <div className="actions">
                <button className="edit">
                    <i className="fas fa-edit"></i>
                </button>
                <button className="dell">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    );
}
