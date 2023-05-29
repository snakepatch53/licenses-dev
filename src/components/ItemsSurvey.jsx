import "./ItemsSurvey.css";

ItemsSurvey.propTypes = null;

export default function ItemsSurvey({ surveys }) {
    return (
        <ul className="items-surveys">
            {surveys.map((survey) => (
                <Item key={survey["survey_id"]} info={survey} />
            ))}
        </ul>
    );
}

Item.propTypes = null;

function Item({ info }) {
    const { survey_id, survey_question, survey_answer, survey_image_url } = info;
    return (
        <li>
            <div className="survey-head">
                <b>#{survey_id}</b>
            </div>
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
