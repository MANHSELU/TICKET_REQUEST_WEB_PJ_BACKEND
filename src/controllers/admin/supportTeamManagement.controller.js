const { validateCreateSupportTeam, validateUpdateSupportTeam } = require("../../validations/admin/supportTeamManagement.validation");
const { createSupportTeam, findAllSupportTeam, updateSupportTeam, searchSupportTeam } = require("../../services/admin/supportTeamManagement.service");

const createSupportTeamController = async (req, res) => {
    try {
        const { teamCode, teamName, description } = req.body;
        await validateCreateSupportTeam(teamCode, teamName, description);
        await createSupportTeam(teamCode, teamName, description);
        return res.status(201).json({ message: "Tạo mới đội hỗ trợ thành công" });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const findSupportTeamController = async (req, res) => {
    try {
        const teams = await findAllSupportTeam();
        return res.status(200).json({ message: "Lấy danh sách đội hỗ trợ thành công", data: teams });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const updateSupportTeamController = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { teamCode, teamName, description } = req.body;
        await validateUpdateSupportTeam(teamId, teamCode, teamName, description);
        const team = await updateSupportTeam(teamId, teamCode, teamName, description);
        return res.status(200).json({ message: "Cập nhật đội hỗ trợ thành công", data: team });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

const searchSupportTeamController = async (req, res) => {
    try {
        const { keyword } = req.query;
        const teams = await searchSupportTeam(keyword);
        return res.status(200).json({ message: "Tìm kiếm thành công", data: teams });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message || "Lỗi hệ thống" });
    };
};

module.exports = { createSupportTeamController, findSupportTeamController, updateSupportTeamController, searchSupportTeamController };
