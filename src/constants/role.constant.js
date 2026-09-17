const ROLE = {
    REQUESTER: 1 << 0,      // 0001 = 1
    SUPPORTER: 1 << 1,      // 0010 = 2
    HEAD_SUPPORTER: 1 << 2, // 0100 = 4
    ADMIN: 1 << 3,          // 1000 = 8
};

module.exports = ROLE;
