import { http_query } from "./http_query";

export async function select() {
    const response = await http_query("survey", "select", "POST");
    if (!response) return [];
    return schematize(response.data);
}

function schematize(rows) {
    return rows.map((row) => {
        return {
            survey_id: row.survey_id,
            survey_question: row.survey_question,
            survey_answer: row.survey_answer,
            survey_image: row.survey_image,
            survey_last: row.survey_last,
            survey_created: row.survey_created,
            survey_image_url: row.survey_image_url,
        };
    });
}
