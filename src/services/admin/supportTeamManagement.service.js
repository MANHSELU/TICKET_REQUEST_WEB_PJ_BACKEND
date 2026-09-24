const supportTeamRepository = require("../../repositories/admin/supportTeamManagement.repository");

const createSupportTeam = async (teamCode, teamName, description) => {
    const team = await supportTeamRepository.createSupportTeam({
        teamCode: teamCode,
        teamName: teamName,
        description: description,
    });
    return team;
};

const findAllSupportTeam = async () => {
    const teams = await supportTeamRepository.getSupportTeam();
    return teams;
};

const updateSupportTeam = async (teamId, teamCode, teamName, description) => {
    const team = await supportTeamRepository.updateSupportTeam(teamId, {
        teamCode: teamCode,
        teamName: teamName,
        description: description,
    });
    return team;
};

const searchSupportTeam = async (keyword) => {
    return await supportTeamRepository.searchSupportTeam(keyword);
};

module.exports = { createSupportTeam, findAllSupportTeam, updateSupportTeam, searchSupportTeam };
