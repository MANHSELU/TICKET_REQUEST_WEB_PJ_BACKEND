const validateCreateSupportTeam = (teamCode, teamName, description) => {
    if (!teamCode || !teamName) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

const validateUpdateSupportTeam = (teamId, teamCode, teamName, description) => {
    if (!teamId || !teamCode || !teamName) {
        throw {
            status: 400,
            message: "Các trường thông tin là bắt buộc"
        };
    };
};

module.exports = { validateCreateSupportTeam, validateUpdateSupportTeam };
